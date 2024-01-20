import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';

function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = (e) => {
        if(document.getElementById("ChatBox").value === ""){
            return;
        }
        if (e.key === 'Enter') {
            document.getElementById("ChatBox").value = "";
            const newEntry = {
                text: newMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            };
            setMessages([...messages, newEntry]);
            setNewMessage('');

        }
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
            <input
                id = "ChatBox"
                type="text"
                placeholder="Enter a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleSendMessage}
            />
        </div>
    );
}

export default ChatWindow;
