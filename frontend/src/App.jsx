// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/common/Header";
import LandingPage from "./components/common/LandingPage";
import AuthPage from "./components/auth/AuthPage";
import Dashboard from "./pages/DashboardPage";
import  { ActivityForm } from "./activities/ActivityForm";
import ActivitiesList from "./activities/ActivityList";
import Summary from "./components/summary/Summary";
import Achievements from "./pages/AchievementsPage";
import GoogleCallback from "./components/auth/GoogleCallback";

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
      const response = await fetch('/api/auth/profile/', {
        method: 'GET',
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
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const refreshResponse = await fetch('/api/auth/token/refresh/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ refresh: refreshToken }),
            });
            
            if (refreshResponse.ok) {
              const tokenData = await refreshResponse.json();
              localStorage.setItem('accessToken', tokenData.access);
              // Retry getting user profile
              const retryResponse = await fetch('/api/auth/profile/', {
                headers: {
                  'Authorization': `Bearer ${tokenData.access}`
                }
              });
              
              if (retryResponse.ok) {
                const userData = await retryResponse.json();
                setIsAuthenticated(true);
                setUser(userData);
                setLoading(false);
                return;
              }
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
          }
        }
        
        // If all fails, clear tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
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
            path="/auth" 
            element={isAuthenticated ? <Navigate to="/" /> : <AuthPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} 
          />
          <Route 
            path="/activities" 
            element={isAuthenticated ? <ActivitiesList user={user} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/activities/new" 
            element={isAuthenticated ? <ActivityForm user={user} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/activities/:id/edit" 
            element={isAuthenticated ? <ActivityForm user={user} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/summary" 
            element={isAuthenticated ? <Summary user={user} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/achievements" 
            element={isAuthenticated ? <Achievements user={user} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/auth/google/callback/" 
            element={<GoogleCallback setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;