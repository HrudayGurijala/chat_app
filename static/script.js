document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  const inputText = document.getElementById('input-text');
  const cursor = document.getElementById('cursor');
  const usernameSpan = document.getElementById('username');

  // Generate or retrieve anon ID
  let userId = localStorage.getItem('anon_id');
  if (!userId) {
    userId = 'anon@' + Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('anon_id', userId);
  }
  usernameSpan.textContent = userId + ' ';

  let currentInput = '';
  let history = [];
  let historyIndex = -1;

  const fetchMessages = async () => {
    const res = await fetch('/get_messages');
    const data = await res.json();

    // Clear all except the current input line
    const inputLine = document.querySelector('.input-line');
    chatBox.innerHTML = '';
    data.messages.forEach(msg => {
      const div = document.createElement('div');
      div.className = 'message';
      div.textContent = msg;
      chatBox.appendChild(div);
    });

    chatBox.appendChild(inputLine); // Re-append input line at the end
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  const sendMessage = async () => {
    if (!currentInput.trim()) return;

    const fullMessage = `${userId} > ${currentInput}`;

    await fetch('/send_message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: fullMessage })
    });

    history.push(currentInput);
    historyIndex = history.length;
    currentInput = '';
    inputText.textContent = '';
    fetchMessages();
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

  setInterval(fetchMessages, 2000);
  fetchMessages();
});
