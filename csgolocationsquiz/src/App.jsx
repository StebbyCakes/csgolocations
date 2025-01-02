import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage'; // Ensure this component is properly imported

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:mode" element={<QuizPage />} /> // Route for the QuizPage
      </Routes>
    </Router>
  );
}

export default App;
