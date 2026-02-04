import React from 'react';
import { motion } from 'framer-motion';
import { Gem } from 'lucide-react';

interface ChaosGemProps {
    score: number;
    getGemColor: (score: number) => string;
    getRiskLabel: (score: number) => string;
    isDarkMode: boolean;
}

const ChaosGem: React.FC<ChaosGemProps> = ({ score, getGemColor, getRiskLabel, isDarkMode }) => {
    return (
        <div className={`bg-white/5 border border-white/5 border rounded-2xl p-8 shadow flex flex-col items-center justify-center text-center overflow-hidden relative`}>
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2 w-full text-left`}>Current Chaos Level</h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-slate-500'} text-sm mb-6 w-full text-left`}>Aggregated Chaos Score</p>
            <div className="relative w-40 h-40 flex items-center justify-center perspective-1000 mb-6">
                <motion.div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>
                    {[0, 60, 120].map((deg) => (
                        <div key={deg} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotateY(${deg}deg)` }}>
                            <Gem size={100} color={getGemColor(score)} fill={getGemColor(score)} fillOpacity={0.2} strokeWidth={1} />
                        </div>
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full blur-xl opacity-50" style={{ backgroundColor: getGemColor(score) }}></div>
                    </div>
                </motion.div>
            </div>
            <div className="z-10">
                <h2 className={`text-5xl font-display font-bold mb-1`} style={{ color: getGemColor(score) }}>{score}</h2>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'bg-white/10' : 'bg-slate-100'}`} style={{ color: getGemColor(score) }}>{getRiskLabel(score)}</span>
            </div>
        </div>
    );
};

export default ChaosGem;
