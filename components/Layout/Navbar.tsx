import React, { useState } from 'react';
import { Menu, X, Gem } from 'lucide-react';

interface NavbarProps {
  onSignIn: () => void;
  isLoggedIn: boolean;
  onNavigate: (page: string, preventScrollReset?: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSignIn, isLoggedIn, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (id: string) => {
    // Navigate to landing page without resetting scroll, so we can smooth scroll to the section
    onNavigate('landing', true);
    setIsOpen(false);
    
    // Allow time for view switch if needed, then smooth scroll with offset for fixed header
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const navbarHeight = 80; // h-20 is 5rem = 80px
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <nav className="fixed w-full z-50 bg-navy-900/80 backdrop-blur-md border-b border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav('hero')}>
             <div className="w-8 h-8 flex items-center justify-center bg-navy-800 border border-emerald-500/30 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Gem size={18} className="text-emerald-500" />
             </div>
             <span className="font-display font-bold text-xl tracking-tight text-white">
                Chaos<span className="text-emerald-500">CTRL</span>
             </span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {!isLoggedIn && (
                  <>
                    <button onClick={() => handleNav('about')} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">About</button>
                    <button onClick={() => handleNav('features')} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Features</button>
                    <button onClick={() => handleNav('process')} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Process</button>
                    <button onClick={() => handleNav('pricing')} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Pricing</button>
                  </>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
             {isLoggedIn ? (
                 <button onClick={onSignIn} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Log Out</button>
             ) : (
                <>
                    <button onClick={() => onNavigate('login')} className="text-white hover:text-emerald-500 px-3 py-2 text-sm font-medium transition-colors">Login</button>
                    <button onClick={() => onNavigate('signup')} className="bg-white text-navy-900 hover:bg-emerald-50 px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 border border-transparent hover:border-emerald-500/20 hover:text-emerald-900">
                      Get Started
                    </button>
                </>
             )}
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-navy-900 border-b border-white/5">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => handleNav('about')} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</button>
            <button onClick={() => handleNav('features')} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</button>
            <button onClick={() => handleNav('process')} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Process</button>
            <button onClick={() => handleNav('pricing')} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Pricing</button>
            <button onClick={() => onNavigate('login')} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</button>
            <button onClick={() => onNavigate('signup')} className="w-full text-left text-emerald-500 font-bold block px-3 py-2 rounded-md text-base">Get Started</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;