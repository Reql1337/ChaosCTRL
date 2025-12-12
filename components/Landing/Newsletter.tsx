import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="py-24 bg-navy-900 flex justify-center px-4">
      <div className="bg-gradient-to-br from-navy-800 to-navy-900 border border-emerald-500/20 rounded-3xl p-8 md:p-12 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-lg">
           <h3 className="font-display font-bold text-3xl text-white mb-4">GET THE WEEKLY CHAOS REPORT</h3>
           <p className="text-gray-400">Join 10,000+ product leaders getting tips on scope management and agile delivery.</p>
        </div>

        <div className="relative z-10 w-full md:w-auto flex flex-col gap-3">
           <input type="email" placeholder="name@company.com" className="bg-navy-900/50 border border-white/10 rounded-lg px-6 py-4 text-white outline-none focus:border-emerald-500 w-full md:w-80" />
           <button className="bg-emerald-500 hover:bg-emerald-400 text-navy-900 px-6 py-4 rounded-lg font-bold transition-all">Subscribe</button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;