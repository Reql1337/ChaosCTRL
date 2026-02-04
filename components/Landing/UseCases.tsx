import React from 'react';

const UseCases: React.FC = () => {
  return (
    <section className="py-24 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
           <div className="border-l-2 border-chaos-purple pl-6 py-2">
              <h3 className="text-white font-bold font-display text-lg mb-2">For Product Managers</h3>
              <p className="text-gray-400">Regain control of your roadmap with quantitative justification.</p>
           </div>
           <div className="border-l-2 border-control-blue pl-6 py-2">
              <h3 className="text-white font-bold font-display text-lg mb-2">For Engineering Leads</h3>
              <p className="text-gray-400">Stop mid-sprint disruptions before they hit your team.</p>
           </div>
           <div className="border-l-2 border-chaos-orange pl-6 py-2">
              <h3 className="text-white font-bold font-display text-lg mb-2">For Executives</h3>
              <p className="text-gray-400">Understand how decisions ripple across the organization.</p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;