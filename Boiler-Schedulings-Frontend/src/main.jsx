import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {getAuth} from 'firebase/auth'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {UserProvider} from "./components/UserContext/UserContext.jsx";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDUJcDgS0xwszqMAu33LvpQpBZmRNyN6Ro",
    authDomain: "boilerschedulings.firebaseapp.com",
    databaseURL: "https://boilerschedulings-default-rtdb.firebaseio.com",
    projectId: "boilerschedulings",
    storageBucket: "boilerschedulings.appspot.com",
    messagingSenderId: "785034386913",
    appId: "1:785034386913:web:ee4070166d8b5f2d4646a0",
    measurementId: "G-KX0X1G7XGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <UserProvider app={app}>
        <App />
    </UserProvider>
    // </React.StrictMode>,
)

export const auth = getAuth(app);