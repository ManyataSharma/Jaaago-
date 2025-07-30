import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CitizenAuth from './pages/CitizenAuth';
import AuthorityAuth from './pages/AuthorityAuth';
import PartnerAuth from './pages/PartnerAuth';
import AdminAuth from './pages/AdminAuth';
import CitizenDashboard from './pages/CitizenDashboard';
import AuthorityDashboard from './pages/AuthorityDashboard';
import PartnerDashboard from './pages/PartnerDashboard';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { LanguageProvider } from './context/LanguageContext';

function AppRoutes() {
  const { user, userType } = useAuth();

  return (
    <div className="min-h-screen bg-[#fdfaf6] flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/citizen-auth" element={<CitizenAuth />} />
          <Route path="/authority-auth" element={<AuthorityAuth />} />
          <Route path="/partner-auth" element={<PartnerAuth />} />
          <Route path="/admin-auth" element={<AdminAuth />} />
          
          {/* Protected Routes */}
          <Route 
            path="/citizen-dashboard/*" 
            element={user && userType === 'citizen' ? <CitizenDashboard /> : <Navigate to="/citizen-auth" />} 
          />
          <Route 
            path="/authority-dashboard/*" 
            element={user && userType === 'authority' ? <AuthorityDashboard /> : <Navigate to="/authority-auth" />} 
          />
          <Route 
            path="/partner-dashboard/*" 
            element={user && userType === 'partner' ? <PartnerDashboard /> : <Navigate to="/partner-auth" />} 
          />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <LocationProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </LocationProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;