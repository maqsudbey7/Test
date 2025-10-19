import { useState } from "react";

export default function TeacherLogin({ onLogin }) {
  const [teacherName, setTeacherName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!teacherName || !password) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("teachers")) || [];
    const found = users.find(
      (u) => u.teacherName === teacherName && u.password === password
    );

    if (found) {
      alert("Xush kelibsiz, " + teacherName + "!");
      onLogin({ role: "teacher", name: teacherName });
    } else {
      alert("Bunday foydalanuvchi topilmadi!");
    }
  };

  const handleRegister = () => {
    if (!teacherName || !password) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("teachers")) || [];
    const exists = users.find((u) => u.teacherName === teacherName);
    if (exists) {
      alert("Bu nom allaqachon mavjud!");
      return;
    }

    users.push({ teacherName, password });
    localStorage.setItem("teachers", JSON.stringify(users));
    alert("Ro‘yxatdan o‘tish muvaffaqiyatli!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 to-purple-200">
      <div className="bg-white shadow-lg p-8 rounded-2xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          O‘qituvchi kirish / ro‘yxatdan o‘tish
        </h1>

        <input
          className="border p-2 w-full mb-4 rounded-md"
          placeholder="O‘qituvchi login"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4 rounded-md"
          placeholder="Parol"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-indigo-500 text-white py-2 px-4 rounded-md w-full mb-2 hover:bg-indigo-600"
        >
          Kirish
        </button>
        <button
          onClick={handleRegister}
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md w-full hover:bg-gray-300"
        >
          Ro‘yxatdan o‘tish
        </button>
      </div>
    </div>
  );
}