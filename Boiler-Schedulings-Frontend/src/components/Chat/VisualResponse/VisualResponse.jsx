import React from 'react';
import ClassRecommendation from './ClassRecommendation/ClassRecommendation';
import SelectorQuestion from './SelectorQuestion/SelectorQuestion';
import ProfessorRatings from './ProfessorRatings/ProfessorRatings';
import ScheduleView from './ScheduleView/ScheduleView';
import './VisualResponse.css';

function VisualResponse() {
    const classesData = [
        {
            name: 'Math 101',
            description: 'Introduction to Mathematics',
        },
        {
            name: 'History 202',
            description: 'Modern World History',
        },
        {
            name: 'Science 301',
            description: 'Advanced Science Topics',
        },
        {
            name: 'English 101',
            description: 'Basic English Language Skills',
        },
        {
            name: 'Art 204',
            description: 'Contemporary Art Forms',
        },
    ];

    const professorRatingsData = [
        {
            name: 'Professor John Doe',
            department: 'Computer Science',
            averageRating: 4.5,
        },
        {
            name: 'Professor Jane Smith',
            department: 'Mathematics',
            averageRating: 4.2,
        },
        {
            name: 'Professor Tinklebottom',
            department: 'Dance',
            averageRating: 3.2,
        },
        // Add more professor ratings as needed
    ];

    return (
        <div className="visual-response-container">
            <ClassRecommendation classes={classesData} />
            <SelectorQuestion />
            <ProfessorRatings ratings={professorRatingsData}/>
            <ScheduleView />
            {/* Add more components as needed */}
        </div>
    );
}

export default VisualResponse;
