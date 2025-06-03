import { useState } from "react";
import { signIn, signUp } from "../utils/auth";
import { Button } from "./ui/button";

const Login = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const { error } = isLogin
      ? await signIn(email, password)
      : await signUp(email, password);

    if (error) {
      setErrorMsg(error.message);
    } else {
      onAuthSuccess?.();
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg border max-w-md w-full space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-800">🧠 Quizz-Trivia</h1>
          <p className="text-sm text-gray-600">
            Teste tes connaissances, bats des records, et débloque ton plein
            potentiel !
          </p>
          <p className="text-sm text-gray-500">
            {isLogin
              ? "Connecte-toi pour commencer l’aventure."
              : "Crée un compte pour te mesurer aux meilleurs."}
          </p>
        </div>

        {errorMsg && (
          <p className="text-red-600 text-sm text-center">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />

          <Button type="submit" className="w-full">
            {isLogin ? "Se connecter" : "Créer mon compte"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline font-medium"
          >
            {isLogin ? "Créer un compte" : "Se connecter"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
