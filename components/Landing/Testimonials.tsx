import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Alex Chen",
    title: "Engineering Lead",
    text: "Finally, a way to quantify why 'just one small change' isn't actually small. My team loves this.",
    bg: "bg-navy-800",
  },
  {
    name: "Sarah Miller",
    title: "Product Manager",
    text: "ChaosCtrl helps me negotiate deadlines with stakeholders using real data, not just gut feelings.",
    bg: "bg-[#0A0E17]",
  },
  {
    name: "James Wilson",
    title: "CTO",
    text: "Visibility into scope creep has improved our delivery predictability by 40% in just two months.",
    bg: "bg-navy-800",
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-navy-900 overflow-hidden">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="text-chaos-purple text-sm font-bold tracking-widest uppercase mb-2">Testimonials</h2>
          <h3 className="font-display font-black text-4xl md:text-5xl text-white uppercase">Trusted by Agile Teams</h3>
       </div>

       <div className="flex gap-6 px-4 overflow-x-auto pb-8 scrollbar-hide snap-x">
          {testimonials.map((t, i) => (
             <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`min-w-[300px] md:min-w-[400px] p-8 rounded-3xl ${t.bg} border border-white/5 flex flex-col justify-between snap-center`}
             >
                <div>
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-gray-600"></div>
                      <div>
                         <p className="text-xs text-gray-400">{t.title}</p>
                         <p className="text-sm font-bold text-white">{t.name}</p>
                      </div>
                   </div>
                   <p className="text-gray-300 leading-relaxed font-medium">"{t.text}"</p>
                </div>
             </motion.div>
          ))}
       </div>
    </section>
  );
};

export default Testimonials;