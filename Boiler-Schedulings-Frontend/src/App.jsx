// App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Chat from './components/Chat/Chat.jsx';
import SignIn from './components/SignIn/SignIn.jsx';
import SignOutButton from './components/SignOutButton/SignOutButton.jsx';
import { useUser } from './components/UserContext/UserContext.jsx';

function App() {
    const { user } = useUser();

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <SignIn />}/>
                    <Route path="/landing" element={<LandingPage/>} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
