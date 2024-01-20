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
    return (
        <div className="visual-response-container">
            <ClassRecommendation classes={classesData} />
            <SelectorQuestion />
            <ProfessorRatings />
            <ScheduleView />
            {/* Add more components as needed */}
        </div>
    );
}

export default VisualResponse;
