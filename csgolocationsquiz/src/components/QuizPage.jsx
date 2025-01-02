import React, { useState, useEffect } from 'react';
import quizData from '../data/quizData.json';

function QuizPage() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);

    useEffect(() => {
        const generateQuestions = () => {
            const allLocations = [];
            quizData.forEach(map => {
                map.locations.forEach(location => {
                    allLocations.push({
                        mapName: map.map,
                        locationName: location.name,
                        image: location.images[Math.floor(Math.random() * location.images.length)]
                    });
                });
            });

            // Shuffle and pick the first 20 locations
            allLocations.sort(() => 0.5 - Math.random());
            const selectedLocations = allLocations.slice(0, 20);

            // Prepare questions with options
            const preparedQuestions = selectedLocations.map(location => {
                const correctAnswer = location.locationName;
                const wrongAnswers = allLocations
                    .filter(loc => loc.mapName === location.mapName && loc.locationName !== correctAnswer)
                    .map(loc => loc.locationName);
                
                wrongAnswers.sort(() => 0.5 - Math.random());

                const options = [correctAnswer, ...wrongAnswers.slice(0, 3)];
                options.sort(() => 0.5 - Math.random());

                return {
                    ...location,
                    options
                };
            });

            setQuestions(preparedQuestions);
        };

        generateQuestions();
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsAnswered(true);
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption('');
                setIsAnswered(false);
            } else {
                console.log('Quiz Finished');
                // Handle end of quiz, e.g., navigate to a results page
            }
        }, 1000); // Delay before moving to the next question
    };

    if (!questions.length) return <p>Loading quiz data...</p>;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.locationName;

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <div className="image-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img 
                    src={currentQuestion.image} 
                    alt={currentQuestion.locationName} 
                    style={{ maxWidth: '100%', maxHeight: '400px', width: 'auto', height: 'auto' }} 
                />
            </div>
            <div style={{ marginTop: '20px' }}>
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        style={{
                            backgroundColor: !isAnswered ? 'lightgray' : option === selectedOption ? (isCorrect ? 'green' : 'red') : option === currentQuestion.locationName ? 'yellow' : 'lightgray',
                            borderColor: 'black',
                            margin: '5px'
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuizPage;
