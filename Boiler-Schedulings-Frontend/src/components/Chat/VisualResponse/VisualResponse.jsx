import React, {useEffect, useRef, useState} from 'react';
import ClassRecommendation from './ClassRecommendation/ClassRecommendation';
import ProfessorRatings from './ProfessorRatings/ProfessorRatings';
import ScheduleView from './ScheduleView/ScheduleView';
import './VisualResponse.css';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getDatabase, onValue, push, ref} from "firebase/database";
import {auth} from "../../../main.jsx";

function createWidget(type, data) {
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
        const match = course.match(/COURSE_TITLE: (.*?) \| DESCRIPTION: (.*)/);

        // Check if the necessary information is present
        if (match) {
            const className = `Class${index + 1}`;
            const name = match[1].trim()
            const description = match[2].trim();

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
    const endOfWidgetsRef = useRef(null); // Ref
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
    const scrollToBottom = () => {
        endOfWidgetsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll to bottom every time widgets change
    useEffect(() => {
        scrollToBottom();
    }, [widgets]);
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchWidgetHistory();
        }, 2000); // 2000 milliseconds = 2 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);


    return (
        <div className="visual-response-container">
            {Object.values(widgets).map((widget) => createWidget(widget.type, widget.data))}
            <div ref={endOfWidgetsRef} className="padding"></div> {/* Ref attached here */}
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

