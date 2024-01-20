// SignIn.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';

function SignIn() {
    const navigate = useNavigate();

    const handleSignIn = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithRedirect(auth, provider).then(() => {
            // After successful sign in, navigate to the landing page
            navigate('/landing');
        }).catch((error) => {
            // Handle sign-in errors here
            console.error('Sign-in error:', error);
        });
    };

    return (
        <div className="landing-page">
            <h1>Welcome to BOILER SCHEDULINGS</h1>
            <button onClick={handleSignIn}>Sign in with Google</button>
            {/* Additional content */}
        </div>
    );
}

export default SignIn;
