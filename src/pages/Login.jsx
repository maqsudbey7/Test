import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) {
      alert("Foydalanuvchi topilmadi yoki parol xato!");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(found));

    if (found.role === "teacher") {
      navigate("/create-quiz");
    } else {
      navigate("/take-quiz");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">🔐 Kirish</h2>
      <form onSubmit={handleLogin}>
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
          className="border p-2 rounded w-full mb-4"
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded font-semibold"
        >
          ✅ Kirish
        </button>
      </form>
    </div>
  );
}
