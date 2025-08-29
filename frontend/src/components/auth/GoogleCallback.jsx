// components/auth/GoogleCallback.jsx
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GoogleCallback = ({ setIsAuthenticated, setUser }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const response = await fetch('/api/auth/google/callback/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: searchParams.get('code'),
            state: searchParams.get('state'),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
          setIsAuthenticated(true);
          setUser(data.user);
          navigate('/');
        } else {
          console.error('Google authentication failed');
          navigate('/auth');
        }
      } catch (error) {
        console.error('Error during Google authentication:', error);
        navigate('/auth');
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate, setIsAuthenticated, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing Google authentication...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;