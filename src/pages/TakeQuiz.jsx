import { useState, useEffect } from "react";

export default function TakeQuiz() {
  const [quizCode, setQuizCode] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); // 60 soniya
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Testni kod orqali topish
  const handleStart = () => {
    const allQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const found = allQuizzes.find((q) => q.quizCode === quizCode.trim().toUpperCase());
    if (!found) return alert("Bunday test topilmadi!");
    setQuiz(found);
    setTimeLeft(60);
  };

  // Timer (1 soniyada bittadan kamayadi)
  useEffect(() => {
    if (!quiz || showResult) return;
    if (timeLeft === 0) return calculateResult();

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quiz, showResult]);

  // Javob tanlash
  const selectAnswer = (option) => {
    setAnswers({ ...answers, [currentIndex]: option });
  };

  // Keyingi savol
  const nextQuestion = () => {
    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateResult();
    }
  };

  // Natijani hisoblash
  const calculateResult = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i]?.toUpperCase() === q.correct.toUpperCase()) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResult(true);
  };

  // Qayta boshlash
  const restart = () => {
    setQuiz(null);
    setQuizCode("");
    setAnswers({});
    setCurrentIndex(0);
    setShowResult(false);
    setScore(0);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg text-center">
      {!quiz ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">🎯 Testni boshlash</h2>
          <input
            type="text"
            value={quizCode}
            onChange={(e) => setQuizCode(e.target.value)}
            placeholder="O‘qituvchingiz bergan test kodini kiriting"
            className="border p-2 rounded w-full mb-4 text-center"
          />
          <button
            onClick={handleStart}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            🚀 Boshlash
          </button>
        </div>
      ) : showResult ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-600">✅ Natija</h2>
          <p className="text-lg mb-2">Fan: {quiz.subject}</p>
          <p className="text-lg mb-2">
            To‘g‘ri javoblar: {score} / {quiz.questions.length}
          </p>
          <p className="text-lg font-semibold">
            Ball: {Math.round((score / quiz.questions.length) * 100)}%
          </p>
          <button
            onClick={restart}
            className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
          >
            🔁 Qayta boshlash
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between mb-2">
            <p className="font-semibold">Fan: {quiz.subject}</p>
            <p className="font-semibold text-red-600">⏳ {timeLeft} soniya</p>
          </div>

          <h3 className="text-xl font-bold mb-4">
            {currentIndex + 1}. {quiz.questions[currentIndex].question}
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {quiz.questions[currentIndex].options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              return (
                <button
                  key={idx}
                  onClick={() => selectAnswer(letter)}
                  className={`border rounded p-3 ${
                    answers[currentIndex] === letter
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {letter}. {opt}
                </button>
              );
            })}
          </div>

          <button
            onClick={nextQuestion}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {currentIndex + 1 === quiz.questions.length ? "✅ Yakunlash" : "➡️ Keyingi"}
          </button>
        </div>
      )}
    </div>
  );
}
