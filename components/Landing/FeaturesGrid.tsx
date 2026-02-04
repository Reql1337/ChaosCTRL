import React from 'react';
import { Gem, Activity, GitPullRequest, ShieldAlert } from 'lucide-react';

interface FeaturesGridProps {
  onStart?: () => void;
}

const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onStart }) => {
  const cards = [
    {
      icon: <Gem size={48} />,
      title: "Value Tracking",
      desc: "Assign real business value to every ticket."
    },
    {
      icon: <Activity size={48} />,
      title: "Pulse Check",
      desc: "Real-time velocity monitoring."
    },
    {
      icon: <ShieldAlert size={48} />,
      title: "Risk Detection",
      desc: "Instant alerts for high-risk scope changes."
    },
    {
      icon: <GitPullRequest size={48} />,
      title: "Deep Integration",
      desc: "Syncs directly with your git provider."
    }
  ];

  return (
    <section className="py-24 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-emerald-500 font-bold text-sm tracking-widest uppercase mb-4">Core Capabilities</h2>
        <h3 className="font-display font-black text-4xl md:text-6xl text-white uppercase max-w-4xl mx-auto mb-16">
          Tools to tame the roadmap chaos
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {cards.map((card, idx) => (
             <div key={idx} className="group relative aspect-square bg-[#0a0e14] rounded-3xl flex flex-col items-center justify-center p-6 border border-white/5 transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-400 cursor-pointer overflow-hidden">
                {/* Default State */}
                <div className="transition-all duration-300 transform group-hover:-translate-y-4 group-hover:scale-110 text-emerald-600 group-hover:text-navy-900">
                   {card.icon}
                </div>
                
                {/* Hover Reveal Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-center">
                   <p className="text-navy-900 font-bold text-sm leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {card.desc}
                   </p>
                </div>
             </div>
          ))}
        </div>

        <button 
          onClick={onStart}
          className="mt-16 bg-emerald-500 hover:bg-emerald-400 text-navy-900 px-10 py-4 rounded-full text-lg font-bold transition-all hover:scale-105"
        >
          Start Control
        </button>
      </div>
    </section>
  );
};

export default FeaturesGrid;