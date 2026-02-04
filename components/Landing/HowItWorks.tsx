import React from 'react';

const steps = [
  { num: "01", title: "Detect", desc: "ChaosCTRL automatically captures every scope change from Slack, email, and Jira." },
  { num: "02", title: "Score", desc: "AI assigns a Chaos Score based on complexity, staffing, timing, and ripple effects." },
  { num: "03", title: "Visualize", desc: "Dashboards reveal patterns: who creates chaos, when it spikes, and which projects are most vulnerable." },
  { num: "04", title: "Simulate", desc: "Test “accept, reject, or defer” scenarios before saying yes." }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-navy-800/30 border-y border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
            Turning chaos into control.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="text-6xl font-display font-bold text-white/5 mb-4 select-none absolute -top-8 -left-2 z-0">
                {step.num}
              </div>
              <div className="relative z-10 pt-4">
                 <h3 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    {step.title}
                 </h3>
                 <p className="text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                 </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;