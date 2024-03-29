import React, { useState } from 'react';
import './ScheduleView.css';

function SemesterWidget({ semester, courses, totalCredits }) {
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
    };
    console.log(semester, "Sem");
    console.log(courses, "Course List");
    console.log(totalCredits, "Credits ");
    return (
        <>
            <div className="semester-widget-container">
                <div className="semester-widget">
                    <h3>{semester}</h3>
                    <ul>
                        {Object.values(courses).map((course, index) => (
                            <li key={index}>
                                {course.name} - Difficulty: {course.difficulty}
                                <div className="course-description" onClick={() => handleCourseClick(course)}>
                                    Description: {course.description.substring(0, 50)}...
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p>Total Credits: {totalCredits}</p>
                </div>
            </div>
            {selectedCourse && (
                <div className="course-overlay">
                    <div className="course-overlay-content">
                        <h4>{selectedCourse.name}</h4>
                        <p>{selectedCourse.description}</p>
                        <button className="overlay-close-button" onClick={() => setSelectedCourse(null)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}

function ScheduleView({ semestersData }) {
    if(semestersData===null){
        return null;
    }
    console.log(semestersData, "Schedjy");
    return (
        <div className="schedule-view-container">
            <div className="schedule-view">
                {semestersData ? (
                    Object.values(semestersData).map((semesterData, index) => (
                        <SemesterWidget key={index} {...semesterData} />
                    ))
                ) : (
                    <p>No semester data available</p>
                )}
                <div className="twovh-pad"></div>
            </div>
        </div>
    );
}

export default ScheduleView;
