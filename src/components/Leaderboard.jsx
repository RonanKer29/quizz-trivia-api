import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .order("score", { ascending: false })
        .limit(20);

      if (error) {
        console.error(
          "Erreur lors du chargement du leaderboard :",
          error.message
        );
      } else {
        setLeaderboard(data);
      }
    };

    fetchLeaderboard();
  }, []);

  const medalEmoji = ["🥇", "🥈", "🥉"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-50 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-indigo-700">🏆 Leaderboard</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          Retour au menu
        </Button>
      </div>

      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-xl border border-indigo-200">
        {leaderboard.length === 0 ? (
          <p className="text-center text-gray-500">
            Aucun score enregistré pour l’instant.
          </p>
        ) : (
          leaderboard.map((entry, index) => {
            const percent = Math.round((entry.score / entry.total) * 100);
            const isTop3 = index < 3;

            return (
              <Card
                key={entry.id || index}
                className={`flex items-center justify-between px-6 py-4 rounded-lg border ${
                  isTop3 ? "border-yellow-400 bg-yellow-50" : "border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-xl font-bold w-8 text-center">
                    {isTop3 ? medalEmoji[index] : `#${index + 1}`}
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-800">
                      {entry.user_name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Catégorie : {entry.category || "Mix"}
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="font-bold text-indigo-700">
                    {entry.score} / {entry.total}
                  </p>
                  <p className="text-gray-500">{percent}%</p>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
