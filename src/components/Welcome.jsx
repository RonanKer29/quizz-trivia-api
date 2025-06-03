import { useState } from "react";
import { Button } from "./ui/button";
import { RocketIcon } from "lucide-react";

const Welcome = ({ onStart }) => {
  const [nbQuestions, setNbQuestions] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl border border-gray-300 max-w-xl w-full p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-indigo-600">
          🎉 Bienvenue dans le Super Quiz !
        </h1>

        <p className="text-gray-700">
          Tu vas affronter <strong>{nbQuestions}</strong> questions à choix
          multiples. Tu as <strong>15 secondes</strong> par question.
        </p>
        <p className="text-gray-700">
          Une bonne réponse = vert. Une mauvaise ? Elle s'affichera en rouge
          avec la bonne réponse.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Choisis ta catégorie
            </label>
            <select
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">🎲 Mix de catégories</option>
              <option value="9">🧠 Culture Générale</option>
              <option value="11">🎬 Films</option>
              <option value="12">🎵 Musique</option>
              <option value="18">💻 Informatique</option>
              <option value="17">🌿 Science & Nature</option>
              <option value="21">🏅 Sport</option>
              <option value="23">📜 Histoire</option>
              <option value="27">🐾 Animaux</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Nombre de questions (1 à 20)
            </label>
            <input
              type="number"
              min="1"
              max="20"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={nbQuestions}
              onChange={(e) => setNbQuestions(Number(e.target.value))}
            />
          </div>
        </div>

        <Button
          className="w-full text-lg font-semibold py-6 gap-2"
          onClick={() => onStart(nbQuestions, selectedCategory)}
        >
          <RocketIcon className="w-5 h-5" />
          Démarrer le Quiz
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
