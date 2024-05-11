import { useState, useEffect } from 'react';
import './App.css';
import questiondata from "./question.json";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(20); // Change initial timer value to 20 seconds

  useEffect(() => {
    let interval;
    if (!showScore && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setShowScore(true);
    }

    return () => clearInterval(interval);
  }, [timer, showScore]);


  const handleAnswerKey = (selectedOption) => {
    if (selectedOption === questiondata[currentQuestion].answer) {
      setScore(prevScore => prevScore + 1);
    }

    if (currentQuestion < questiondata.length - 1 && !showScore) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setTimer(20); // Reset timer to 20 seconds for each question
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(20); // Reset timer to 20 seconds when restarting the quiz
  };

  return (
    <div className='quiz-app'>
      {showScore ? (
        <div className="score-section">
          <h2>Your score: {score}/{questiondata.length}</h2>
          <button onClick={handleRestartQuiz}>Restart</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>Question {currentQuestion + 1 }</h2>
          <p>{questiondata[currentQuestion].question}</p>
          <div className="buttons">
            {questiondata[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerKey(option)}>
                {option}
              </button>
            ))}
          </div>
          <div className="timer">
            <p>Time left: <span>{timer}s</span></p>
          </div>
          {/*  */}
        </div>
      )}
    </div>
  );
}

export default App;