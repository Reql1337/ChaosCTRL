import React from 'react';
import { Search, Book, Code, Terminal, FileText } from 'lucide-react';

const DocumentationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-900 pt-20">
       <div className="bg-navy-800 border-b border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <h1 className="font-display font-bold text-4xl text-white mb-4">Documentation</h1>
             <div className="max-w-xl relative">
                <input 
                  type="text" 
                  placeholder="Search guides, API references, and tutorials..." 
                  className="w-full bg-navy-900 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white focus:border-emerald-500 outline-none"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
             </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
             <div>
                <h4 className="text-white font-bold mb-4">Getting Started</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                   <li className="text-emerald-500 font-medium cursor-pointer">Introduction</li>
                   <li className="hover:text-white cursor-pointer transition-colors">Installation</li>
                   <li className="hover:text-white cursor-pointer transition-colors">First Project Setup</li>
                   <li className="hover:text-white cursor-pointer transition-colors">Importing Data</li>
                </ul>
             </div>
             <div>
                <h4 className="text-white font-bold mb-4">Core Concepts</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                   <li className="hover:text-white cursor-pointer transition-colors">The Chaos Score</li>
                   <li className="hover:text-white cursor-pointer transition-colors">Impact Analysis</li>
                   <li className="hover:text-white cursor-pointer transition-colors">Risk Mitigation</li>
                </ul>
             </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
             <div className="grid md:grid-cols-2 gap-6 mb-12">
                {[
                   { title: "Quickstart Guide", icon: <Terminal size={24} className="text-emerald-500"/>, desc: "Get up and running in less than 5 minutes." },
                   { title: "API Reference", icon: <Code size={24} className="text-emerald-500"/>, desc: "Detailed endpoints for custom integrations." },
                   { title: "Best Practices", icon: <Book size={24} className="text-emerald-500"/>, desc: "Learn how to manage scope like a pro." },
                   { title: "Report Generation", icon: <FileText size={24} className="text-emerald-500"/>, desc: "Exporting data for stakeholders." }
                ].map((card, i) => (
                   <div key={i} className="bg-navy-800 border border-white/5 p-6 rounded-xl hover:border-emerald-500/30 transition-colors cursor-pointer group">
                      <div className="mb-4 bg-navy-900 w-12 h-12 rounded-lg flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">{card.icon}</div>
                      <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
                      <p className="text-gray-400 text-sm">{card.desc}</p>
                   </div>
                ))}
             </div>

             <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">Introduction to ChaosCTRL</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                   ChaosCTRL is designed to solve the "Yes" problem in software development. Every small request accepted late in a sprint adds up to significant delays. 
                   Our platform connects to your existing issue trackers (Jira, Linear, GitHub) and assigns a quantitative risk score to every new ticket or scope change.
                </p>
                <div className="bg-navy-800 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-8">
                   <h4 className="text-white font-bold mb-2">Key Term: Chaos Score</h4>
                   <p className="text-gray-400 text-sm">
                      A dynamic metric (0-100) calculated based on ticket complexity, current sprint load, historical velocity, and dependency depth. 
                      A score above 70 indicates a high probability of timeline slippage.
                   </p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default DocumentationPage;