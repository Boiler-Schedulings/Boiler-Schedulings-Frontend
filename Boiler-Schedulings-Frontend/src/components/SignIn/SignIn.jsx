// SignIn.jsx

import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import './SignIn.css';
import {set} from "firebase/database";

function SignIn() {
    const navigate = useNavigate();

    const handleSignIn = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
        navigate('/landing');

    };

    return (
        <div className="landing-page">
            <h1>Welcome to BOILER SCHEDULINGS</h1>
            <button onClick={handleSignIn}>Sign in with Google</button>
        </div>
    );
}

export default SignIn;
