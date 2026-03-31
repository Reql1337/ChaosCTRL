import React from 'react';
import { Gem } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
         <div className="w-16 h-16 bg-navy-800 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <Gem size={32} className="text-emerald-500" />
         </div>
         <h1 className="font-display font-black text-5xl md:text-6xl text-white mb-8">
            We believe "No" saves projects.
         </h1>
         <p className="text-xl text-gray-400 leading-relaxed">
            Software projects don't fail because of bad code. They fail because of unmanaged scope. 
            We built ChaosCTRL to give engineering teams the data they need to protect their time and deliver quality work.
         </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 mb-24 items-center">
         <div className="bg-navy-800 rounded-3xl p-8 border border-white/5 relative overflow-hidden h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
            {/* Abstract visual representation of team */}
            <div className="grid grid-cols-3 gap-4 h-full content-center relative z-10 opacity-50">
               {[...Array(9)].map((_, i) => (
                  <div key={i} className="aspect-square bg-white/5 rounded-xl"></div>
               ))}
            </div>
         </div>
         <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-400">
               <p>
                  In 2023, our founders were working at a high-growth fintech startup. Despite a talented team, they missed deadlines for three consecutive quarters. The reason? "Small" requests from stakeholders that snuck into the sprint mid-cycle.
               </p>
               <p>
                  They tried Excel sheets, Notion templates, and Jira plugins, but nothing worked. The impact was always invisible until it was too late.
               </p>
               <p>
                  ChaosCTRL was born from a weekend hackathon to visualize the "Chaos Score" of a backlog. Today, it's used by over 500 teams to quantify the cost of disruption.
               </p>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <h2 className="text-2xl font-bold text-white mb-12 text-center">The Team</h2>
         <div className="grid md:grid-cols-4 gap-6">
            {[
               { name: "Elena R.", role: "CEO & Co-founder" },
               { name: "Marcus T.", role: "CTO" },
               { name: "Sarah J.", role: "Head of Product" },
               { name: "David K.", role: "Lead Engineer" }
            ].map((member, i) => (
               <div key={i} className="bg-navy-800 border border-white/5 rounded-xl p-6 text-center hover:border-emerald-500/30 transition-colors">
                  <div className="w-24 h-24 bg-navy-900 rounded-full mx-auto mb-4 border border-white/5"></div>
                  <h3 className="text-white font-bold">{member.name}</h3>
                  <p className="text-emerald-500 text-sm">{member.role}</p>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default AboutPage;