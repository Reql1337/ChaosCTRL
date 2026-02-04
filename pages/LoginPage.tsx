import React, { useState } from 'react';
import { Gem, ArrowRight, Loader2, ArrowLeft, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
  initialMode?: 'signin' | 'signup';
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack, initialMode = 'signin' }) => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        onLogin();
    }, 1500);
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4 relative overflow-hidden">
       {/* Explicit Back Button */}
       <button 
         onClick={onBack}
         className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors z-20 font-medium group"
       >
          <div className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span className="hidden sm:inline">Back to Home</span>
       </button>

       {/* Background Elements */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none"></div>

       <div className="w-full max-w-md relative z-10">
           <div 
            onClick={onBack}
            className="flex items-center gap-2 mb-8 cursor-pointer justify-center"
           >
              <div className="w-8 h-8 flex items-center justify-center bg-navy-800 border border-emerald-500/30 rounded-lg">
                 <Gem size={18} className="text-emerald-500" />
              </div>
              <span className="font-display font-bold text-2xl text-white">
                 Chaos<span className="text-emerald-500">CTRL</span>
              </span>
           </div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             key={mode} // Animate when mode changes
             className="bg-navy-800/80 backdrop-blur-xl border border-emerald-500/10 rounded-2xl p-8 shadow-2xl"
           >
              <h2 className="text-2xl font-bold text-white mb-2">
                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-400 mb-6">
                {mode === 'signin' ? 'Enter your credentials to access the control center.' : 'Start quantifying your project chaos today.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="text" 
                                className="w-full bg-navy-900 border border-white/10 rounded-lg pl-10 pr-3 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                    </motion.div>
                  )}

                  <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                      <input 
                        type="email" 
                        defaultValue={mode === 'signin' ? "demo@chaosctrl.com" : ""}
                        className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 text-white focus:border-emerald-500 outline-none transition-colors"
                        placeholder="name@company.com"
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                      <input 
                        type="password" 
                        defaultValue={mode === 'signin' ? "password" : ""}
                        className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 text-white focus:border-emerald-500 outline-none transition-colors"
                        placeholder="••••••••"
                      />
                  </div>
                  
                  {mode === 'signin' && (
                      <div className="flex items-center justify-between text-sm">
                          <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                              <input type="checkbox" className="rounded bg-navy-900 border-white/10" /> Remember me
                          </label>
                          <a href="#" className="text-emerald-500 hover:text-emerald-400 transition-colors">Forgot password?</a>
                      </div>
                  )}

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-navy-900 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <>{mode === 'signin' ? 'Sign In' : 'Start Control'} <ArrowRight size={18} /></>}
                  </button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/5 text-center">
                  <p className="text-gray-400 text-sm">
                    {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={toggleMode} className="text-white font-bold hover:underline">
                        {mode === 'signin' ? 'Get Started' : 'Log In'}
                    </button>
                  </p>
              </div>
           </motion.div>
       </div>
    </div>
  );
};

export default LoginPage;