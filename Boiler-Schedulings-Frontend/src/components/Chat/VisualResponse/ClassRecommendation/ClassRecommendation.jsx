import React, { useState } from 'react';
import Overlay from './ClassRecOverlay/ClassRecOverlay.jsx';
import './ClassRecommendation.css';

const ClassRecommendation = ({ classes }) => {
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

    return (
        <div className="class-recommendation-container">
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
