// src/utils/storage.js
export const USERS_KEY = "qa_users";
export const QUIZZES_KEY = "qa_quizzes";
export const RESULTS_KEY = "qa_results";
export const FEEDBACK_KEY = "qa_feedback";

const read = (key) => JSON.parse(localStorage.getItem(key) || "[]");
const write = (key, data) => localStorage.setItem(key, JSON.stringify(data));

/* Users */
export const getUsers = () => read(USERS_KEY);
export const saveUser = (user) => {
  const users = read(USERS_KEY);
  // unikallik tekshiruvi: ism + role kombinatsiyasi (yoki email qo'shishni keyin qo'shamiz)
  users.push(user);
  write(USERS_KEY, users);
};

/* Quizzes */
export const getQuizzes = () => read(QUIZZES_KEY);
export const saveQuiz = (quiz) => {
  const quizzes = read(QUIZZES_KEY);
  quizzes.push(quiz);
  write(QUIZZES_KEY, quizzes);
};
export const updateQuiz = (quizId, patch) => {
  const quizzes = read(QUIZZES_KEY);
  const idx = quizzes.findIndex(q => q.id === quizId);
  if (idx !== -1) {
    quizzes[idx] = { ...quizzes[idx], ...patch };
    write(QUIZZES_KEY, quizzes);
  }
};
export const deleteQuiz = (quizId) => {
  const quizzes = read(QUIZZES_KEY).filter(q => q.id !== quizId);
  write(QUIZZES_KEY, quizzes);
};

/* Results */
export const getResults = () => read(RESULTS_KEY);
export const saveResult = (result) => {
  const results = read(RESULTS_KEY);
  results.push(result);
  write(RESULTS_KEY, results);
};

/* Feedback */
export const getFeedback = () => read(FEEDBACK_KEY);
export const saveFeedback = (fb) => {
  const arr = read(FEEDBACK_KEY);
  arr.push(fb);
  write(FEEDBACK_KEY, arr);
};

/* Helpers */
export const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2,9)}`;
