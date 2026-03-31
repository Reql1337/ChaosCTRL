import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Layout/Navbar';
import LoadingScreen from './components/Common/LoadingScreen';
import Footer from './components/Layout/Footer';
import { supabase } from './lib/supabase';

// Lazy load pages for performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const IntegrationsPage = lazy(() => import('./pages/IntegrationsPage'));
const DocumentationPage = lazy(() => import('./pages/DocumentationPage'));
const APIPage = lazy(() => import('./pages/APIPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const PrivacyPage = lazy(() => import('./pages/Privacy'));
const TermsPage = lazy(() => import('./pages/Terms'));

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

      <Suspense fallback={<LoadingScreen />}>
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
      </Suspense>

      {!isAuthPage && (
        <Footer onNavigate={(page) => handleNavigate(page)} />
      )}
    </div>
  );
};

export default App;