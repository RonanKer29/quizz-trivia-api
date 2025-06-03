import { useState } from "react";
import { Button } from "./ui/button";

const Welcome = ({ onStart }) => {
  const [nbQuestions, setNbQuestions] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="text-center max-w-md space-y-6 px-4">
        <h1 className="text-3xl font-bold">Bienvenue dans le Quiz !</h1>
        <p className="text-gray-700 text-base">
          Tu as 10 questions à choix multiple. Pour chaque question, tu as 15
          secondes pour répondre. Si tu ne réponds pas à temps, la réponse sera
          comptée comme incorrecte.
        </p>
        <p className="text-gray-700 text-base">
          Clique sur la bonne réponse : elle deviendra verte. Si tu te trompes,
          ta réponse sera rouge et la bonne sera affichée.
        </p>

        <select
          className="w-full border px-2 py-1 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">🎲 Mix de catégories</option>
          <option value="9">Culture Générale</option>
          <option value="11">Films</option>
          <option value="12">Musique</option>
          <option value="18">Informatique</option>
          <option value="17">Science et nature</option>
          <option value="21">Sport</option>
          <option value="23">Histoire</option>
          <option value="27">Animaux</option>
        </select>

        <input
          type="number"
          min="1"
          max="20"
          placeholder="Nombre de questions"
          className="w-full border px-2 py-1 rounded"
          value={nbQuestions}
          onChange={(e) => setNbQuestions(e.target.value)}
        />

        <Button onClick={() => onStart(nbQuestions, selectedCategory)}>
          Démarrer le quiz
        </Button>

        {/* <Button variant="outline" onClick={onStart}>
          Commencer le Quizz !
        </Button> */}
      </div>
    </div>
  );
};

export default Welcome;
