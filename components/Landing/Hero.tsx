import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Gem } from 'lucide-react';

interface HeroProps {
    onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 overflow-hidden bg-navy-900">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
            <h2 className="text-emerald-500 font-bold tracking-widest text-sm mb-4 uppercase">Quantify the Chaos</h2>
            <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-white mb-8">
              CONTROL THE<br/> UNEXPECTED
            </h1>
        </motion.div>
        
        <motion.button 
          onClick={onStart}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-emerald-500 hover:bg-emerald-400 text-navy-900 px-10 py-4 rounded-full text-lg font-bold transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-20"
        >
          Start now
        </motion.button>

        {/* 3D Dashboard Mockup */}
        <motion.div 
           initial={{ opacity: 0, rotateX: 20, y: 100 }}
           animate={{ opacity: 1, rotateX: 0, y: 0 }}
           transition={{ duration: 1, delay: 0.2, type: "spring" }}
           className="relative w-full max-w-5xl perspective-1000"
           style={{ perspective: '1000px' }}
        >
            {/* Main Glass Card */}
            <div className="relative bg-navy-800/60 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row gap-6 items-start overflow-hidden">
                 {/* Decorative background within card */}
                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>

                 {/* Left Panel: Chaos Metrics */}
                 <div className="flex-1 bg-navy-900 rounded-2xl p-6 border border-emerald-500/10 w-full">
                     <div className="flex justify-between items-center mb-8">
                         <div>
                             <p className="text-gray-400 text-xs">Project Health</p>
                             <p className="text-3xl font-display font-bold text-white">Critical</p>
                         </div>
                         <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                             <AlertTriangle size={18} className="text-chaos-orange" />
                         </div>
                     </div>
                     <div className="space-y-4">
                         <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border-l-4 border-chaos-orange">
                             <div className="w-10 h-10 bg-chaos-orange/20 rounded-full flex items-center justify-center text-chaos-orange text-xs font-bold">Scope</div>
                             <div className="flex-1">
                                 <p className="text-sm font-bold">New Feature Request</p>
                                 <p className="text-xs text-gray-400">Stakeholder: Marketing</p>
                             </div>
                             <span className="text-chaos-orange font-mono text-sm font-bold">+5 Days</span>
                         </div>
                         <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border-l-4 border-emerald-500">
                             <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 text-xs font-bold">Bug</div>
                             <div className="flex-1">
                                 <p className="text-sm font-bold">API Regression</p>
                                 <p className="text-xs text-gray-400">Source: QA</p>
                             </div>
                             <span className="text-emerald-500 font-mono text-sm font-bold">+2 Days</span>
                         </div>
                     </div>
                 </div>

                 {/* Right Panel: Floating Widgets */}
                 <div className="w-full md:w-1/3 flex flex-col gap-4">
                      {/* Prediction */}
                      <div className="bg-gradient-to-br from-emerald-500/20 to-navy-900 border border-emerald-500/20 rounded-2xl p-6 text-left">
                          <p className="font-bold text-white text-lg leading-tight mb-2">Predicted Delay</p>
                          <p className="text-3xl font-black text-white">+12 <span className="text-sm font-normal text-gray-400">days</span></p>
                          <div className="mt-2 h-2 bg-navy-900 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 w-3/4"></div>
                          </div>
                      </div>
                      
                      {/* Action */}
                      <div className="bg-navy-900 border border-emerald-500/10 rounded-2xl p-4 flex items-center justify-between">
                          <div>
                              <p className="text-xs text-gray-400">Mitigation?</p>
                              <p className="text-sm font-bold text-white">Reject Request</p>
                          </div>
                          <button className="bg-emerald-500 text-navy-900 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-emerald-400 transition-colors">Apply</button>
                      </div>
                 </div>
                 
                 {/* Floating Element: Alert */}
                 <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-8 -top-8 bg-emerald-50 p-4 rounded-2xl shadow-xl hidden lg:block"
                 >
                    <Gem size={60} className="text-emerald-600" />
                 </motion.div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;