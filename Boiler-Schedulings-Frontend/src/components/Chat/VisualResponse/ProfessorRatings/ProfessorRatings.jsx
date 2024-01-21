import React from 'react';
import './ProfessorRatings.css';

function ProfessorRatings({ ratings }) {
    function getRatingColor(averageRating) {
        if (averageRating >= 5) return '#40b442'; // Full Green for rating >= 5
        if (averageRating >= 4) return '#66ad37'; // Very Light Green for rating >= 4
        if (averageRating >= 3.5) return '#84be3d'; // Extremely Pale Green for rating >= 3.5
        if (averageRating >= 3) return '#9eb634'; // Very Pale Yellow for rating >= 3
        if (averageRating >= 2.8) return '#a49e2f'; // Extremely Pale Yellow for rating >= 2.8
        if (averageRating >= 2.6) return '#9d8c3d'; // Almost White-Yellow for rating >= 2.6
        if (averageRating >= 2.5) return '#a6713c'; // Full Yellow for rating >= 2.5
        if (averageRating >= 2.3) return '#c06828'; // Lighter Yellow for rating >= 2.3
        if (averageRating >= 2.1) return '#b64f2c'; // Light Yellow for rating >= 2.1
        if (averageRating >= 1) return '#b63a2f'; // Orange for rating >= 1
        return '#8c0707'; // Full Red for rating < 1
    }


    return (
        <div className="professor-ratings-container">
            {Object.values(ratings).map((rating, index) => (
                <div key={index} className="rating-card">
                    <h3 className="professor-name">{rating.name}</h3>
                    <p className="department">{rating.department}</p>
                    <p className="rating" style={{ backgroundColor: getRatingColor(rating.averageRating) }}>
                        Rating: {rating.averageRating} / 5
                    </p>
                </div>
            ))}
        </div>
    );
}

export default ProfessorRatings;
