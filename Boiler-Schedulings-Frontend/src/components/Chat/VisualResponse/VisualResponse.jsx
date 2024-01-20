import React from 'react';
import ClassRecommendation from './ClassRecommendation/ClassRecommendation';
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
        {
            name: 'Professor Joe',
            department: 'Computer Science',
            averageRating: 2.4,
        },
        {
            name: 'Professor Same',
            department: 'Mathematics',
            averageRating: 4.9,
        },
        {
            name: 'Professor Goo',
            department: 'Dance',
            averageRating: 1.3,
        },
        // Add more professor ratings as needed
    ];
    const semesters = [
        {
            semester: "Fall 2024",
            courses: [
                {
                    name: "Course 1",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
                {
                    name: "Course 2",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
                {
                    name: "Course 3",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
                {
                    name: "Course 4",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
                {
                    name: "Course 5",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
            ],
            totalCredits: 15
        },
        {
            semester: "Spring 2025",
            courses: [
                {
                    name: "Course 1",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
                {
                    name: "Course 2",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
                {
                    name: "Course 3",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
                {
                    name: "Course 4",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
                {
                    name: "Course 5",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
                // More courses...
            ],
            totalCredits: 15
        },
        {
            semester: "Fall 2025",
            courses: [
                {
                    name: "Course 1",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
                {
                    name: "Course 2",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
                {
                    name: "Course 3",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
                {
                    name: "Course 4",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
                {
                    name: "Course 5",
                    description: "This is an example description for Course 1.",
                    difficulty: 3,
                    credits: 3
                },
            ],
            totalCredits: 15
        },
        // More semesters...
    ];
    return (
        <div className="visual-response-container">
            <ClassRecommendation classes={classesData} />
            <ProfessorRatings ratings={professorRatingsData}/>
            <ScheduleView semestersData={semesters}/>
            <div className="padding"></div>
        </div>
    );
}

export default VisualResponse;
