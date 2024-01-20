// SignOutButton.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './SignOutButton.css';

function SignOutButton() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then();
    };

    return (
        <button onClick={handleSignOut} className="sign-out-button">
            Sign Out
        </button>
    );
}

export default SignOutButton;
