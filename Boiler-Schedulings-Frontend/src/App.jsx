import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat.jsx";

function App() {
    return (
        <div className="app">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </BrowserRouter>
        </div>
    );
}

export default App;
