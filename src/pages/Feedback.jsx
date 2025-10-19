// src/pages/Feedback.jsx
import React, { useState } from "react";
import { useQuiz } from "../context/QuizContext";

export default function FeedbackPage() {
  const { user, feedbacks, submitFeedback } = useQuiz();
  const [text, setText] = useState("");
  const [teacher, setTeacher] = useState("");

  const handle = () => {
    if (!text.trim()) return alert("Matn yozing");
    submitFeedback({ id: Date.now().toString(), from: user.name, teacher, text, date: Date.now() });
    setText(""); setTeacher("");
    alert("Rahmat! Feedback yuborildi.");
  };

  const visible = user.role === "teacher" ? feedbacks.filter(f => !teacher || f.teacher === teacher) : feedbacks.filter(f => !f.teacher || f.teacher === user.name);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Feedback</h3>
      <div className="mb-3">
        <input value={teacher} onChange={e=>setTeacher(e.target.value)} placeholder="O'qituvchi (ixtiyoriy)" className="border p-2 rounded w-full mb-2" />
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Fikringiz..." className="border p-2 rounded w-full mb-2" rows={4} />
        <button onClick={handle} className="bg-purple-600 text-white px-3 py-1 rounded">Yuborish</button>
      </div>

      <div>
        <h4 className="font-medium mb-2">Kelgan fikrlar</h4>
        {visible.length === 0 ? <div className="text-sm text-gray-600">Hozircha fikr yo'q</div> : visible.map(f => (
          <div key={f.id} className="border-b py-2">
            <div className="text-sm"><strong>{f.from}</strong> → {f.teacher || "Barchaga"}</div>
            <div className="text-sm text-gray-700">{f.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
