// src/context/QuizContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getUsers, saveUser, getQuizzes, saveQuiz, getResults, saveResult,
  getFeedback, saveFeedback, generateId, updateQuiz, deleteQuiz
} from "../utils/storage";

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [users, setUsers] = useState(getUsers());
  const [quizzes, setQuizzes] = useState(getQuizzes());
  const [results, setResults] = useState(getResults());
  const [feedbacks, setFeedbacks] = useState(getFeedback());
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch { return null; }
  });

  useEffect(() => setUsers(getUsers()), []);
  useEffect(() => setQuizzes(getQuizzes()), []);
  useEffect(() => setResults(getResults()), []);
  useEffect(() => setFeedbacks(getFeedback()), []);

  const register = ({ name, role }) => {
    const newU = { id: generateId(), name, role };
    saveUser(newU);
    setUsers(getUsers());
    localStorage.setItem("user", JSON.stringify(newU));
    setUser(newU);
    return newU;
  };

  const login = ({ name, role }) => {
    // oddiy: agar mavjud bo'lsa usarni ol, aks holda ro'yxatdan o'tkaz
    const found = getUsers().find(u => u.name === name && u.role === role);
    if (found) {
      localStorage.setItem("user", JSON.stringify(found));
      setUser(found);
      return found;
    } else {
      return register({ name, role });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const createQuiz = ({ title, subject, timeLimitSec, teacherName, questions }) => {
    const q = {
      id: generateId(),
      title,
      subject,
      code: Math.random().toString(36).slice(2,8).toUpperCase(), // test kodi
      teacher: teacherName,
      timeLimitSec: Number(timeLimitSec) || 0,
      questions, // array of {id, question, options, correctIndex}
      createdAt: Date.now(),
    };
    saveQuiz(q);
    setQuizzes(getQuizzes());
    return q;
  };

  const editQuiz = (quizId, patch) => {
    updateQuiz(quizId, patch);
    setQuizzes(getQuizzes());
  };

  const removeQuiz = (quizId) => {
    deleteQuiz(quizId);
    setQuizzes(getQuizzes());
  };

  const submitResult = (res) => {
    saveResult(res);
    setResults(getResults());
  };

  const submitFeedback = (fb) => {
    saveFeedback(fb);
    setFeedbacks(getFeedback());
  };

  return (
    <QuizContext.Provider value={{
      users, quizzes, results, feedbacks, user,
      register, login, logout, createQuiz, editQuiz, removeQuiz, submitResult, submitFeedback
    }}>
      {children}
    </QuizContext.Provider>
  );
};
