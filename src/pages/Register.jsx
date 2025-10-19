import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.username === username);
    if (exists) {
      alert("Bu foydalanuvchi allaqachon mavjud!");
      return;
    }

    users.push({ username, password, role });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Ro‘yxatdan o‘tish muvaffaqiyatli!");

    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">📝 Ro‘yxatdan o‘tish</h2>
      <form onSubmit={handleRegister}>
        <label className="block mb-2 font-semibold">Foydalanuvchi nomi:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        <label className="block mb-2 font-semibold">Parol:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        <label className="block mb-2 font-semibold">Rolni tanlang:</label>
        <div className="flex gap-4 mb-4">
          <label>
            <input
              type="radio"
              value="teacher"
              checked={role === "teacher"}
              onChange={() => setRole("teacher")}
            />{" "}
            👨‍🏫 O‘qituvchi
          </label>
          <label>
            <input
              type="radio"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
            />{" "}
            🧑‍🎓 O‘quvchi
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded font-semibold"
        >
          🚀 Ro‘yxatdan o‘tish
        </button>
      </form>
    </div>
  );
}
