from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

MONGO_URL = os.getenv("MONGO_URI")
Original_passkey = os.getenv("Original_passkey")

client = MongoClient(MONGO_URL)
db = client['chatdb']
messages_col = db['messages']

print("MONGO CONNECTION STRING: ",client)

# Create TTL index (expire messages after 86400 seconds = 24 hours)
messages_col.create_index("timestamp", expireAfterSeconds=86400)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    full_msg = data.get('message', '')

    # Split message into user + text (based on format "anon@1234 > message")
    if '>' in full_msg:
        user, msg = map(str.strip, full_msg.split('>', 1))
    else:
        user, msg = 'anon@0000', full_msg

    if msg:
        if msg.startswith("remove "):
            parts = msg.split()
            if len(parts) == 3:
                target_user = parts[1]
                passkey = parts[2]
                correct_passkey = Original_passkey  # Change this
                if passkey == correct_passkey:
                    _ = messages_col.delete_many({"user": target_user})

        elif msg.startswith("flush whole chat"):
            parts = msg.split()
            if len(parts) == 4:
                passkey = parts[3]
                correct_passkey = Original_passkey  # Change this
                if passkey == correct_passkey:
                    _ = messages_col.delete_many({})
        else:
            messages_col.insert_one({
                'user': user,
                'message': msg,
                'timestamp': datetime.now()
            })

    return jsonify({'status': 'Message received'}), 200

@app.route('/get_messages', methods=['GET'])
def get_messages():
    messages = messages_col.find().sort('timestamp', 1)
    formatted = [f"{m.get('user', 'anon@0000')} > {m.get('message', '')}" for m in messages]
    return jsonify({'messages': formatted})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
