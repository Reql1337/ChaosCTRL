import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import App from './App';
import './index.css';
import { checkSupabaseConfig } from './lib/supabase';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// If Supabase config is missing (common in fresh deployments without Secrets configured)
if (!checkSupabaseConfig()) {
  root.render(
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-navy-800 border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="w-16 h-16 bg-chaos-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-chaos-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">Configuration Error</h1>
        <p className="text-gray-400 mb-6 leading-relaxed">
          The application is missing essential environment variables (Supabase URL/Anon Key) to function.
        </p>
        <div className="bg-navy-900 rounded-xl p-4 text-left border border-white/5 space-y-2 mb-6">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">Solution:</p>
          <p className="text-sm text-gray-300">Add the required labels to your <b>GitHub Repository Secrets</b> under Settings > Secrets > Actions.</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 border border-white/10"
        >
          Check Again
        </button>
      </div>
    </div>
  );
} else {
  root.render(
    <React.StrictMode>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <LazyMotion features={domAnimation}>
          <App />
        </LazyMotion>
      </BrowserRouter>
    </React.StrictMode>
  );
}