document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  const inputText = document.getElementById('input-text');
  const cursor = document.getElementById('cursor');
  const usernameSpan = document.getElementById('username');

  // Add the input line mask element
  function addInputLineMask() {
    const mask = document.createElement('div');
    mask.className = 'input-line-mask';
    document.querySelector('.chat-container').appendChild(mask);
  }
  addInputLineMask();

  // Generate a new anon ID from a hash key
  const generateAnonId = (hashKey) => {
    // Simple hash function to generate a numerical string from the key
    let numHash = 0;
    for (let i = 0; i < hashKey.length; i++) {
      numHash = ((numHash << 5) - numHash) + hashKey.charCodeAt(i);
      numHash = numHash & numHash; // Convert to 32bit integer
    }
    // Make sure it's positive and doesn't exceed 5 characters
    numHash = Math.abs(numHash) % 100000;
    return 'anon@' + numHash.toString().padStart(4, '0');
  };

  // Get or create hash key, then generate anon ID
  let hashKey = localStorage.getItem('hash_key');
  if (!hashKey) {
    // Generate a random hash key (not the actual anon ID)
    hashKey = Math.random().toString(36).substring(2, 10);
    localStorage.setItem('hash_key', hashKey);
  }
  
  // Generate the anon ID from the hash key
  const userId = generateAnonId(hashKey);
  usernameSpan.textContent = userId + ' ';

  let currentInput = '';
  let history = [];
  let historyIndex = -1;

  // Helper function to ensure proper scrolling
  const scrollToBottom = () => {
    // Use a small timeout to ensure DOM is updated before scrolling
    setTimeout(() => {
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 10);
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch('/get_messages');
      const data = await res.json();

      // Store current scroll position and check if we're at the bottom
      const isAtBottom = chatBox.scrollHeight - chatBox.clientHeight <= chatBox.scrollTop + 5;
      
      // Process new messages if there are any
      if (data.messages && (data.messages.length !== document.querySelectorAll('.message').length)) {
        // Clear all messages but keep the structure
        chatBox.innerHTML = '';
        
        // Add all messages with proper wrapping
        data.messages.forEach(msg => {
          const div = document.createElement('div');
          div.className = 'message';
          div.textContent = msg;
          chatBox.appendChild(div);
        });
        
        // If we were at the bottom before, scroll to bottom again
        if (isAtBottom) {
          scrollToBottom();
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!currentInput.trim()) return;

    const fullMessage = `${userId} > ${currentInput}`;

    try {
      await fetch('/send_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: fullMessage })
      });

      history.push(currentInput);
      historyIndex = history.length;
      currentInput = '';
      inputText.textContent = '';
      
      // Fetch messages and ensure we scroll to bottom
      fetchMessages().then(() => {
        scrollToBottom();
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    } else if (e.key === 'Backspace') {
      currentInput = currentInput.slice(0, -1);
      inputText.textContent = currentInput;
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        currentInput = history[historyIndex];
        inputText.textContent = currentInput;
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        currentInput = history[historyIndex];
        inputText.textContent = currentInput;
      } else {
        currentInput = '';
        inputText.textContent = '';
      }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      currentInput += e.key;
      inputText.textContent = currentInput;
    }
  });

  // Initial fetch
  fetchMessages().then(() => {
    scrollToBottom();
  });
  
  // Set up periodic fetching
  setInterval(() => {
    fetchMessages();
  }, 2000);
});