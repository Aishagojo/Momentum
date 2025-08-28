// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = ({ user }) => {
  const [activities, setActivities] = useState([]);
  const [summary, setSummary] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      
      // Fetch recent activities
      const activitiesResponse = await fetch('/api/activities/?limit=5', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (activitiesResponse.ok) {
        const activitiesData = await activitiesResponse.json();
        setActivities(activitiesData.results || activitiesData);
      }
      
      // Fetch summary data
      const summaryResponse = await fetch('/api/summary/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (summaryResponse.ok) {
        const summaryData = await summaryResponse.json();
        setSummary(summaryData);
      }
      
      // Fetch achievements
      const achievementsResponse = await fetch('/api/achievements/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (achievementsResponse.ok) {
        const achievementsData = await achievementsResponse.json();
        setAchievements(achievementsData.results || achievementsData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">FitTrack</h1>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setSelectedTab('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${selectedTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setSelectedTab('activities')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${selectedTab === 'activities' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Activities
              </button>
              <button
                onClick={() => setSelectedTab('progress')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${selectedTab === 'progress' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Progress
              </button>
              <button
                onClick={() => setSelectedTab('achievements')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${selectedTab === 'achievements' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Achievements
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {selectedTab === 'dashboard' && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600">Track your fitness activities and progress</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Activities</h3>
                <p className="text-3xl font-bold text-blue-600">{summary.total_activities || 0}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Duration</h3>
                <p className="text-3xl font-bold text-green-600">
                  {summary.total_duration ? `${Math.round(summary.total_duration / 60)} hours` : '0 hours'}
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Calories Burned</h3>
                <p className="text-3xl font-bold text-red-600">{summary.total_calories || 0}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/activities/new"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Log New Activity
                </Link>
                <Link
                  to="/activities"
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
                >
                  View All Activities
                </Link>
                <Link
                  to="/summary"
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
                >
                  View Progress
                </Link>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                <Link
                  to="/activities"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View all
                </Link>
              </div>
              
              {activities.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Calories
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {activities.map((activity) => (
                        <tr key={activity.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                            {activity.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {activity.duration} minutes
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {activity.calories} cal
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(activity.date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No activities yet.</p>
                  <Link
                    to="/activities/new"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Add your first activity
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

        {/* Progress Tab */}
        {selectedTab === 'progress' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Progress Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Weekly Summary</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Activities:</span> {summary.weekly_activities || 0}</p>
                  <p><span className="font-medium">Duration:</span> {summary.weekly_duration ? `${Math.round(summary.weekly_duration / 60)} hours` : '0 hours'}</p>
                  <p><span className="font-medium">Calories:</span> {summary.weekly_calories || 0}</p>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Monthly Summary</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Activities:</span> {summary.monthly_activities || 0}</p>
                  <p><span className="font-medium">Duration:</span> {summary.monthly_duration ? `${Math.round(summary.monthly_duration / 60)} hours` : '0 hours'}</p>
                  <p><span className="font-medium">Calories:</span> {summary.monthly_calories || 0}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {summary.activity_types && Object.entries(summary.activity_types).map(([type, count]) => (
                  <div key={type} className="bg-white rounded p-3 shadow-sm">
                    <p className="font-medium capitalize">{type}</p>
                    <p className="text-2xl font-bold text-blue-600">{count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {selectedTab === 'achievements' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Achievements</h2>
            
            {achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border rounded-lg p-4 flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-yellow-600 font-bold">★</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Earned on: {new Date(achievement.date_earned).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">🏆</span>
                </div>
                <p className="text-gray-500">No achievements yet.</p>
                <p className="text-sm text-gray-400 mt-1">Keep logging activities to earn achievements!</p>
              </div>
            )}
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-gray-50 opacity-75">
                  <h4 className="font-medium text-gray-700">First Workout</h4>
                  <p className="text-sm text-gray-600">Complete your first activity</p>
                </div>
                <div className="border rounded-lg p-4 bg-gray-50 opacity-75">
                  <h4 className="font-medium text-gray-700">Weekly Consistency</h4>
                  <p className="text-sm text-gray-600">Log activities for 7 consecutive days</p>
                </div>
                <div className="border rounded-lg p-4 bg-gray-50 opacity-75">
                  <h4 className="font-medium text-gray-700">Marathon Runner</h4>
                  <p className="text-sm text-gray-600">Run a total of 42 km</p>
                </div>
                <div className="border rounded-lg p-4 bg-gray-50 opacity-75">
                  <h4 className="font-medium text-gray-700">Calorie Crusher</h4>
                  <p className="text-sm text-gray-600">Burn 10,000 calories total</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;