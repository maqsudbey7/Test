export default function HomePage({ user, setPage }) {
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="text-3xl font-semibold mb-4">Xush kelibsiz, {user.name}! 🎓</h2>
      {user.role === "teacher" ? (
        <button
          onClick={() => setPage("create")}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-purple-700 transition"
        >
          Test yaratish
        </button>
      ) : (
        <button
          onClick={() => setPage("quiz")}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-purple-700 transition"
        >
          Test ishlash
        </button>
      )}
    </div>
  );
}
