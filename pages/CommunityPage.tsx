import React from 'react';
import { MessageCircle, Users, Calendar, ArrowUpRight } from 'lucide-react';

const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
         <h1 className="font-display font-black text-5xl text-white mb-6">Join the Chaos</h1>
         <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect with thousands of product managers and engineers who are taming scope creep and shipping on time.
         </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-[#5865F2] rounded-2xl p-8 text-white flex flex-col items-center text-center hover:bg-[#4752C4] transition-colors cursor-pointer">
              <MessageCircle size={48} className="mb-4" />
              <h3 className="font-bold text-xl mb-2">Discord Server</h3>
              <p className="text-white/80 text-sm mb-6">Real-time discussions, support, and memes about merge conflicts.</p>
              <button className="bg-white text-[#5865F2] px-6 py-2 rounded-full font-bold text-sm">Join Server</button>
          </div>
          <div className="bg-navy-800 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center">
              <Users size={48} className="text-emerald-500 mb-4" />
              <h3 className="font-bold text-white text-xl mb-2">Community Forum</h3>
              <p className="text-gray-400 text-sm mb-6">Long-form discussions, feature requests, and showcases.</p>
              <button className="text-white border border-white/20 hover:bg-white/5 px-6 py-2 rounded-full font-bold text-sm">Browse Topics</button>
          </div>
          <div className="bg-navy-800 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center">
              <Calendar size={48} className="text-chaos-orange mb-4" />
              <h3 className="font-bold text-white text-xl mb-2">Events & Meetups</h3>
              <p className="text-gray-400 text-sm mb-6">Upcoming webinars and local agile meetups.</p>
              <button className="text-white border border-white/20 hover:bg-white/5 px-6 py-2 rounded-full font-bold text-sm">View Calendar</button>
          </div>
      </div>

      <div className="bg-navy-800 border-t border-white/5 py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">Latest from the Community</h2>
            <div className="grid md:grid-cols-2 gap-6">
               {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4 p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                     <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 font-bold">
                        {String.fromCharCode(64 + i)}
                     </div>
                     <div className="flex-1">
                        <h4 className="text-white font-bold mb-1 group-hover:text-emerald-500 transition-colors">How we reduced scope creep by 50% using ChaosCTRL</h4>
                        <p className="text-gray-500 text-sm mb-2">Posted by @agile_ninja • 2 hours ago</p>
                        <div className="flex gap-2">
                           <span className="text-xs bg-navy-900 border border-white/10 px-2 py-0.5 rounded text-gray-400">Case Study</span>
                           <span className="text-xs bg-navy-900 border border-white/10 px-2 py-0.5 rounded text-gray-400">Success</span>
                        </div>
                     </div>
                     <ArrowUpRight className="text-gray-600 group-hover:text-white" size={20} />
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default CommunityPage;