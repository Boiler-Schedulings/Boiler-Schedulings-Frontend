import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import {useNavigate} from "react-router-dom";
import SignOutButton from "../SignOutButton/SignOutButton.jsx";
import {useUser} from "../UserContext/UserContext.jsx";
import { getDatabase, ref, set, push } from 'firebase/database';

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
    "English",
    "History",
    "Political Science",
    "Philosophy",
    "Physics",
    "Chemistry",
    "Statistics",
    "Art",
    "Music",
    "Architecture",
    "Business",
    "Marketing"
];

presetMajors.sort();
presetMajors.push("Other");

function LandingPage() {
    const { user } = useUser();
    const navigate = useNavigate();
    if(!user) {
        navigate("/");
    }
    const [selectedMajors, setSelectedMajors] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOverlay(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

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
    function goToChat() {
        if (user && selectedMajors.length > 0) {
            const db = getDatabase();
            const userId = user.uid;
            console.log(userId)
            const majorsRef = ref(db, `${userId}/input/majors`);

            push(majorsRef, selectedMajors)
                .then(() => {
                    navigate('/chat');
                })
                .catch((error) => {
                    console.error("Error saving majors: ", error);
                    // Handle any errors here
                });
        }
    }

    return (
        <>
            <SignOutButton />
            
        <div className={showOverlay ? 'overlay' : 'overlay hidden'}></div>

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
                <button className={isButtonClickable? 'enabled' : 'disabled'} onClick={goToChat}>
                    {/* <a style={{ color: "#ffffff", textDecoration: "none" }} href="/chat"> */}
                        Begin!
                    {/* </a> */}
                </button>
            ) : (
                <button disabled className="disabled">
                    Begin!
                </button>
            )}

            {showPopup && (
                <div className="popup">
                    <p>Kill Yourself</p>
                    <button onClick={closePopup}>OK</button>
                </div>
            )}
        </div>
            </>
    );
}

export default LandingPage;
