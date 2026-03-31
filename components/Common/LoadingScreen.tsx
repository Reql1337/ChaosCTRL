import React from 'react';
import { motion } from 'framer-motion';
import { Gem } from 'lucide-react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-navy-900 z-[100] flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>

                {/* Logo Container */}
                <div className="relative w-24 h-24 bg-navy-800 border-2 border-emerald-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                    <motion.div
                        animate={{
                            rotateY: [0, 180, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Gem size={48} className="text-emerald-500" />
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8 text-center"
            >
                <h2 className="font-display font-bold text-2xl text-white tracking-tight">
                    Chaos<span className="text-emerald-500">CTRL</span>
                </h2>
                <div className="mt-4 flex gap-1 justify-center">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default LoadingScreen;
