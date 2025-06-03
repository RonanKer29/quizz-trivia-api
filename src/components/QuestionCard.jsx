import { useEffect, useState } from "react";
import shuffleArray from "@/utils/shuffle";
import { Button } from "./ui/button";
import decodeHTML from "@/utils/decodeHTML";

const QuestionCard = ({
  questionData,
  currentIndex,
  onAnswer,
  onNext,
  totalQuestions,
  selectedCategoryLabel,
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(15);

  const allAnswersPossible = [
    ...questionData.incorrect_answers,
    questionData.correct_answer,
  ];

  useEffect(() => {
    if (selectedAnswer !== null) return;

    if (timer === 0) {
      handleAnswerClick("TIMEOUT");
      return;
    }

    const countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer, selectedAnswer]);

  useEffect(() => {
    const mixedAnswers = shuffleArray(allAnswersPossible);
    setShuffledAnswers(mixedAnswers);
    setSelectedAnswer(null);
    setTimer(15);
  }, [questionData]);

  function handleAnswerClick(answer) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === questionData.correct_answer;
    onAnswer(isCorrect);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white border shadow-xl rounded-2xl max-w-2xl w-full p-8 space-y-6">
        <div className="text-sm text-gray-600 font-medium">
          Catégorie :{" "}
          <span className="font-semibold text-indigo-600">
            {selectedCategoryLabel}
          </span>
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>
            Question {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="font-semibold text-red-600">Temps : {timer}s</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          {decodeHTML(questionData.question)}
        </h2>

        <div className="grid gap-4">
          {shuffledAnswers.map((sa, i) => (
            <Button
              key={i}
              onClick={() => handleAnswerClick(sa)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left font-medium py-3 ${
                selectedAnswer
                  ? sa === questionData.correct_answer
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : sa === selectedAnswer
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-200 text-gray-600"
                  : ""
              }`}
            >
              {decodeHTML(sa)}
            </Button>
          ))}

          {selectedAnswer !== null && (
            <Button
              onClick={onNext}
              className="w-full font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Question suivante
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
