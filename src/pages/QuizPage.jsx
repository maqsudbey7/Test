import { useState } from "react";
import { getQuizzes } from "../utils/storage";
import QuestionCard from "../components/QuestionCard";

export default function QuizPage({ user }) {
  const quizzes = getQuizzes();
  const [teacherName, setTeacherName] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSelectTeacher = () => {
    const list = quizzes.filter(q => q.teacher === teacherName);
    setFiltered(list);
    setIndex(0);
    setScore(0);
    setShowResult(false);
  };

  if (filtered.length === 0 && !showResult)
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl mb-3">Qaysi o‘qituvchining testini ishlaysiz?</h2>
        <select
          value={teacherName}
          onChange={e => setTeacherName(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">O‘qituvchini tanlang</option>
          {[...new Set(quizzes.map(q => q.teacher))].map((t, i) => (
            <option key={i} value={t}>{t}</option>
          ))}
        </select>
        <button
          onClick={handleSelectTeacher}
          className="ml-3 bg-purple-600 text-white px-4 py-2 rounded"
        >
          Boshlash
        </button>
      </div>
    );

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    if (index + 1 < filtered.length) setIndex(index + 1);
    else setShowResult(true);
  };

  if (showResult)
    return (
      <div className="text-center mt-32">
        <h2 className="text-3xl font-semibold">
          Natija: {score} / {filtered.length}
        </h2>
        <p className="text-gray-600 mt-2">👏 Zo‘r ishlading, {user.name}!</p>
      </div>
    );

  return (
    <div className="max-w-lg mx-auto mt-10">
      <QuestionCard quiz={filtered[index]} onAnswer={handleAnswer} />
    </div>
  );
}
