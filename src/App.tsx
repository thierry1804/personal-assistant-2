import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { GoogleAuthProvider } from './contexts/GoogleAuthContext';
import { LoginPage } from './components/Auth/LoginPage';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard';
import { GoogleCalendarSetup } from './components/Settings/GoogleCalendarSetup';

function App() {
  return (
    <AuthProvider>
      <GoogleAuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-100">
                    <Header />
                    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                      <Dashboard />
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-100">
                    <Header />
                    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                      <GoogleCalendarSetup />
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer />
        </Router>
      </GoogleAuthProvider>
    </AuthProvider>
  );
}

export default App;