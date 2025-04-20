<h1 align="center">
  <img src="https://www.animatedimages.org/data/media/562/animated-matrix-image-0046.gif" width="400"/>
  <br />
  <code><span style="color: #00ff00;"> ANONYMOUS CHAT MAINFRAME </span></code>
</h1>

<h3 align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&pause=1000&color=00FF00&center=true&vCenter=true&width=435&lines=CONNECTING+TO+THE+GRID...;ANON+USER+INTERFACE+BOOTED.;READY+TO+TRANSMIT..." />
</h3>

<p align="center">
  <img src="https://img.shields.io/badge/MODE-ANON%20ACTIVE-00FF00?style=for-the-badge" />
  <img src="https://img.shields.io/badge/SYSTEM-FLASK%2BJS-000000?style=for-the-badge&logo=flask" />
  <img src="https://img.shields.io/badge/DATABASE-MongoDB-00FF00?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/DEPLOYED-Vercel-000000?style=for-the-badge&logo=vercel" />
</p>

---

### 🧠 SYSTEM OVERVIEW

> An anonymous real-time chat platform where names are temporary, data is transient, and you are untraceable.

```
╭────────────────────────────────────────────╮
│  Identity: anonymous@X                     │
│  Chat: Instant, browser-based              │
│  Purge: Auto-delete after 24 hours         │  
╰────────────────────────────────────────────╯
```

---

### 🔧 TECH STACK

```bash
📡 FRONTEND  : HTML + CSS + JavaScript
🧠 BACKEND   : Python (Flask)
💾 DATABASE  : MongoDB Atlas (Compass Optional)
🚀 HOSTED ON : Vercel
```

---

### 🧪 FEATURES

- ✅ Auto-generated usernames like `anonymous@7`
- ✅ Real-time chatting with zero registration
- ✅ Auto-delete chats using MongoDB TTL every 24 hours
- ✅ Terminal-style UI with hacker aesthetic

---

### ⚙️ SETUP INSTRUCTIONS

#### 📁 1. Clone This Repo

```bash
git clone https://github.com/yourusername/anonymous-chat.git
cd anonymous-chat
```

#### 🧪 2. Backend Setup (Flask + Mongo)

```bash
pip install flask pymongo dnspython
```

Create a `.env` file:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/chat_app
PASSKEY=your_secret_admin_passkey
```

#### 🌐 3. Frontend Files

Your folder should contain:

```bash
├── app.py              # Flask server
├── templates/
│   └── index.html      # Chat UI
├── static/
│   └── script.js       # JS logic (fetch, send, poll)
```

#### 🕳️ 4. MongoDB Atlas Setup (One Time)

- Visit [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Whitelist your IP + enable SRV connection
- Use MongoDB Compass to monitor

Add this TTL Index in your `messages` collection:

```js
db.messages.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 })
```

---

### 🚀 DEPLOYMENT (Vercel + Flask)

1. Run backend using Flask locally or via [Render](https://render.com/)
2. Deploy frontend (HTML/JS) to [Vercel](https://vercel.com/)
3. Point `script.js` API requests to your backend server URL

---

### ⚠️ SECURITY + PRIVACY

- No logins or cookies
- All chats deleted every 24h
- No tracking scripts
---

### 👽 ASCII OUTRO

```bash
███████╗███╗   ██╗ ██████╗ ███╗   ███╗
██╔════╝████╗  ██║██╔═══██╗████╗ ████║
█████╗  ██╔██╗ ██║██║   ██║██╔████╔██║
██╔══╝  ██║╚██╗██║██║   ██║██║╚██╔╝██║
███████╗██║ ╚████║╚██████╔╝██║ ╚═╝ ██║
╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝
```

> ⚠️ This isn't a group. This is a protocol.
> Stay anonymous. Stay sharp. 💀

---

### ⭐ CREDITS

- 👨‍💻 Frontend: You (HTML/CSS/JS)
- 🔥 Backend: Flask + MongoDB Atlas
- 🛡️ Admin Logic: TTL, Commands, Cleanup
- 🧠 Inspired by Matrix, cyberpunk, and terminal UI

---

> 💬 Need help? Open an issue or submit a pull request.  
> 🎉 Built with 💚 for privacy freaks.
