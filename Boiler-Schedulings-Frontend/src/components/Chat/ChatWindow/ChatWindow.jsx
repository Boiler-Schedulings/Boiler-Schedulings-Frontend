import React, { useState } from 'react';
import './ChatWindow.css';

function ChatWindow() {
    const [messages, setMessages] = useState([]);

    const sendMessage = (message) => {
        setMessages([...messages, message]);
        document.getElementById("ChatBox").value = "";
    };

    return (
        <div className="chat-window-container">
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div key={index} className="message">{message}</div>
                ))}
            </div>
            <input id = "ChatBox" placeholder="Enter a message..." type="text" onKeyDown={(e) => e.key === 'Enter' && sendMessage(e.target.value)} />
        </div>
    );
}

export default ChatWindow;
