import React, { useState, useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import IntegrationsPage from './pages/IntegrationsPage';
import DocumentationPage from './pages/DocumentationPage';
import APIPage from './pages/APIPage';
import CommunityPage from './pages/CommunityPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
import LoadingScreen from './components/Common/LoadingScreen';
import Footer from './components/Layout/Footer';
import { supabase } from './lib/supabase';

type ViewState =
  | 'landing'
  | 'dashboard'
  | 'login'
  | 'integrations'
  | 'docs'
  | 'api'
  | 'community'
  | 'about'
  | 'blog'
  | 'contact'
  | 'features'
  | 'pricing';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [savedScrollY, setSavedScrollY] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Only reset scroll on full page navigation, not on every re-render
    if (location.pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const handleSignIn = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleNavigate = (page: string, preventScrollReset: boolean = false) => {
    if (location.pathname === '/' && (page === 'login' || page === 'signup')) {
      setSavedScrollY(window.scrollY);
    }

    if (page === 'login') {
      setAuthMode('signin');
      navigate('/login');
    }
    else if (page === 'signup') {
      setAuthMode('signup');
      navigate('/login');
    }
    else if (page === 'home' || page === 'landing') navigate('/');
    else navigate(`/${page}`);
  }

  const handleBackToLanding = () => {
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: savedScrollY, behavior: 'instant' });
    }, 0);
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/dashboard';

  return (
    <div className="bg-navy-900 min-h-screen text-gray-100 selection:bg-emerald-500 selection:text-white">
      {!isAuthPage && (
        <Navbar onSignIn={() => handleNavigate('login')} isLoggedIn={false} onNavigate={handleNavigate} />
      )}

      <Routes>
        <Route path="/" element={<LandingPage onStart={() => handleNavigate('signup')} />} />
        <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
        <Route path="/login" element={<LoginPage initialMode={authMode} onLogin={handleSignIn} onBack={handleBackToLanding} />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/docs" element={<DocumentationPage />} />
        <Route path="/api" element={<APIPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>

      {!isAuthPage && (
        <Footer onNavigate={(page) => handleNavigate(page)} />
      )}
    </div>
  );
};

export default App;