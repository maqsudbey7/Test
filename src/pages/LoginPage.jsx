import { useState } from "react";

export default function LoginPage({ setUser }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");

  const handleLogin = () => {
    if (!name.trim()) return alert("Ismingizni kiriting!");
    const user = { name, role };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <div className="flex flex-col items-center mt-32">
      <h2 className="text-2xl font-semibold mb-4">Tizimga kirish</h2>
      <input
        type="text"
        placeholder="Ism kiriting"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2 rounded w-64 mb-3"
      />
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        className="border p-2 rounded w-64 mb-3"
      >
        <option value="student">O‘quvchi</option>
        <option value="teacher">O‘qituvchi</option>
      </select>
      <button
        onClick={handleLogin}
        className="bg-purple-600 text-white px-6 py-2 rounded-lg"
      >
        Kirish
      </button>
    </div>
  );
}
