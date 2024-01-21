import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';
import { getDatabase, ref, push, onValue, get } from 'firebase/database';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../../main.jsx'
import {parseCourseArrayClasses, writeToFirebaseWithObjectType} from "../VisualResponse/VisualResponse.jsx";

const initMessages = () => {
  const dbRef = ref(getDatabase());
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : 'anonymous';
  let messageData = []
  get(child(dbRef, `${userId}/input/chats`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      messageData = snapshot.val();
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  return messageData
}

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to the bottom whenever messages change
  useEffect(scrollToBottom, [messages]);

  const demarkupText = (text) => {
    // Remove markdown or HTML-like tags
    const cleanedText = text.replace(/<[^>]*>|[*_]/g, '');
    return cleanedText;
  };

  const extraNewLine = (text) => {
    // Add another \n to each \n
    const cleanedText = text.replace(/\n/g, '\n\n');
    return cleanedText;
  };

  // Function to fetch and set past messages when the component mounts
  const fetchMessageHistory = () => {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : 'anonymous';
    const db = getDatabase();
    const userMessagesRef = ref(db, `${userId}/input/chats`);
    const aiMessagesRef = ref(db, `${userId}/output/chats`);
    // Listen for changes in the database and update state
    onValue(userMessagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const userMessageData = snapshot.val();
        const userMessageArray = Object.values(userMessageData);
        onValue(aiMessagesRef, (snapshot1) => {
          if (snapshot1.exists()) {
            const aiMessageData = snapshot1.val();
            const aiMessageArray = Object.values(aiMessageData);
            console.log("AI: ", aiMessageArray);
            const allMessageArray = []
            for (let i = 0; i < userMessageArray.length; i++) {
              allMessageArray.push(userMessageArray[i]);
              allMessageArray.push(aiMessageArray[i]);
            }
            setMessages([...allMessageArray]);
          }
        })
      }
    });
  };
  // Fetch message history when the component mounts
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid)
        if(messages.length===0) {
          fetchMessageHistory(uid);
        }
      } else {
        console.log("Not logged in")
      }
    });
  }, [])

  // Function to handle sending a new message
  const handleSendMessage = async (e) => {
    if (isLoading || e.key !== 'Enter') {
      return;
    }

    const messageText = newMessage.trim();
    if (messageText === '') {
      return;
    }

    setIsLoading(true);


    // // Simulate loading for 2 seconds
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : 'anonymous';

    const userMessage = {
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      role: "user"
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');

    const db = getDatabase()
    const messagesRef = ref(db, `${userId}/input/majors`);
    let majors=[];
    // Listen for changes in the database and update state
    onValue(messagesRef, (snapshot) => {
      console.log(snapshot.exists());
      if (snapshot.exists()) {
        const degrees = snapshot.val();
        const extracted = Object.values(degrees);
        console.log('hgfgfgyguy',degrees);
        majors = extracted;
      }
    });
    console.log('1234567',majors);

    const thread_url = 'http://127.0.0.1:8001/thread?'
    const res1 = await fetch(thread_url + new URLSearchParams({
      message: messageText,
      degrees: majors.toString()
    }));

    const catalog_url = 'http://127.0.0.1:8001/catalog?'
    const res2 = await fetch(catalog_url + new URLSearchParams({
      query: messageText
    }));
    
    let chat_data = await res1.json();
    let widget_data = await res2.json();

    console.log(chat_data);
    console.log(widget_data);

    let classesData = parseCourseArrayClasses(widget_data['documents'][0]);
    writeToFirebaseWithObjectType(classesData, 'classes');
    writeToFirebaseWithObjectType(semesters, 'semesters');
    writeToFirebaseWithObjectType(professorRatingsData, 'professorRatings');

    const aiMessage = {
      text: demarkupText(chat_data.response),
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      role: "assistant"
    }
    console.log(aiMessage)
    setMessages([...messages, aiMessage]);
    setNewMessage('');
    setIsLoading(false)

    const userMessagesRef = ref(db, `${userId}/input/chats`);
    push(userMessagesRef, userMessage)
        // .then(() => {
        //   setMessages([...messages, userMessage]);
        //   setNewMessage('');
        // })
        .catch((error) => {
          console.error('Error sending message: ', error);
        })
        // .finally(() => {
        //   setIsLoading(false);
        // });

    const aiMessagesRef = ref(db, `${userId}/output/chats`);
    push(aiMessagesRef, aiMessage)
        // .then(() => {
        //   setMessages([...messages, aiMessage]);
        //   setNewMessage('');
        // })
        .catch((error) => {
          console.error('Error sending message: ', error);
        })
        // .finally(() => {
        //   setIsLoading(false);
        // });
  };

  return (
    <div className="chat-window-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={(message['role'] === 'user') ? 'user-message' : 'ai-message'}>
            <div>{message.text}</div>
            <div className="timestamp">{message.timestamp}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        {isLoading && (
          <div className="loading-animation-container">
            <div className="loading-animation"></div>
          </div>
        )}
        <input
          id="ChatBox"
          type="text"
          placeholder={isLoading ? 'Sending...' : 'Enter a message... the more details the better!'}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleSendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

export default ChatWindow;


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