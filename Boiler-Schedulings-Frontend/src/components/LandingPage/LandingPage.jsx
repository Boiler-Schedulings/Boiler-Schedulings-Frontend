import React from 'react';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-container">
            <h1>Welcome to Schedule Chat</h1>
            <p>Start creating your schedule by chatting with our AI assistant!</p>
            <button><a style={{color:"#ffffff", textDecoration: "none"}} href="/chat">Begin</a></button>
        </div>
    );
}

export default LandingPage;
