import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const foundQuiz = quizzes.find((q) => q.quizCode === code.toUpperCase());

    if (foundQuiz) {
      localStorage.setItem("currentQuiz", JSON.stringify(foundQuiz));
      navigate("/take-quiz");
    } else {
      alert("Bunday test kodi topilmadi!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200">
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Test kodini kiriting
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Masalan: MAT123"
            required
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 uppercase"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Testni boshlash
          </button>
        </form>
      </div>
    </div>
  );
}
