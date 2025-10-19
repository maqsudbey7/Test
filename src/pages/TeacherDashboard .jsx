import { useEffect, useState } from "react";

export default function TeacherDashboard() {
  const [tests, setTests] = useState([]);

  // localStorage'dan testlarni olish
  useEffect(() => {
    const savedTests = JSON.parse(localStorage.getItem("tests")) || [];
    setTests(savedTests);
  }, []);

  // Testni o‘chirish
  const handleDelete = (id) => {
    const updated = tests.filter((t) => t.id !== id);
    setTests(updated);
    localStorage.setItem("tests", JSON.stringify(updated));
  };

  // Testni ko‘rish (modalda yoki alertda)
  const handleView = (test) => {
    alert(
      `🧾 ${test.subject} testi\n\n${test.questions
        .map(
          (q, i) =>
            `${i + 1}. ${q.question}\nA) ${q.options[0]}\nB) ${
              q.options[1]
            }\nC) ${q.options[2]}\nD) ${q.options[3]}\n`
        )
        .join("\n")}`
    );
  };

  // Testni tahrirlash
  const handleEdit = (id) => {
    const test = tests.find((t) => t.id === id);
    if (!test) return;
    const newName = prompt("Yangi test nomini kiriting:", test.subject);
    if (newName) {
      const updated = tests.map((t) =>
        t.id === id ? { ...t, subject: newName } : t
      );
      setTests(updated);
      localStorage.setItem("tests", JSON.stringify(updated));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg text-white">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        📘 Mening testlarim
      </h1>

      {tests.length === 0 ? (
        <p className="text-center text-gray-300">Siz hali test yaratmagansiz.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {tests.map((test) => (
            <div
              key={test.id}
              className="p-4 bg-white/20 rounded-xl shadow-md hover:bg-white/30 transition"
            >
              <h2 className="text-lg font-semibold">{test.subject}</h2>
              <p className="text-sm text-gray-300">
                Savollar soni: {test.questions.length}
              </p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleView(test)}
                  className="bg-blue-500 px-3 py-1 rounded-lg text-sm hover:bg-blue-600"
                >
                  Ko‘rish
                </button>
                <button
                  onClick={() => handleEdit(test.id)}
                  className="bg-yellow-500 px-3 py-1 rounded-lg text-sm hover:bg-yellow-600"
                >
                  Tahrirlash
                </button>
                <button
                  onClick={() => handleDelete(test.id)}
                  className="bg-red-500 px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                >
                  O‘chirish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
    