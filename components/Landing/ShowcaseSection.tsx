import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ShowcaseSectionProps {
  title: string;
  subtitle: string;
  description: string;
  imageComponent: React.ReactNode;
  align: 'left' | 'right';
  id?: string;
  color?: string;
}

const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ title, subtitle, description, imageComponent, align, id, color = "text-white" }) => {
  return (
    <section id={id} className="py-24 bg-navy-900 border-t border-emerald-500/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row items-center gap-16 ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
          
          <div className="flex-1 space-y-6">
            <motion.h2 
              initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`font-display font-black text-5xl md:text-6xl uppercase leading-none ${color}`}
            >
              {title}
            </motion.h2>
            <h3 className="text-2xl text-white font-bold">{subtitle}</h3>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              {description}
            </p>
            <button className="flex items-center gap-2 text-white border-b border-white pb-1 hover:text-emerald-500 hover:border-emerald-500 transition-colors font-medium">
              Learn more <ArrowRight size={16} />
            </button>
          </div>

          <div className="flex-1 w-full">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
               className="relative"
            >
                {imageComponent}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;