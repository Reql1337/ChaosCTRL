import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';

const data = [
  { name: 'Sprint 1', delay: 2, chaos: 'Low' },
  { name: 'Sprint 2', delay: 4, chaos: 'Low' },
  { name: 'Sprint 3', delay: 12, chaos: 'High' }, // The spike
  { name: 'Sprint 4', delay: 5, chaos: 'Medium' },
];

const ScopeTimeline: React.FC = () => {
  return (
    <div className="bg-navy-800 border border-white/5 rounded-2xl p-6 h-full flex flex-col">
       <div className="mb-6 flex justify-between items-end">
          <div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Scope Impact</h3>
            <p className="text-2xl font-display font-bold text-white mt-1">+23 Days</p>
          </div>
          <div className="flex items-center gap-2">
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[10px] text-gray-400">Low</span></div>
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-300"></div><span className="text-[10px] text-gray-400">Med</span></div>
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-chaos-orange"></div><span className="text-[10px] text-gray-400">High</span></div>
          </div>
       </div>
       <div className="flex-1 w-full min-h-[200px]">
         <ResponsiveContainer width="100%" height="100%">
           <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
             <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
             <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
             <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#020408', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
             />
             <Bar dataKey="delay" radius={[4, 4, 0, 0]} barSize={40}>
               {data.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={entry.chaos === 'High' ? '#F97316' : entry.chaos === 'Medium' ? '#34D399' : '#10B981'} />
               ))}
             </Bar>
           </BarChart>
         </ResponsiveContainer>
       </div>
    </div>
  );
};

export default ScopeTimeline;