import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";

const getFeedbackMessage = (score, total) => {
  const ratio = score / total;
  if (ratio === 1) return "Parfait ! 💯 Tu es incollable.";
  if (ratio >= 0.8) return "Excellent travail 💪";
  if (ratio >= 0.5) return "Pas mal ! Tu peux faire encore mieux 😉";
  return "Ne te décourage pas, continue à t'entraîner 🙌";
};

const ScoreScreen = ({
  score,
  total,
  category,
  selectedCategoryLabel,
  userId,
  userName, // 👈 reçu depuis App.jsx
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
          user_name: userName, // ✅ email de l'utilisateur
          score,
          total,
          category,
        },
      ]);

      if (error) {
        console.error("❌ Erreur lors de l'enregistrement :", error.message);
      } else {
        console.log("✅ Score enregistré :", {
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
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4">
      <div className="text-center max-w-md w-full space-y-8 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
        <h2 className="text-4xl font-extrabold text-green-600">
          🎉 Quiz terminé !
        </h2>

        <p className="text-xl text-gray-700">
          Tu as obtenu <span className="font-bold">{score}</span> bonne
          {score > 1 ? "s" : ""} réponse{score > 1 ? "s" : ""} sur {total}.
          <br />
          <span className="text-sm italic">
            (Catégorie : {selectedCategoryLabel})
          </span>
        </p>

        <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
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

        <p className="text-lg italic text-gray-600">{message}</p>

        <Button onClick={onRestart} className="mt-4">
          🔄 Rejouer
        </Button>
      </div>
    </div>
  );
};

export default ScoreScreen;
