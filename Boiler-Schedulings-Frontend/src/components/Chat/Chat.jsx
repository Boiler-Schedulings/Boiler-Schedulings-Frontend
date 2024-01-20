import React from 'react';
import ChatWindow from "./ChatWindow/ChatWindow.jsx";
import VisualResponse from "./VisualResponse/VisualResponse.jsx";
import './Chat.css';

function Chat() {
    return (
        <div className="chat-container">
            <VisualResponse/>
            <ChatWindow/>
        </div>
    );
}

export default Chat;
