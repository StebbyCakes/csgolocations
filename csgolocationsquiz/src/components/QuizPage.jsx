import React, { useState, useEffect } from 'react';
import quizData from '../data/quizData.json';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function QuizPage() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const allLocations = [];
        quizData.forEach(map => {
            map.locations.forEach(location => {
                allLocations.push({
                    mapName: map.map,
                    locationName: location.name,
                    images: location.images
                });
            });
        });

        // Select 20 unique locations
        shuffleArray(allLocations);
        const selectedLocations = allLocations.slice(0, 20);

        // Prepare questions
        const preparedQuestions = selectedLocations.map(selected => {
            const { mapName, locationName, images } = selected;

            // Pick one random image from the selected location
            const image = images[Math.floor(Math.random() * images.length)];

            // Prepare options
            const incorrectOptions = allLocations
                .filter(loc => loc.locationName !== locationName && loc.mapName === mapName)
                .map(loc => loc.locationName);
            shuffleArray(incorrectOptions);
            const options = [locationName, ...incorrectOptions.slice(0, 3)];
            shuffleArray(options); // Shuffle to mix the correct answer with incorrect ones

            return { image, options };
        });

        setQuestions(preparedQuestions);
    }, []);

    return (
        <div>
            {questions.map((question, index) => (
                <div key={index}>
                    <img src={question.image} alt={`Location for question ${index + 1}`} />
                    <div>
                        {question.options.map((option, idx) => (
                            <button key={idx}>{option}</button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default QuizPage;
