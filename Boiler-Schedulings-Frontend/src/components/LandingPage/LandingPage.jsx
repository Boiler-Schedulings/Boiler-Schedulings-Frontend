import React, { useState } from 'react';
import './LandingPage.css';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import {useNavigate} from "react-router-dom";

const presetMajors = [
    "Computer Science",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Industrial Engineering",
    "Data Science",
    "Psychology",
    "Economics",
    "Chemical Engineering",
    "Biological Sciences",
    "Mathematics",
    "Computer Engineering",
    "Aerospace Engineering",
    "Finance",
    "Accounting",
];

function LandingPage() {
    const [selectedMajors, setSelectedMajors] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const handleSignIn = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };
    const handleMajorClick = (major) => {
        const isSelected = selectedMajors.includes(major);

        if (isSelected) {
            const updatedMajors = selectedMajors.filter((m) => m !== major);
            setSelectedMajors(updatedMajors);
        } else {
            if (selectedMajors.length < 3) {
                setSelectedMajors((prevMajors) => [...prevMajors, major]);
            } else {
                setShowPopup(true);
            }
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const isButtonClickable = selectedMajors.length > 0;

    return (
        <div className="landing-container">
            <h1>Welcome to Schedule Chat</h1>
            <p>Start creating your schedule by chatting with our AI assistant!</p>
            <button onClick={handleSignIn}>Sign in with Google</button>
            <label>To begin, please select your degree(s) of study:</label>
            <div className="major-buttons-container">
                {presetMajors.map((major) => (
                    <button
                        key={major}
                        onClick={() => handleMajorClick(major)}
                        className={selectedMajors.includes(major) ? 'selected' : ''}
                    >
                        {major}
                    </button>
                ))}
            </div>

            {isButtonClickable ? (
                <button className={isButtonClickable ? 'enabled' : 'disabled'}>
                    <a style={{ color: "#ffffff", textDecoration: "none" }} href="/chat">
                        Begin
                    </a>
                </button>
            ) : (
                <button disabled className="disabled">
                    Begin
                </button>
            )}

            {showPopup && (
                <div className="popup">
                    <p>Kill Yourself</p>
                    <button onClick={closePopup}>OK</button>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
