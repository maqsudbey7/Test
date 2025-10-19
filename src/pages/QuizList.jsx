// src/pages/QuizList.jsx
import React, { useState } from "react";
import { useQuiz } from "../context/QuizContext";

export default function QuizList({ onTake }) {
  const { quizzes, user } = useQuiz();
  const [subjectFilter, setSubjectFilter] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("");
  const [code, setCode] = useState("");

  const subjects = [...new Set(quizzes.map(q => q.subject))];
  const teachers = [...new Set(quizzes.map(q => q.teacher))];

  const filtered = quizzes.filter(q => {
    if (subjectFilter && q.subject !== subjectFilter) return false;
    if (teacherFilter && q.teacher !== teacherFilter) return false;
    if (code && q.code !== code.trim().toUpperCase()) return false;
    return true;
  });

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-3">Testlar</h2>
      <div className="flex gap-2 mb-3">
        <select value={subjectFilter} onChange={e=>setSubjectFilter(e.target.value)} className="border p-2 rounded">
          <option value="">Barchasi</option>
          {subjects.map(s=> <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={teacherFilter} onChange={e=>setTeacherFilter(e.target.value)} className="border p-2 rounded">
          <option value="">Barchasi</option>
          {teachers.map(t=> <option key={t} value={t}>{t}</option>)}
        </select>
        <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Kod bilan izlash" className="border p-2 rounded" />
      </div>

      {filtered.length === 0 ? <p className="text-center text-gray-600">Mos test topilmadi</p> :
        filtered.map(q => (
          <div key={q.id} className="border-b py-3 flex justify-between items-center">
            <div>
              <div className="font-semibold">{q.title} <span className="text-sm text-gray-500">({q.subject})</span></div>
              <div className="text-sm text-gray-600">O‘qituvchi: {q.teacher} • Kod: {q.code} • Savollar: {q.questions.length}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>onTake(q)} className="bg-purple-600 text-white px-3 py-1 rounded">Boshlash</button>
            </div>
          </div>
        ))
      }
    </div>
  );
}
