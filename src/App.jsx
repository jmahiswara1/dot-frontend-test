import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import LoginPage from './pages/LoginPage';
import SetupPage from './pages/SetupPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

function App() {
  const { isLoggedIn, loadFromStorage } = useAuthStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/setup" element={isLoggedIn ? <SetupPage /> : <Navigate to="/" replace />} />
        <Route path="/quiz" element={isLoggedIn ? <QuizPage /> : <Navigate to="/" replace />} />
        <Route path="/result" element={isLoggedIn ? <ResultPage /> : <Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
