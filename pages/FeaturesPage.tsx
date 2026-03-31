import React from 'react';
import { Shield, Zap, Search, Activity, GitBranch, Bell } from 'lucide-react';

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
           <h1 className="font-display font-black text-5xl text-white mb-6">Complete Control</h1>
           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A suite of tools designed to identify, quantify, and neutralize scope creep before it impacts your release date.
           </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[
             { icon: <Shield size={32} className="text-emerald-500"/>, title: "Risk Detection", desc: "Automatically flags tickets that match risk patterns (e.g., vague descriptions, high dependency count, mid-sprint addition)." },
             { icon: <Zap size={32} className="text-emerald-500"/>, title: "Instant Scoring", desc: "Our AI analyzes complexity and assigns a 0-100 Chaos Score to every request in milliseconds." },
             { icon: <Activity size={32} className="text-emerald-500"/>, title: "Delay Simulation", desc: "Visualize the 'Butterfly Effect'. See how a single change ripples through your Gantt chart." },
             { icon: <GitBranch size={32} className="text-emerald-500"/>, title: "Dependency Mapping", desc: "Understand which teams will be blocked if you accept a new scope request." },
             { icon: <Search size={32} className="text-emerald-500"/>, title: "Deep Search", desc: "Find similar past requests to see how much they actually delayed previous sprints." },
             { icon: <Bell size={32} className="text-emerald-500"/>, title: "Smart Alerts", desc: "Get notified via Slack or Teams when a high-risk change is proposed." }
           ].map((feat, i) => (
             <div key={i} className="bg-navy-800 border border-emerald-500/10 p-8 rounded-2xl hover:border-emerald-500/30 transition-colors">
                <div className="mb-6 bg-navy-900 w-16 h-16 rounded-xl flex items-center justify-center border border-white/5 shadow-lg">
                   {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;