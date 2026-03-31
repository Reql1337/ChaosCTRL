import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';

const posts = [
  {
    title: "Why 'T-Shirt Sizing' Fails for Complexity Analysis",
    excerpt: "Story points are subjective. Here is why we use dependency graphs to calculate true ticket weight.",
    author: "Marcus T.",
    date: "Oct 12, 2024",
    category: "Engineering",
    readTime: "5 min read"
  },
  {
    title: "The Psychological Cost of Context Switching",
    excerpt: "Every interruption costs 23 minutes. Here is the data behind developer flow state and scope creep.",
    author: "Elena R.",
    date: "Oct 08, 2024",
    category: "Management",
    readTime: "8 min read"
  },
  {
    title: "How to Say No to Stakeholders (Without Being Jerk)",
    excerpt: "A guide to using data-driven pushback to protect your roadmap while keeping relationships intact.",
    author: "Sarah J.",
    date: "Sep 28, 2024",
    category: "Culture",
    readTime: "6 min read"
  },
  {
    title: "Update: Jira Two-Way Sync is Now Live",
    excerpt: "You can now reject tickets in ChaosCTRL and have them automatically moved to 'Backlog' in Jira.",
    author: "Team Chaos",
    date: "Sep 15, 2024",
    category: "Product",
    readTime: "2 min read"
  }
];

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="mb-16">
            <h1 className="font-display font-black text-5xl text-white mb-6">Chaos Logs</h1>
            <p className="text-xl text-gray-400">Insights on engineering efficiency, product management, and entropy.</p>
         </div>

         <div className="grid md:grid-cols-2 gap-12">
            {posts.map((post, i) => (
               <div key={i} className="group cursor-pointer">
                  <div className="aspect-video bg-navy-800 rounded-2xl mb-6 overflow-hidden border border-white/5 relative">
                     <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent"></div>
                     <span className="absolute top-4 left-4 bg-emerald-500/20 text-emerald-500 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                        {post.category}
                     </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                     <div className="flex items-center gap-1"><Calendar size={14} /> {post.date}</div>
                     <div className="flex items-center gap-1"><User size={14} /> {post.author}</div>
                     <div>{post.readTime}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-500 transition-colors">{post.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">{post.excerpt}</p>
                  <button className="flex items-center gap-2 text-white font-bold text-sm group-hover:gap-3 transition-all">
                     Read Article <ArrowRight size={16} />
                  </button>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default BlogPage;