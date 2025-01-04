// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import About from './components/About';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz/:mode" element={<QuizPage />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
