import React, { useState } from 'react';
import './LandingPage.css';

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

    const handleMajorClick = (major) => {
        const isSelected = selectedMajors.includes(major);
    
        if (isSelected) {
            // Unselect the major
            const updatedMajors = selectedMajors.filter((m) => m !== major);
            setSelectedMajors(updatedMajors);
        } else {
            // Select the major
            setSelectedMajors((prevMajors) => [...prevMajors, major]);
        }
    };
    
    const isButtonClickable = selectedMajors.length > 0;    

    return (
        <div className="landing-container">
            <h1>Welcome to Schedule Chat</h1>
            <p>Start creating your schedule by chatting with our AI assistant!</p>

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
        </div>
    );
}

export default LandingPage;
