import React, { useEffect, useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Chat from './components/Chat/Chat.jsx';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                setUser(user);
            } else {
                // No user is signed in. Redirect to Google Sign-in.
                const provider = new GoogleAuthProvider();
                signInWithPopup(auth, provider)
                    .then((result) => {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;
                        // The signed-in user info.
                        const user = result.user;
                        // IdP data available using getAdditionalUserInfo(result)
                        // ...
                    }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });
            }
        });
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={user ? <Navigate to="/chat" /> : <LandingPage />} />
                    <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
