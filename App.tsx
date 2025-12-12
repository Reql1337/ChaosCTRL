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
import Footer from './components/Layout/Footer';

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

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [savedScrollY, setSavedScrollY] = useState(0);

  const handleSignIn = () => {
    setView('dashboard');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setView('landing');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (page: string, preventScrollReset: boolean = false) => {
      // Save scroll position if we are currently on landing page and going to login/signup
      if (view === 'landing' && (page === 'login' || page === 'signup')) {
        setSavedScrollY(window.scrollY);
      }

      if (page === 'login') {
        setAuthMode('signin');
        setView('login');
      }
      else if (page === 'signup') {
        setAuthMode('signup');
        setView('login');
      }
      else if (page === 'integrations') setView('integrations');
      else if (page === 'docs') setView('docs');
      else if (page === 'api') setView('api');
      else if (page === 'community') setView('community');
      else if (page === 'about') setView('about');
      else if (page === 'blog') setView('blog');
      else if (page === 'contact') setView('contact');
      else if (page === 'features') setView('features');
      else if (page === 'pricing') setView('pricing');
      else setView('landing');
      
      // Always scroll to top when navigating to a new page, unless explicitly prevented (e.g. for anchor navigation)
      if (!preventScrollReset) {
        window.scrollTo(0, 0);
      }
  }

  const handleBackToLanding = () => {
      setView('landing');
      // Restore scroll position after render
      setTimeout(() => {
          window.scrollTo({ top: savedScrollY, behavior: 'instant' });
      }, 0);
  };

  const renderView = () => {
      switch(view) {
          case 'dashboard': return <Dashboard onLogout={handleLogout} />;
          case 'login': return <LoginPage initialMode={authMode} onLogin={handleSignIn} onBack={handleBackToLanding} />;
          case 'integrations': return <IntegrationsPage />;
          case 'docs': return <DocumentationPage />;
          case 'api': return <APIPage />;
          case 'community': return <CommunityPage />;
          case 'about': return <AboutPage />;
          case 'blog': return <BlogPage />;
          case 'contact': return <ContactPage />;
          case 'features': return <FeaturesPage />;
          case 'pricing': return <PricingPage />;
          default: return <LandingPage onStart={() => handleNavigate('signup')} />;
      }
  }

  return (
    <div className="bg-navy-900 min-h-screen text-gray-100 selection:bg-emerald-500 selection:text-white">
      {view !== 'login' && view !== 'dashboard' && (
          <Navbar onSignIn={() => setView('landing')} isLoggedIn={false} onNavigate={handleNavigate} />
      )}
      
      {renderView()}

      {view !== 'login' && view !== 'dashboard' && (
          <Footer onNavigate={(page) => handleNavigate(page)} />
      )}
    </div>
  );
};

export default App;