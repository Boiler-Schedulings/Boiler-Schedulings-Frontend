import React, {useEffect, useState} from 'react';
import ClassRecommendation from './ClassRecommendation/ClassRecommendation';
import ProfessorRatings from './ProfessorRatings/ProfessorRatings';
import ScheduleView from './ScheduleView/ScheduleView';
import './VisualResponse.css';
import {getAuth} from "firebase/auth";
import {getDatabase, onValue, push, ref} from "firebase/database";

function createWidget(type, data) {
    console.log(type,data,"create");
    switch (type) {
        case "classes":
            return <ClassRecommendation classes={data} />;
        case "professorRatings":
            return <ProfessorRatings ratings={data} />;
        case "semesters":
            return <ScheduleView semestersData={data} />;
        default:
            return null; // Return null for unknown types or when there's no data
    }
}

export const writeToFirebaseWithObjectType = async (dataObject, objectType) => {
    try {
        const auth = getAuth();
        const userId = auth.currentUser ? auth.currentUser.uid : 'anonymous';

        const db = getDatabase();
        const widgetsRef = ref(db, `${userId}/output/widgets`);

        // Create a new object with 'type' and 'data' fields
        const dataWithObjectType = {
            type: objectType,
            data: dataObject,
        };

        // Write the data to Firebase
        await push(widgetsRef, dataWithObjectType);

        console.log(`Data of type '${objectType}' written to Firebase successfully.`);
    } catch (error) {
        console.error('Error writing data to Firebase: ', error);
    }
};

export const parseCourseArrayClasses = (courseArray) => {
    const classesData = {};

    courseArray.forEach((course, index) => {
        // Extracting information using regular expressions
        const titleMatch = course.match(/COURSE_TITLE: (.*?) \|/);
        const descriptionMatch = course.match(/DESCRIPTION: (.*?) \*\*Credits:\*\* (\d+\.\d+)/);

        // Check if all necessary information is present
        if (titleMatch && descriptionMatch) {
            const className = `Class${index + 1}`;
            const name = titleMatch[1].trim();
            const description = descriptionMatch[1].trim();

            // Creating class entry in classesData
            classesData[className] = {
                name,
                description
            };
        }
    });

    return classesData;
};

function VisualResponse() {
    const [widgets, setWidgets] = useState([]);
    const fetchWidgetHistory = () => {
        const auth = getAuth();
        const userId = auth.currentUser ? auth.currentUser.uid : 'anonymous';
        const db = getDatabase();
        const messagesRef = ref(db, `${userId}/output/widgets`);

        // Listen for changes in the database and update state
        onValue(messagesRef, (snapshot) => {
            if (snapshot.exists()) {
                const widgetData = snapshot.val();
                const extracted = Object.values(widgetData);
                setWidgets((prevWidgets) => {
                    prevWidgets = extracted
                    return prevWidgets
                })
            }
        });
    };
    useEffect(fetchWidgetHistory, []);

    return (
        <div className="visual-response-container">
            {widgets.map((widget) => createWidget(widget.type, widget.data))}
            <div className="padding"></div>
        </div>
    );
}

export default VisualResponse;


const classesData = {
    Class1: {
        name: 'Math 101',
        description: 'Introduction to Mathematics',
    },
    Class2: {
        name: 'History 202',
        description: 'Modern World History',
    },
    Class3: {
        name: 'Science 301',
        description: 'Advanced Science Topics',
    },
    Class4: {
        name: 'English 101',
        description: 'Basic English Language Skills',
    },
    Class5: {
        name: 'Art 204',
        description: 'Contemporary Art Forms',
    },
};

const professorRatingsData = {
    ProfessorJohnDoe: {
        name: 'Professor John Doe',
        department: 'Computer Science',
        averageRating: 4.5,
    },
    ProfessorJaneSmith: {
        name: 'Professor Jane Smith',
        department: 'Mathematics',
        averageRating: 4.2,
    },
    ProfessorTinklebottom: {
        name: 'Professor Tinklebottom',
        department: 'Dance',
        averageRating: 3.2,
    },
    ProfessorJoe: {
        name: 'Professor Joe',
        department: 'Computer Science',
        averageRating: 2.4,
    },
    ProfessorSam: {
        name: 'Professor Sam',
        department: 'Mathematics',
        averageRating: 4.9,
    },
    ProfessorGoo: {
        name: 'Professor Goo',
        department: 'Dance',
        averageRating: 1.3,
    },
    // Add more professor ratings as needed
};

const semesters = {
    Fall2024: {
        semester: "Fall 2024",
        courses: {
            Course1: {
                name: "Course 1",
                description: "This is an example description for Course 1.",
                difficulty: 3,
                credits: 3
            },
            Course2: {
                name: "Course 2",
                description: "This is an example description for Course 2.",
                difficulty: 3,
                credits: 3
            },
            Course3: {
                name: "Course 3",
                description: "This is an example description for Course 3.",
                difficulty: 3,
                credits: 3
            },
            Course4: {
                name: "Course 4",
                description: "This is an example description for Course 4.",
                difficulty: 3,
                credits: 3
            },
            Course5: {
                name: "Course 5",
                description: "This is an example description for Course 5.",
                difficulty: 3,
                credits: 3
            },
        },
        totalCredits: 15
    },
    Spring2025: {
        semester: "Spring 2025",
        courses: {
            Course1: {
                name: "Course 1",
                description: "This is an example description for Course 1.",
                difficulty: 3,
                credits: 3
            },
            Course2: {
                name: "Course 2",
                description: "This is an example description for Course 2.",
                difficulty: 3,
                credits: 3
            },
            Course3: {
                name: "Course 3",
                description: "This is an example description for Course 3.",
                difficulty: 3,
                credits: 3
            },
            Course4: {
                name: "Course 4",
                description: "This is an example description for Course 4.",
                difficulty: 3,
                credits: 3
            },
            Course5: {
                name: "Course 5",
                description: "This is an example description for Course 5.",
                difficulty: 3,
                credits: 3
            },
            // More courses...
        },
        totalCredits: 15
    },
    Fall2025: {
        semester: "Fall 2025",
        courses: {
            Course1: {
                name: "Course 1",
                description: "This is an example description for Course 1.",
                difficulty: 3,
                credits: 3
            },
            Course2: {
                name: "Course 2",
                description: "This is an example description for Course 2.",
                difficulty: 3,
                credits: 3
            },
            Course3: {
                name: "Course 3",
                description: "This is an example description for Course 3.",
                difficulty: 3,
                credits: 3
            },
            Course4: {
                name: "Course 4",
                description: "This is an example description for Course 4.",
                difficulty: 3,
                credits: 3
            },
            Course5: {
                name: "Course 5",
                description: "This is an example description for Course 5.",
                difficulty: 3,
                credits: 3
            },
        },
        totalCredits: 15
    },
};

