// src/pages/EditQuiz.jsx
import React, { useState } from "react";
import { useQuiz } from "../context/QuizContext";

export default function EditQuiz({ quiz, onSaved }) {
  const { editQuiz, removeQuiz } = useQuiz();
  const [local, setLocal] = useState({ ...quiz });

  const updateQuestion = (qid, patch) => {
    setLocal(prev => ({ ...prev, questions: prev.questions.map(q => q.id===qid ? { ...q, ...patch } : q) }));
  };

  const save = () => {
    editQuiz(local.id, local);
    alert("Saqlandi");
    if (onSaved) onSaved();
  };

  const remove = () => {
    if (confirm("Testni o‘chirilsinmi?")) {
      removeQuiz(local.id);
      if (onSaved) onSaved();
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Edit: {local.title}</h3>
      <input value={local.title} onChange={e=>setLocal({...local, title: e.target.value})} className="border p-2 rounded w-full mb-2" />
      <input value={local.subject} onChange={e=>setLocal({...local, subject: e.target.value})} className="border p-2 rounded w-full mb-2" />
      {local.questions.map((q, idx) => (
        <div key={q.id} className="border p-2 mb-2 rounded">
          <div className="font-medium mb-1">#{idx+1}</div>
          <input value={q.question} onChange={e=>updateQuestion(q.id, { question: e.target.value })} className="border p-2 rounded w-full mb-1" />
          {q.options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2 mb-1">
              <input type="radio" name={`c-${q.id}`} checked={q.correctIndex===i} onChange={()=>updateQuestion(q.id, { correctIndex: i })} />
              <input value={opt} onChange={e=>{
                const newOpts = [...q.options]; newOpts[i] = e.target.value;
                updateQuestion(q.id, { options: newOpts });
              }} className="border p-2 rounded w-full" />
            </div>
          ))}
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={save} className="bg-green-600 text-white px-3 py-1 rounded">Saqlash</button>
        <button onClick={remove} className="bg-red-600 text-white px-3 py-1 rounded">O‘chirish</button>
      </div>
    </div>
  );
}
