import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizData from '../data/quizData.json';

function QuizPage() {
    const { mode } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        const generateQuestions = () => {
            let allLocations = [];
            if (mode === 'active') {
                quizData.forEach(map => {
                    allLocations.push(...map.locations.map(location => ({
                        mapName: map.map,
                        locationName: location.name,
                        image: location.images[Math.floor(Math.random() * location.images.length)]
                    })));
                });
            } else {
                const mapData = quizData.find(map => map.map.replace(/\s+/g, '').toLowerCase() === mode);
                if (mapData) {
                    allLocations = mapData.locations.map(location => ({
                        mapName: mapData.map,
                        locationName: location.name,
                        image: location.images[Math.floor(Math.random() * location.images.length)]
                    }));
                } else {
                    console.error('No data found for map:', mode);
                    return;
                }
            }

            allLocations.sort(() => 0.5 - Math.random());
            const selectedLocations = allLocations.slice(0, 12);

            const preparedQuestions = selectedLocations.map(location => {
                const correctAnswer = location.locationName;
                const wrongAnswers = allLocations
                    .filter(loc => loc.mapName === location.mapName && loc.locationName !== correctAnswer)
                    .map(loc => loc.locationName);
                
                wrongAnswers.sort(() => 0.5 - Math.random());

                return {
                    ...location,
                    options: [correctAnswer, ...wrongAnswers.slice(0, 3)].sort(() => 0.5 - Math.random())
                };
            });

            setQuestions(preparedQuestions);
        };

        generateQuestions();
    }, [mode]);

    const handleOptionClick = (option) => {
        if (option === questions[currentQuestionIndex].locationName) {
            setCorrectAnswers(correctAnswers + 1);
        }
        setSelectedOption(option);
        setIsAnswered(true);
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption('');
                setIsAnswered(false);
            } else {
                setQuizFinished(true);
            }
        }, 1000);
    };

    const resetQuiz = () => {
        setQuizFinished(false);
        setCorrectAnswers(0);
        setCurrentQuestionIndex(0);
        setSelectedOption('');
        setIsAnswered(false);
        navigate(0);
    };

    if (!questions.length) return <p>NO QUIZ DATA</p>;

    if (quizFinished) {
        const score = Math.round((correctAnswers / questions.length) * 100);
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>Your Score: {score}%</h2>
                <button onClick={resetQuiz} style={{ margin: '10px', padding: '10px' }}>Restart Quiz</button>
                <button onClick={() => navigate('/')} style={{ margin: '10px', padding: '10px' }}>Go to Homepage</button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#212529' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#f8f9fa' }}>{currentQuestion.mapName}</h2>
            <div className="image-container" style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img 
                    src={currentQuestion.image} 
                    alt={currentQuestion.locationName} 
                    style={{ width: '700px', height: '450px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 8px 16px rgba(0,0,0,0.3)' }} 
                />
                <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', backgroundColor: 'rgba(0,0,0,0.7)', padding: '5px 10px', borderRadius: '10px', color: 'white' }}>
                    {currentQuestionIndex + 1}/12
                </div>
            </div>
            <div>
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        style={{
                            backgroundColor: !isAnswered ? '#6c757d' : option === selectedOption ? (option === currentQuestion.locationName ? '#28a745' : '#dc3545') : (option === currentQuestion.locationName ? '#ffc107' : '#6c757d'),
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '15px 30px',
                            margin: '5px',
                            fontSize: '18px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            outline: 'none'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuizPage;
