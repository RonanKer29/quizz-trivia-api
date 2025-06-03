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
      handleAnswerClick("⏱TIMEOUT");
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
    <div className="h-screen w-screen flex items-center justify-center px-4">
      <div className="text-center max-w-xl space-y-6">
        <p className="text-gray-600 text-sm">
          {" "}
          Question : {currentIndex + 1} / {totalQuestions}
        </p>
        <p className="text-xl font-semibold">
          {decodeHTML(questionData.question)}
        </p>

        <div className="grid gap-4">
          <p className="text-sm text-gray-500">⏱ Temps restant : {timer}s</p>

          {shuffledAnswers.map((sa, i) => (
            <Button
              onClick={() => handleAnswerClick(sa)}
              disabled={selectedAnswer !== null}
              key={i}
              className={`w-full ${
                selectedAnswer
                  ? sa === questionData.correct_answer
                    ? "bg-green-500 text-white"
                    : sa === selectedAnswer
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                  : ""
              }`}
            >
              {decodeHTML(sa)}
            </Button>
          ))}
          {selectedAnswer !== null && (
            <Button onClick={onNext}>Question suivante</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
