import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Mon', amount: 120 },
  { name: 'Tue', amount: 80 },
  { name: 'Wed', amount: 250 },
  { name: 'Thu', amount: 90 },
  { name: 'Fri', amount: 400 },
  { name: 'Sat', amount: 180 },
  { name: 'Sun', amount: 60 },
];

const SpendingChart: React.FC = () => {
  return (
    <div className="bg-brand-gray border border-white/5 rounded-2xl p-6 h-full flex flex-col">
       <div className="mb-6 flex justify-between items-end">
          <div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Weekly Spend</h3>
            <p className="text-2xl font-display font-bold text-white mt-1">$1,180.00</p>
          </div>
          <select className="bg-black/30 text-xs text-gray-400 border-none rounded px-2 py-1 outline-none">
            <option>This Week</option>
            <option>Last Week</option>
          </select>
       </div>
       <div className="flex-1 w-full min-h-[200px]">
         <ResponsiveContainer width="100%" height="100%">
           <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
             <defs>
               <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="5%" stopColor="#FACC15" stopOpacity={0.3}/>
                 <stop offset="95%" stopColor="#FACC15" stopOpacity={0}/>
               </linearGradient>
             </defs>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
             <XAxis dataKey="name" stroke="#52525B" fontSize={12} tickLine={false} axisLine={false} />
             <YAxis stroke="#52525B" fontSize={12} tickLine={false} axisLine={false} />
             <Tooltip 
                cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                contentStyle={{ backgroundColor: '#18181B', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }}
                itemStyle={{ color: '#FACC15' }}
             />
             <Area type="monotone" dataKey="amount" stroke="#FACC15" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
           </AreaChart>
         </ResponsiveContainer>
       </div>
    </div>
  );
};

export default SpendingChart;