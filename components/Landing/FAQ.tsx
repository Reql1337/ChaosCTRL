import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Does it integrate with Jira and Linear?",
    answer: "Yes, ChaosCTRL features native 2-way sync with Jira, Linear, and GitHub Issues. We automatically ingest tickets and update statuses based on risk assessment."
  },
  {
    question: "How is the 'Chaos Score' calculated?",
    answer: "Our proprietary AI model analyzes ticket complexity, dependency chains, historical velocity, and current sprint load to generate a score from 0-100."
  },
  {
    question: "Can I export reports for stakeholders?",
    answer: "Absolutely. Generate PDF or interactive HTML reports that highlight risks, projected delays, and mitigation options in plain English."
  },
  {
    question: "Is there an on-premise version?",
    answer: "We offer self-hosted containers for Enterprise plans to ensure your data never leaves your VPC."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-navy-900 border-t border-white/5">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          <div>
             <h2 className="font-display font-black text-5xl text-white uppercase mb-4">Questions?</h2>
             <p className="text-gray-400 mb-8">We have answers.</p>
             <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full text-sm font-bold transition-colors">Contact Support</button>
          </div>
          
          <div className="space-y-4">
             {faqs.map((item, i) => (
                <div key={i} className="border-b border-white/10 pb-4">
                   <button 
                      onClick={() => toggleFAQ(i)}
                      className="flex justify-between items-center w-full text-left py-2 group"
                   >
                      <span className={`font-bold text-lg transition-colors ${openIndex === i ? 'text-emerald-500' : 'text-white group-hover:text-emerald-500'}`}>
                        {item.question}
                      </span>
                      {openIndex === i ? <Minus className="text-emerald-500" /> : <Plus className="text-gray-500 group-hover:text-white" />}
                   </button>
                   <AnimatePresence>
                     {openIndex === i && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.3 }}
                         className="overflow-hidden"
                       >
                         <p className="text-gray-400 pt-2 pb-4 leading-relaxed">
                           {item.answer}
                         </p>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

export default FAQ;