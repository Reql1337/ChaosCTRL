import React from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Simple, transparent pricing.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="bg-navy-800 border border-emerald-500/10 rounded-xl p-8 flex flex-col hover:border-emerald-500/30 transition-colors">
            <h3 className="text-white font-bold text-xl mb-2">Starter</h3>
            <p className="text-gray-400 text-sm mb-6">For small product teams</p>
            <div className="text-3xl font-bold text-white mb-6">$49<span className="text-sm font-normal text-gray-500">/mo</span></div>
            <button className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg font-medium text-sm transition-colors mb-8">Get Started</button>
            <ul className="space-y-4 flex-1">
               <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-emerald-500"/> 5 Users</li>
               <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-emerald-500"/> Basic Integrations</li>
               <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-emerald-500"/> Weekly Reports</li>
            </ul>
          </div>

          {/* Pro */}
          <div className="bg-navy-800 border-2 border-emerald-500 rounded-xl p-8 flex flex-col relative shadow-[0_0_30px_rgba(16,185,129,0.15)] transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-emerald-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
            <h3 className="text-white font-bold text-xl mb-2">Pro</h3>
            <p className="text-gray-400 text-sm mb-6">Full analytics for cross-functional teams</p>
            <div className="text-3xl font-bold text-white mb-6">$99<span className="text-sm font-normal text-gray-500">/mo</span></div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-navy-900 py-3 rounded-lg font-medium text-sm transition-colors mb-8">Get Started</button>
            <ul className="space-y-4 flex-1">
               <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-emerald-500"/> 20 Users</li>
               <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-emerald-500"/> Advanced Jira Sync</li>
               <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-emerald-500"/> Delay Simulator</li>
               <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-emerald-500"/> Real-time Alerts</li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="bg-navy-800 border border-emerald-500/10 rounded-xl p-8 flex flex-col hover:border-emerald-500/30 transition-colors">
            <h3 className="text-white font-bold text-xl mb-2">Enterprise</h3>
            <p className="text-gray-400 text-sm mb-6">Customized models + governance controls</p>
            <div className="text-3xl font-bold text-white mb-6">Custom</div>
            <button className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg font-medium text-sm transition-colors mb-8">Contact Sales</button>
            <ul className="space-y-4 flex-1">
               <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-emerald-500"/> Unlimited Users</li>
               <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-emerald-500"/> Custom AI Models</li>
               <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-emerald-500"/> SSO & Audit Logs</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;