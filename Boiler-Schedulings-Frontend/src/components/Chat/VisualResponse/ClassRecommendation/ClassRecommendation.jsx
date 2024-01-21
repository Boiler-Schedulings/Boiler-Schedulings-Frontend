import React, { useState } from 'react';
import Overlay from './ClassRecOverlay/ClassRecOverlay.jsx';
import './ClassRecommendation.css';

const ClassRecommendation = ({ classes }) => {
    if(classes===null){
        return null;
    }
    const [selectedClass, setSelectedClass] = useState(null);

    const handleSelectClass = (classItem) => {
        setSelectedClass(classItem);
    };

    const handleCloseDetail = () => {
        setSelectedClass(null);
    };

    if (!classes) {
        return <div>Loading...</div>;
    }
    console.log(classes, "Class Reqs");
    return (
        <div className="class-recommendation-container">
            <h1>Course Recommendations:</h1> {/* Header added here */}
            <ul className="class-list">
                {Object.values(classes).map((classItem, index) => (
                    <li key={index} onClick={() => handleSelectClass(classItem)}>
                        {classItem.name}
                    </li>
                ))}
            </ul>

            {selectedClass && (
                <>
                    <Overlay isActive={true} onClick={handleCloseDetail} />
                    <div className="class-detail">
                        <h2>{selectedClass.name}</h2>
                        <p>{selectedClass.description}</p>
                        <button onClick={handleCloseDetail}>Close</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ClassRecommendation;
