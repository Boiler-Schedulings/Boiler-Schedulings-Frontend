import React from 'react';
import './ClassRecOverlay.css';

const ClassRecOverlay = ({ isActive, onClick }) => {
    if (!isActive) return null;

    return <div className="overlay" onClick={onClick}></div>;
};

export default ClassRecOverlay;
