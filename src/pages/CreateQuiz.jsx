import { useState } from "react";

export default function CreateQuiz() {
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correct: "" },
  ]);
  const [quizCode, setQuizCode] = useState("");

  // Kod yaratish (masalan: MATH-1234)
  const generateCode = () => {
    const code = subject.slice(0, 4).toUpperCase() + "-" + Math.floor(Math.random() * 9000 + 1000);
    setQuizCode(code);
  };

  // Savol qo‘shish
  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correct: "" }]);
  };

  // Savolni o‘zgartirish
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === "question" || field === "correct") {
      newQuestions[index][field] = value;
    } else {
      newQuestions[index].options[field] = value;
    }
    setQuestions(newQuestions);
  };

  // Testni saqlash
  const saveQuiz = () => {
    if (!subject) return alert("Fan nomini kiriting!");
    if (!quizCode) generateCode();

    const newQuiz = {
      subject,
      quizCode: quizCode || subject.slice(0, 4).toUpperCase() + "-" + Math.floor(Math.random() * 9000 + 1000),
      questions,
    };

    const existing = JSON.parse(localStorage.getItem("quizzes")) || [];
    existing.push(newQuiz);
    localStorage.setItem("quizzes", JSON.stringify(existing));

    alert(`Test saqlandi!\nKod: ${newQuiz.quizCode}`);
    setSubject("");
    setQuestions([{ question: "", options: ["", "", "", ""], correct: "" }]);
    setQuizCode("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">🧠 Test yaratish (O‘qituvchi)</h2>

      <label className="block mb-2 font-semibold">Fan nomi:</label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Masalan: Matematika"
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={generateCode}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        🔑 Kod yaratish
      </button>

      {quizCode && (
        <p className="mb-4 text-green-600 font-semibold">
          Test kodi: {quizCode}
        </p>
      )}

      {questions.map((q, i) => (
        <div key={i} className="border p-4 mb-4 rounded-xl">
          <label className="font-semibold">Savol {i + 1}:</label>
          <input
            type="text"
            value={q.question}
            onChange={(e) => handleQuestionChange(i, "question", e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />

          {q.options.map((opt, j) => (
            <input
              key={j}
              type="text"
              value={opt}
              onChange={(e) => handleQuestionChange(i, j, e.target.value)}
              placeholder={`Variant ${String.fromCharCode(65 + j)}`}
              className="w-full border p-2 rounded mb-2"
            />
          ))}

          <label className="font-semibold">To‘g‘ri javob (A/B/C/D):</label>
          <input
            type="text"
            value={q.correct}
            onChange={(e) => handleQuestionChange(i, "correct", e.target.value.toUpperCase())}
            className="w-full border p-2 rounded mb-2"
          />
        </div>
      ))}

      <div className="flex gap-4">
        <button
          onClick={addQuestion}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          ➕ Savol qo‘shish
        </button>
        <button
          onClick={saveQuiz}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          💾 Testni saqlash
        </button>
      </div>
    </div>
  );
}
