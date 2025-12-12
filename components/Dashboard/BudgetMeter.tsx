import React from 'react';
import Gauge from '../UI/ChaosGauge';
import { motion } from 'framer-motion';

const BudgetMeter: React.FC<{ score: number }> = ({ score }) => {
  return (
    <div className="bg-brand-gray border border-white/5 rounded-2xl p-6 relative overflow-hidden h-full flex flex-col">
       <div className="flex justify-between items-start mb-4">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Financial Health</h3>
          <div className="bg-white/5 px-2 py-1 rounded text-xs text-brand-yellow font-bold border border-white/10">
            GOOD
          </div>
       </div>
       <div className="flex-1 min-h-[160px]">
          <Gauge score={score} label="Health Score" />
       </div>
       <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
             Your spending is 12% lower than last month. Keep it up!
          </p>
       </div>
    </div>
  );
};

export default BudgetMeter;