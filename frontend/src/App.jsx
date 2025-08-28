// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/common/Header";
import LandingPage from  "./components/common/LoadingSpinner"; // Fixed import path
import Login from "./components/auth/LoginForm";
import Register from './components/auth/RegisterForm';
import Dashboard from "./pages/DashboardPage";
import { ActivityForm } from "./activities/ActivityForm";
import ActivitiesList from "./activities/ActivityList";
import Summary from "./components/summary/Summary"; // Added missing import
import Achievements from "./pages/AchievementsPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Verify token with backend
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('/api/auth/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Header user={user} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />}
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Dashboard user={user} /> : <LandingPage />} 
          />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/" /> : <Register />} 
          />
          <Route 
            path="/activities" 
            element={isAuthenticated ? <ActivitiesList user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/activities/new" 
            element={isAuthenticated ? <ActivityForm user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/activities/:id/edit" 
            element={isAuthenticated ? <ActivityForm user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/summary" 
            element={isAuthenticated ? <Summary user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/achievements" 
            element={isAuthenticated ? <Achievements user={user} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;