import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateQuiz from "./pages/CreateQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import Navbar from "./components/Navbar";
import TeacherDashboard from "./pages/TeacherDashboard ";
import Results from "./pages/Results";
import FeedbackPage from "./pages/Feedback";

export default function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
        <Navbar />

        <div className="p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/teacher-dashboard"
              element={currentUser?.role === "teacher" ? <TeacherDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/create-quiz"
              element={currentUser?.role === "teacher" ? <CreateQuiz /> : <Navigate to="/login" />}
            />
            <Route
              path="/take-quiz"
              element={currentUser?.role === "student" ? <TakeQuiz /> : <Navigate to="/login" />}
            />
            <Route
              path="/results"
              element={currentUser ? <Results /> : <Navigate to="/login" />}
            />
            <Route
              path="/feedback"
              element={currentUser ? <FeedbackPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
