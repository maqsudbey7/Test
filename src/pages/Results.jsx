import { useEffect, useState } from "react";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("results")) || [];
    // Eng yuqori natijalardan boshlab tartiblash
    setResults(data.sort((a, b) => b.percent - a.percent));
  }, []);

  if (results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">
        <p className="text-xl text-gray-700 font-semibold">Hozircha hech kim test ishlamagan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 py-10 flex flex-col items-center">
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          📊 Test natijalari
        </h2>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Ism</th>
              <th className="py-2 px-4 border">Fan</th>
              <th className="py-2 px-4 border">Test kodi</th>
              <th className="py-2 px-4 border">Ball</th>
              <th className="py-2 px-4 border">Foiz</th>
              <th className="py-2 px-4 border">Vaqt</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, i) => (
              <tr
                key={i}
                className={`text-center font-medium ${
                  i === 0 ? "bg-yellow-100" : i === 1 ? "bg-gray-100" : ""
                }`}
              >
                <td className="py-2 px-4 border">{i + 1}</td>
                <td className="py-2 px-4 border">{res.student}</td>
                <td className="py-2 px-4 border">{res.subject}</td>
                <td className="py-2 px-4 border">{res.code}</td>
                <td className="py-2 px-4 border">
                  {res.score}/{res.total}
                </td>
                <td className="py-2 px-4 border text-green-700 font-semibold">
                  {res.percent}%
                </td>
                <td className="py-2 px-4 border text-gray-600">{res.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
