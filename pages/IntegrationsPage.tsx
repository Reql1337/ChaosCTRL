import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

const integrations = [
  { name: 'Jira Software', category: 'Issue Tracking', desc: 'Sync tickets, sprints, and story points automatically.', icon: '🔷' },
  { name: 'Linear', category: 'Issue Tracking', desc: 'Real-time two-way sync for modern product teams.', icon: '🌑' },
  { name: 'GitHub', category: 'Version Control', desc: 'Link PRs and commits to scope changes.', icon: '🐙' },
  { name: 'Slack', category: 'Communication', desc: 'Get risk alerts and approve changes from Slack.', icon: '💬' },
  { name: 'Notion', category: 'Documentation', desc: 'Embed ChaosCTRL dashboards directly into your wiki.', icon: '📓' },
  { name: 'Microsoft Teams', category: 'Communication', desc: 'Enterprise-grade notifications and approvals.', icon: '👥' },
];

const IntegrationsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h1 className="font-display font-black text-5xl text-white mb-6">Connect Your Stack</h1>
           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
             ChaosCTRL plays nicely with the tools you already use. Ingest data, send alerts, and manage scope without leaving your workflow.
           </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
           {integrations.map((tool, i) => (
              <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-navy-800 border border-emerald-500/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-all group"
              >
                 <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center text-3xl border border-white/5">
                       {tool.icon}
                    </div>
                    <span className="text-xs font-bold text-gray-500 bg-navy-900 px-3 py-1 rounded-full border border-white/5">{tool.category}</span>
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                 <p className="text-gray-400 text-sm leading-relaxed mb-6">{tool.desc}</p>
                 <button className="flex items-center gap-2 text-emerald-500 text-sm font-bold group-hover:gap-3 transition-all">
                    Connect <ArrowRight size={16} />
                 </button>
              </motion.div>
           ))}
        </div>

        <div className="bg-navy-800 rounded-3xl p-8 md:p-12 border border-emerald-500/10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div>
              <h3 className="text-2xl font-bold text-white mb-2">Don't see your tool?</h3>
              <p className="text-gray-400">Our API is open. Build your own integration in minutes.</p>
           </div>
           <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-colors">
              View API Docs
           </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;