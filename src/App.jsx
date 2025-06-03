import { useState, useEffect } from "react";
import Welcome from "./components/Welcome";
import QuestionCard from "./components/QuestionCard";
import ScoreScreen from "./components/ScoreScreen";
import Login from "./components/Login";
import { getUser, signOut } from "./utils/auth";
import { CATEGORY_LABELS } from "./utils/categories";

const App = () => {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState("Mix");

  // Vérifie l'authentification à l'arrivée
  useEffect(() => {
    const fetchUser = async () => {
      const u = await getUser();
      setUser(u);
    };
    fetchUser();
  }, []);

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
      setSelectedCategoryId(categoryId || "");
      setSelectedCategoryLabel(CATEGORY_LABELS[categoryId] || "Mix");
    } catch (err) {
      console.error("Erreur lors du chargement des questions:", err);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  // Déconnexion utilisateur
  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setIsQuizStarted(false);
    setScore(0);
    setCurrentIndex(0);
  };

  if (!user) {
    return <Login onAuthSuccess={() => window.location.reload()} />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          Connecté en tant que : {user.email}
        </p>
        <button
          onClick={handleLogout}
          className="text-red-600 text-sm underline hover:text-red-800"
        >
          Se déconnecter
        </button>
      </div>

      {isQuizStarted ? (
        questions.length > 0 ? (
          currentIndex < questions.length ? (
            <QuestionCard
              currentIndex={currentIndex}
              questionData={questions[currentIndex]}
              onAnswer={handleAnswer}
              onNext={() => setCurrentIndex((prev) => prev + 1)}
              totalQuestions={questions.length}
              selectedCategoryLabel={selectedCategoryLabel}
            />
          ) : (
            <ScoreScreen
              score={score}
              total={questions.length}
              category={selectedCategoryLabel}
              selectedCategoryLabel={selectedCategoryLabel}
              userId={user.id}
              userName={user.email}
              onRestart={() => {
                setCurrentIndex(0);
                setScore(0);
                setIsQuizStarted(false);
              }}
            />
          )
        ) : (
          <p className="text-center mt-20 text-gray-500">
            Chargement des questions...
          </p>
        )
      ) : (
        <Welcome onStart={startQuiz} />
      )}
    </div>
  );
};

export default App;
