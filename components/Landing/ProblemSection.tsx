import React from 'react';
import { EyeOff, Users, Activity } from 'lucide-react';

const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-white">
            Chaos is your biggest hidden cost.
          </h2>
          <p className="text-xl text-gray-400">
            And most teams never see it coming.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <EyeOff className="text-emerald-500" size={32} />,
              title: "Invisible Disruption",
              description: "Small changes add up quietly until your deadlines slip."
            },
            {
              icon: <Users className="text-emerald-500" size={32} />,
              title: "No Accountability",
              description: "Stakeholders introduce chaos. You’re left holding the delays."
            },
            {
              icon: <Activity className="text-emerald-500" size={32} />,
              title: "Roadmap Instability",
              description: "When everything is urgent, nothing gets delivered."
            }
          ].map((card, idx) => (
            <div key={idx} className="bg-navy-800 border border-emerald-500/10 p-8 rounded-xl hover:border-emerald-500/30 transition-all group">
              <div className="bg-navy-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">{card.title}</h3>
              <p className="text-gray-400 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;