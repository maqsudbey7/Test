// src/components/QuestionCard.jsx
import React, { useState } from "react";

export default function QuestionCard({ q, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handle = (i) => {
    setSelected(i);
    setRevealed(true);
    setTimeout(()=> {
      onAnswer(i === q.correctIndex);
      setSelected(null);
      setRevealed(false);
    }, 700); // qisqa feedback
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">{q.question}</h3>
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => {
          const isCorrect = revealed && i === q.correctIndex;
          const isWrong = revealed && selected===i && selected !== q.correctIndex;
          return (
            <button key={i} onClick={()=>handle(i)} className={`text-left p-2 rounded border ${isCorrect ? "bg-green-100" : ""} ${isWrong ? "bg-red-100" : ""}`}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
