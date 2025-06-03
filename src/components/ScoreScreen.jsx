import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";

const getFeedbackMessage = (score, total) => {
  const ratio = score / total;
  if (ratio === 1) return "Parfait ! Tu es incollable.";
  if (ratio >= 0.8) return "Excellent travail, belle performance.";
  if (ratio >= 0.5) return "Pas mal ! Tu peux encore progresser.";
  return "Ne te décourage pas, chaque partie te fait avancer.";
};

const ScoreScreen = ({
  score,
  total,
  category,
  selectedCategoryLabel,
  userId,
  userName,
  onRestart,
}) => {
  const percent = Math.round((score / total) * 100);
  const message = getFeedbackMessage(score, total);
  const hasInserted = useRef(false);

  useEffect(() => {
    if (hasInserted.current) return;

    const saveScore = async () => {
      const { error } = await supabase.from("games").insert([
        {
          user_id: userId,
          user_name: userName,
          score,
          total,
          category,
        },
      ]);

      if (error) {
        console.error("Erreur lors de l'enregistrement :", error.message);
      } else {
        console.log("Score enregistré :", {
          userId,
          userName,
          score,
          total,
          category,
        });
      }
    };

    saveScore();
    hasInserted.current = true;
  }, [userId, userName, score, total, category]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-indigo-700">Quiz terminé</h2>

        <p className="text-lg text-gray-800">
          Tu as obtenu <span className="font-semibold">{score}</span> bonne
          {score > 1 ? "s" : ""} réponse{score > 1 ? "s" : ""} sur {total}.
        </p>

        <p className="text-sm text-gray-500 italic">
          Catégorie : {selectedCategoryLabel}
        </p>

        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
          <div
            className={`h-full transition-all duration-700 ${
              percent >= 80
                ? "bg-green-500"
                : percent >= 50
                ? "bg-yellow-400"
                : "bg-red-400"
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-base text-gray-700 italic">{message}</p>

        <Button
          onClick={onRestart}
          className="mt-4 w-full bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Rejouer le quiz
        </Button>
      </div>
    </div>
  );
};

export default ScoreScreen;
