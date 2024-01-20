import React from 'react';
import ChatWindow from "./ChatWindow/ChatWindow.jsx";
import VisualResponse from "./VisualResponse/VisualResponse.jsx";
import './Chat.css';
import ChatTitle from "./ChatTitle/ChatTitle.jsx";

function Chat() {
    return (
        <div className="chat-wrapper">
        <ChatTitle/>
        <div className="chat-container">
            <VisualResponse/>
            <ChatWindow/>
        </div>
        </div>
    );
}

export default Chat;
