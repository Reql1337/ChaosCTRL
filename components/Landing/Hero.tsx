import React from 'react';
import { m } from 'framer-motion';
import AlertTriangle from 'lucide-react/dist/esm/icons/alert-triangle';
import Gem from 'lucide-react/dist/esm/icons/gem';

interface HeroProps {
    onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
    const [isScenarioActive, setIsScenarioActive] = React.useState(false);

    return (
        <section className="relative pt-32 pb-24 lg:pt-40 overflow-hidden bg-navy-900">
            {/* Glow Effect */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] ${isScenarioActive ? 'bg-red-500/10' : 'bg-emerald-500/10'} blur-[150px] rounded-full pointer-events-none transition-colors duration-1000`}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className={`${isScenarioActive ? 'text-red-400' : 'text-emerald-500'} font-bold tracking-widest text-sm mb-4 uppercase transition-colors`}>
                        {isScenarioActive ? 'Hazard Detected' : 'Quantify the Chaos'}
                    </h2>
                    <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-white mb-6 uppercase">
                        Ship on time,<br /> every time.
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
                        Quantify the hidden cost of scope creep <span className="text-white font-bold">before</span> you say yes.
                        Keep your delivery dates realistic and your team sane.
                    </p>
                </m.div>

                <div className="flex flex-col sm:flex-row gap-4 mb-20">
                    <m.button
                        onClick={onStart}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-500 hover:bg-emerald-400 text-navy-900 px-10 py-4 rounded-full text-lg font-bold transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                    >
                        Start Controlling Chaos
                    </m.button>
                    <button
                        onClick={() => setIsScenarioActive(!isScenarioActive)}
                        className={`px-8 py-4 rounded-full text-lg font-bold border transition-all flex items-center gap-3 ${isScenarioActive ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                    >
                        {isScenarioActive ? 'Clear Scenario' : 'Try the Simulator'}
                        <div className={`w-3 h-3 rounded-full ${isScenarioActive ? 'bg-red-500 animate-pulse' : 'bg-white/20'}`} />
                    </button>
                </div>

                {/* 3D Dashboard Mockup */}
                <m.div
                    initial={{ opacity: 0, rotateX: 20, y: 100 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, type: "spring" }}
                    className="relative w-full max-w-5xl perspective-1000"
                    style={{ perspective: '1000px' }}
                >
                    {/* Main Glass Card */}
                    <div className={`relative bg-navy-800/60 backdrop-blur-xl border ${isScenarioActive ? 'border-red-500/40' : 'border-emerald-500/20'} rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row gap-6 items-start overflow-hidden transition-colors duration-500`}>
                        {/* Decorative background within card */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${isScenarioActive ? 'from-red-500/10' : 'from-emerald-500/5'} to-transparent pointer-events-none transition-colors`}></div>

                        {/* Left Panel: Chaos Metrics */}
                        <div className={`flex-1 ${isScenarioActive ? 'bg-red-500/5 border-red-500/20' : 'bg-navy-900 border-emerald-500/10'} rounded-2xl p-6 border w-full transition-all duration-500`}>
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <p className="text-gray-400 text-xs">Project Health</p>
                                    <p className={`text-3xl font-display font-bold ${isScenarioActive ? 'text-red-500' : 'text-white'}`}>{isScenarioActive ? 'Critical' : 'Healthy'}</p>
                                </div>
                                <div className={`w-10 h-10 rounded-full ${isScenarioActive ? 'bg-red-500/20' : 'bg-emerald-500/20'} flex items-center justify-center transition-colors`}>
                                    {isScenarioActive ? <AlertTriangle size={18} className="text-red-500" /> : <Gem size={18} className="text-emerald-500" />}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 border-l-4 ${isScenarioActive ? 'border-red-500 translate-x-1 animate-pulse' : 'border-emerald-500'} transition-all`}>
                                    <div className={`w-10 h-10 ${isScenarioActive ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'} rounded-full flex items-center justify-center text-xs font-bold transition-colors`}>Scope</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">{isScenarioActive ? 'Unplanned API Change' : 'Core Architecture'}</p>
                                        <p className="text-xs text-gray-400">{isScenarioActive ? 'Stakeholder: Marketing' : 'Owner: Platform'}</p>
                                    </div>
                                    <span className={`${isScenarioActive ? 'text-red-500' : 'text-emerald-500'} font-mono text-sm font-bold`}>{isScenarioActive ? '+8 Days' : 'On Track'}</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border-l-4 border-emerald-500">
                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 text-xs font-bold">QA</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">Standard Audit</p>
                                        <p className="text-xs text-gray-400">Source: Registry</p>
                                    </div>
                                    <span className="text-emerald-500 font-mono text-sm font-bold">Passed</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel: Floating Widgets */}
                        <div className="w-full md:w-1/3 flex flex-col gap-4">
                            {/* Prediction */}
                            <div className={`bg-gradient-to-br ${isScenarioActive ? 'from-red-500/20 border-red-500/30' : 'from-emerald-500/20 border-emerald-500/20'} to-navy-900 border rounded-2xl p-6 text-left transition-all duration-500`}>
                                <p className="font-bold text-white text-lg leading-tight mb-2">Predicted Delay</p>
                                <p className={`text-3xl font-black ${isScenarioActive ? 'text-red-500' : 'text-white'}`}>
                                    {isScenarioActive ? '+12' : '0'} <span className="text-sm font-normal text-gray-400">days</span>
                                </p>
                                <div className="mt-2 h-2 bg-navy-900 rounded-full overflow-hidden">
                                    <m.div
                                        animate={{ width: isScenarioActive ? '90%' : '10%' }}
                                        className={`h-full ${isScenarioActive ? 'bg-red-500' : 'bg-emerald-500'}`}
                                    />
                                </div>
                            </div>

                            {/* Action */}
                            <div className="bg-navy-900 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-400">Action Required</p>
                                    <p className="text-sm font-bold text-white">{isScenarioActive ? 'Mitigate Risk' : 'Monitor System'}</p>
                                </div>
                                <button
                                    onClick={onStart}
                                    className={`${isScenarioActive ? 'bg-red-500 hover:bg-red-400' : 'bg-emerald-500 hover:bg-emerald-400'} text-navy-900 text-xs font-bold px-4 py-2 rounded-full transition-all`}
                                >
                                    {isScenarioActive ? 'Reject' : 'View'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Floating Element: Alert */}
                    <m.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -right-8 -top-8 bg-emerald-50 p-4 rounded-2xl shadow-xl hidden lg:block"
                    >
                        <Gem size={60} className="text-emerald-600" />
                    </m.div>
                </m.div>
            </div>
        </section>
    );
};

export default Hero;