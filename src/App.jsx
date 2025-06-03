import { useState } from "react";
import Welcome from "./components/Welcome";
import QuestionCard from "./components/QuestionCard";
import ScoreScreen from "./components/ScoreScreen";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = async (amount, categoryId) => {
    try {
      let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;

      if (categoryId) {
        url += `&category=${categoryId}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setQuestions(data.results);
      setIsQuizStarted(true);
    } catch (err) {
      console.error("Erreur lors du chargement des questions:", err);
    }
  };

  if (!isQuizStarted) {
    return <Welcome onStart={startQuiz} />;
  }

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div>
      {questions.length > 0 ? (
        currentIndex < questions.length ? (
          <QuestionCard
            currentIndex={currentIndex}
            questionData={questions[currentIndex]}
            onAnswer={handleAnswer}
            onNext={() => setCurrentIndex((prev) => prev + 1)}
            totalQuestions={questions.length}
          />
        ) : (
          <ScoreScreen
            score={score}
            total={questions.length}
            onRestart={() => {
              setCurrentIndex(0);
              setScore(0);
              setIsQuizStarted(false);
            }}
          />
        )
      ) : (
        <p>Chargement de la question...</p>
      )}
    </div>
  );
};

export default App;
