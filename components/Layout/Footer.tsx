import React from 'react';
import { Gem } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const linkClass = "hover:text-emerald-500 cursor-pointer transition-colors";

  return (
    <footer className="bg-navy-900 border-t border-emerald-500/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
           <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onNavigate('landing')}>
                <div className="w-8 h-8 flex items-center justify-center bg-navy-800 border border-emerald-500/30 rounded-lg">
                    <Gem size={18} className="text-emerald-500" />
                </div>
                <span className="font-display font-bold text-xl text-white">Chaos<span className="text-emerald-500">CTRL</span></span>
              </div>
              <p className="text-gray-400 text-sm max-w-xs">
                 Control the unexpected before it controls you. The modern way to manage software scope and protect your timeline.
              </p>
           </div>
           
           <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                 <li onClick={() => onNavigate('features')} className={linkClass}>Features</li>
                 <li onClick={() => onNavigate('integrations')} className={linkClass}>Integrations</li>
                 <li onClick={() => onNavigate('pricing')} className={linkClass}>Pricing</li>
              </ul>
           </div>

           <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                 <li onClick={() => onNavigate('docs')} className={linkClass}>Documentation</li>
                 <li onClick={() => onNavigate('api')} className={linkClass}>API</li>
                 <li onClick={() => onNavigate('community')} className={linkClass}>Community</li>
              </ul>
           </div>

           <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                 <li onClick={() => onNavigate('about')} className={linkClass}>About</li>
                 <li onClick={() => onNavigate('blog')} className={linkClass}>Blog</li>
                 <li onClick={() => onNavigate('contact')} className={linkClass}>Contact</li>
              </ul>
           </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8">
            <p className="text-gray-500 text-xs">© 2025 ChaosCTRL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;