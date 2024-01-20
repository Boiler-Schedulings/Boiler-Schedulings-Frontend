import React from 'react';
import ClassRecommendation from './ClassRecommendation/ClassRecommendation';
import SelectorQuestion from './SelectorQuestion/SelectorQuestion';
import ProfessorRatings from './ProfessorRatings/ProfessorRatings';
import ScheduleView from './ScheduleView/ScheduleView';
import './VisualResponse.css';

function VisualResponse() {
    return (
        <div className="visual-response-container">
            <ClassRecommendation />
            <SelectorQuestion />
            <ProfessorRatings />
            <ScheduleView />
            {/* Add more components as needed */}
        </div>
    );
}

export default VisualResponse;
