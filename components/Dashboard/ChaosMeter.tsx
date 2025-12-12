import React from 'react';
import ChaosGauge from '../UI/ChaosGauge';
import { motion } from 'framer-motion';

const ChaosMeter: React.FC<{ score: number }> = ({ score }) => {
  return (
    <div className="bg-navy-800 border border-white/5 rounded-2xl p-6 relative overflow-hidden h-full flex flex-col">
       <div className="flex justify-between items-start mb-4">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Chaos Index</h3>
          {score > 70 && (
             <motion.span 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="bg-chaos-orange/20 text-chaos-orange text-xs px-2 py-1 rounded border border-chaos-orange/30 font-bold"
            >
                CRITICAL
             </motion.span>
          )}
       </div>
       <div className="flex-1 min-h-[160px]">
          <ChaosGauge score={score} label="Chaos Score" isChaos={true} />
       </div>
       <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
             {score > 70 ? "Immediate mitigation recommended." : "Systems operating within expected parameters."}
          </p>
       </div>
    </div>
  );
};

export default ChaosMeter;