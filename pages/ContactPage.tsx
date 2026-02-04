import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid lg:grid-cols-2 gap-16">
            <div>
               <h1 className="font-display font-black text-5xl text-white mb-6">Get in Touch</h1>
               <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                  Have questions about enterprise plans, integrations, or just want to vent about scope creep? We're here.
               </p>

               <div className="space-y-8">
                  <div className="flex items-start gap-4">
                     <div className="bg-navy-800 p-3 rounded-lg border border-white/10">
                        <Mail className="text-emerald-500" />
                     </div>
                     <div>
                        <h4 className="text-white font-bold mb-1">Email</h4>
                        <p className="text-gray-400">support@chaosctrl.com</p>
                        <p className="text-gray-400">sales@chaosctrl.com</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="bg-navy-800 p-3 rounded-lg border border-white/10">
                        <MapPin className="text-emerald-500" />
                     </div>
                     <div>
                        <h4 className="text-white font-bold mb-1">Office</h4>
                        <p className="text-gray-400">123 Entropy Blvd</p>
                        <p className="text-gray-400">San Francisco, CA 94103</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-navy-800 border border-white/5 rounded-3xl p-8">
               <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-bold text-white mb-2">First Name</label>
                        <input type="text" className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 text-white focus:border-emerald-500 outline-none" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-white mb-2">Last Name</label>
                        <input type="text" className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 text-white focus:border-emerald-500 outline-none" />
                     </div>
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-white mb-2">Email</label>
                     <input type="email" className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 text-white focus:border-emerald-500 outline-none" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-white mb-2">Subject</label>
                     <select className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 text-white focus:border-emerald-500 outline-none">
                        <option>Sales Inquiry</option>
                        <option>Support Request</option>
                        <option>Partnership</option>
                        <option>Other</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-white mb-2">Message</label>
                     <textarea className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 text-white focus:border-emerald-500 outline-none h-32 resize-none"></textarea>
                  </div>
                  <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-navy-900 py-4 rounded-lg font-bold transition-all">
                     Send Message
                  </button>
               </form>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ContactPage;