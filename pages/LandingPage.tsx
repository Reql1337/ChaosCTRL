import React from 'react';
import Hero from '../components/Landing/Hero';
import ShowcaseSection from '../components/Landing/ShowcaseSection';
import FeaturesGrid from '../components/Landing/FeaturesGrid';
import Testimonials from '../components/Landing/Testimonials';
import FAQ from '../components/Landing/FAQ';
import Newsletter from '../components/Landing/Newsletter';
import HowItWorks from '../components/Landing/HowItWorks';
import ProblemSection from '../components/Landing/ProblemSection';
import Pricing from '../components/Landing/Pricing';
import { Target, Activity } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div id="hero" className="bg-navy-900 min-h-screen">
      <Hero onStart={onStart} />

      <div id="about">
         <ProblemSection />
      </div>

      <div className="text-center py-16 bg-navy-900">
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-white px-4">
              Stop Scope Creep in its Tracks
          </h2>
      </div>

      <div id="features">
        <ShowcaseSection 
            id="detect"
            title="Detect Hidden Risks"
            subtitle="Real-time Scope Monitoring"
            description="ChaosCTRL integrates with your issue tracker to flag high-risk changes instantly. Don't let a 'minor tweak' derail your sprint."
            align="left"
            imageComponent={
                <div className="bg-navy-800 border border-white/5 rounded-3xl p-6 shadow-2xl max-w-md mx-auto transform rotate-[-2deg]">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <p className="text-gray-400 text-xs">Sprint Velocity</p>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-white">82%</span>
                                <span className="text-gray-500 text-sm">(Target)</span>
                            </div>
                        </div>
                        <div className="bg-chaos-orange text-white text-xs font-bold px-2 py-1 rounded">Risk Detected</div>
                    </div>
                    <div className="h-4 bg-navy-900 rounded-full overflow-hidden mb-6">
                        <div className="h-full bg-emerald-500 w-[82%]"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="text-white font-bold">Backend API</span>
                            <span className="text-chaos-orange text-xs font-bold">+3 Days Risk</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="text-white font-bold">Frontend UI</span>
                            <span className="text-emerald-500 text-xs font-bold">On Track</span>
                        </div>
                    </div>
                </div>
            }
        />

        <ShowcaseSection 
            id="score"
            title="Quantify Impact"
            subtitle="The Chaos Score"
            description="Every ticket gets a score based on complexity, dependency depth, and timing. Know exactly which tasks are causing the most turbulence."
            align="right"
            imageComponent={
                <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                    {[
                        { id: '#401', title: 'Fix Header Alignment', score: 12, risk: 'LOW' },
                        { id: '#402', title: 'Migrate to Postgres', score: 94, risk: 'HIGH' },
                        { id: '#403', title: 'Add Tooltips', score: 8, risk: 'LOW' },
                        { id: '#404', title: 'Refactor Auth Logic', score: 88, risk: 'HIGH' }
                    ].map((ticket, i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between h-32">
                            <div className="flex justify-between items-start">
                                <div className="px-2 h-8 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-navy-900 text-xs">{ticket.id}</div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded ${ticket.risk === 'HIGH' ? 'bg-chaos-orange text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                                    {ticket.risk}
                                </span>
                            </div>
                            <div>
                                <p className="font-bold text-navy-900 text-sm leading-tight mb-1">{ticket.title}</p>
                                <p className="text-gray-500 text-xs">Score: {ticket.score}</p>
                            </div>
                        </div>
                    ))}
                </div>
            }
        />

        <ShowcaseSection 
            id="simulate"
            title="Simulate Futures"
            subtitle="Delay Simulator"
            description="What happens if you say yes? Simulate the ripple effects of new requests on your final delivery date before you commit."
            align="left"
            imageComponent={
                <div className="relative max-w-md mx-auto">
                    <div className="bg-navy-800 rounded-3xl p-6 border border-white/10 shadow-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Activity className="text-emerald-500" />
                            <span className="text-white font-bold">Simulation Result</span>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 bg-navy-900 p-3 rounded-xl border border-white/5">
                                <p className="text-gray-400 text-xs">Current Date</p>
                                <p className="text-white font-bold">Nov 14</p>
                            </div>
                            <div className="flex-1 bg-chaos-orange/20 p-3 rounded-xl border border-chaos-orange/50">
                                <p className="text-chaos-orange text-xs">Projected Date</p>
                                <p className="text-white font-bold">Nov 28</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-navy-900 font-bold p-4 rounded-xl shadow-lg transform rotate-12 border border-white/10">
                        +14 DAYS
                    </div>
                </div>
            }
        />
      </div>

      <FeaturesGrid onStart={onStart} />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default LandingPage;