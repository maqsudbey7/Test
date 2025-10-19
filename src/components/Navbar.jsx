import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  return (
    <nav className="flex justify-between items-center bg-white/80 backdrop-blur-md shadow-md px-6 py-4 rounded-b-2xl">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-700">
        🧩 Quiz Platforma
      </Link>

      <div className="flex gap-4 items-center">
        {/* Agar foydalanuvchi yo'q bo'lsa */}
        {!currentUser ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-semibold"
            >
              Kirish
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-blue-600 font-semibold"
            >
              Ro‘yxatdan o‘tish
            </Link>
          </>
        ) : (
          <>
            {/* 👨‍🏫 O‘qituvchi uchun */}
            {currentUser.role === "teacher" && (
              <>
                <Link
                  to="/create-quiz"
                  className="text-gray-700 hover:text-blue-600 font-semibold"
                >
                  🧠 Test yaratish
                </Link>
                <Link
                  to="/teacher-dashboard"
                  className="text-gray-700 hover:text-blue-600 font-semibold"
                >
                  📘 Mening testlarim
                </Link>
                <Link
                  to="/results"
                  className="text-gray-700 hover:text-blue-600 font-semibold"
                >
                  📊 Natijalar
                </Link>
                <Link
                  to="/feedback"
                  className="text-gray-700 hover:text-blue-600 font-semibold"
                >
                  💬 Feedback
                </Link>
              </>
            )}

            {/* 👨‍🎓 O‘quvchi uchun */}
            {currentUser.role === "student" && (
              <>
                <Link
                  to="/take-quiz"
                  className="text-gray-700 hover:text-blue-600 font-semibold"
                >
                  🎯 Test ishlash
                </Link>
                <Link
                  to="/results"
                  className="text-gray-700 hover:text-blue-600 font-semibold"
                >
                  📊 Natijalar
                </Link>
                <Link
                  to="/feedback"
                  className="text-gray-700 hover:text-blue-600 font-semibold"
                >
                  💬 Feedback
                </Link>
              </>
            )}

            {/* Profil va chiqish */}
            <span className="text-sm text-gray-500">
              👤 {currentUser.name} ({currentUser.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Chiqish
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
