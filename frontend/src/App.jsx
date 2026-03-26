import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Editor from './pages/Editor';
import ProjectsDashboard from './pages/ProjectsDashboard';
import GlobalLoginHandler from './components/GlobalLoginHandler';
import { Toaster } from 'react-hot-toast'; // Corrected spelling
import { useAuth } from './context/AuthContext';
import { checkAuth } from './services/authService';
import { useEffect } from 'react';

function App() {
  const { user, setUser, logout } = useAuth();

  return (
    <>
      {/* 1. Global Logic Components */}
      <GlobalLoginHandler />
      <Toaster position="top-center" reverseOrder={false} />

      {/* 2. Route Configuration */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />

        {/* Private Routes (Require Auth) */}
        <Route 
          path="/dashboard" 
          element={user ? <ProjectsDashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/editor/:projectId" 
          element={user ? <Editor /> : <Navigate to="/login" />} 
        />

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;