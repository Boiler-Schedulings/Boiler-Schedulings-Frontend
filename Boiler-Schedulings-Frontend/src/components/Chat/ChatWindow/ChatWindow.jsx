import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../../main.jsx'

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

  // Function to fetch and set past messages when the component mounts
  const fetchMessageHistory = () => {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : 'anonymous';
    const db = getDatabase();
    const messagesRef = ref(db, `${userId}/input/chats`);

    // Listen for changes in the database and update state
    onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messageData = snapshot.val();
        const messageArray = Object.values(messageData);
        setMessages(messageArray);
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

    // const auth = getAuth();
    // const userId = auth.currentUser ? auth.currentUser.uid : 'anonymous';

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



    const base_url = 'http://3.80.222.92:5000/thread?'
    const res = await fetch(base_url + new URLSearchParams({
      message: messageText
    }));
    let chat_data = await res.json();
    console.log(chat_data);

    const aiMessage = {
      text: chat_data.response,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      role: "assistant"
    }
    setMessages([...messages, aiMessage]);
    setNewMessage('');

    const db = getDatabase();
    const userMessagesRef = ref(db, `${userId}/input/chats`);
    push(userMessagesRef, userMessage)
        // .then(() => {
        //   setMessages([...messages, userMessage]);
        //   setNewMessage('');
        // })
        .catch((error) => {
          console.error('Error sending message: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });

    const aiMessagesRef = ref(db, `${userId}/output/chats`);
    push(aiMessagesRef, aiMessage)
        // .then(() => {
        //   setMessages([...messages, aiMessage]);
        //   setNewMessage('');
        // })
        .catch((error) => {
          console.error('Error sending message: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
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
