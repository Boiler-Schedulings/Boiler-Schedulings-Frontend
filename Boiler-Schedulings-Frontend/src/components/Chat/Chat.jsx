import React from 'react';
import ChatWindow from "./ChatWindow/ChatWindow.jsx";
import VisualResponse from "./VisualResponse/VisualResponse.jsx";
import './Chat.css';
import ChatTitle from "./ChatTitle/ChatTitle.jsx";
import {useUser} from "../UserContext/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import SignOutButton from "../SignOutButton/SignOutButton.jsx";

function Chat() {
    const { user } = useUser();
    const navigate = useNavigate();
    if(!user) {
        navigate("/");
    }
    return (
        <>
            <SignOutButton />
            <div className="chat-wrapper">
                <ChatTitle/>
                <div className="chat-container">
                    <VisualResponse/>
                    <ChatWindow/>
                </div>
            </div>
        </>
    );
}

export default Chat;
