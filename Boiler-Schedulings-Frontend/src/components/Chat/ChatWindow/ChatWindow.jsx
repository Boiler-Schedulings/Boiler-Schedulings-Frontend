import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';
import { getDatabase, ref, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';


function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e) => {
    if (isLoading || e.key !== 'Enter') {
      return;
    }

    const messageText = newMessage.trim();
    if (messageText === '') {
      return;
    }

    setIsLoading(true);

    // Simulate loading for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : 'anonymous';

    const newEntry = {
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    const db = getDatabase();
    const messagesRef = ref(db, `${userId}/input/chats`);
    push(messagesRef, newEntry)
        .then(() => {
          setMessages([...messages, newEntry]);
          setNewMessage('');
        })
        .catch((error) => {
          console.error("Error sending message: ", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
  };

  return (
    <div className="chat-window-container">
      <div className="messages-container">
      {messages.map((message, index) => (
                    <div key={index} className="message">
                        <div>{message.text}</div>
                        <div className="timestamp">{message.timestamp}</div>
                    </div>
                ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        {isLoading && (
          <div className="loading-animation-container">
            <div className="loading-animation"></div>
          </div>
        )}
        <input
          id="ChatBox"
          type="text"
          placeholder={isLoading ? 'Sending...' : 'Enter a message...'}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleSendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

export default ChatWindow;
