// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QuizProvider } from "./context/QuizContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);
