import React from 'react';
import { Copy, Check } from 'lucide-react';

const APIPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-900 pt-24">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
             <div className="lg:w-1/2">
                <h1 className="font-display font-black text-5xl text-white mb-6">Build on Chaos</h1>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                   Programmatically analyze scope risk, retrieve chaos scores, and trigger simulations from your CI/CD pipeline or custom internal tools.
                </p>
                
                <div className="space-y-8">
                   <div>
                      <h3 className="text-white font-bold text-xl mb-4">Authentication</h3>
                      <p className="text-gray-400 mb-4">
                         All API requests require a Bearer Token in the header. You can generate tokens in your dashboard settings.
                      </p>
                      <div className="bg-navy-800 p-4 rounded-lg border border-white/10 font-mono text-sm text-emerald-400">
                         Authorization: Bearer chaos_live_sk_...
                      </div>
                   </div>

                   <div>
                      <h3 className="text-white font-bold text-xl mb-4">Endpoints</h3>
                      <div className="space-y-4">
                         <div className="bg-navy-800 p-6 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                               <span className="bg-emerald-500/20 text-emerald-500 px-2 py-1 rounded text-xs font-bold">POST</span>
                               <code className="text-white text-sm">/v1/analyze</code>
                            </div>
                            <p className="text-gray-400 text-sm">Submit a text description or ticket ID to receive a Chaos Score and impact analysis.</p>
                         </div>
                         <div className="bg-navy-800 p-6 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                               <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold">GET</span>
                               <code className="text-white text-sm">/v1/projects/{'{id}'}/health</code>
                            </div>
                            <p className="text-gray-400 text-sm">Retrieve current project health status, including aggregated risk metrics.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="lg:w-1/2">
                <div className="bg-[#0f1117] rounded-2xl border border-white/10 overflow-hidden shadow-2xl sticky top-24">
                   <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                      <div className="flex gap-2">
                         <div className="w-3 h-3 rounded-full bg-red-500"></div>
                         <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                         <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-gray-500 text-xs font-mono">example.js</span>
                   </div>
                   <div className="p-6 overflow-x-auto">
<pre className="text-sm font-mono leading-relaxed">
<span className="text-purple-400">const</span> <span className="text-blue-400">analyzeScope</span> <span className="text-gray-400">=</span> <span className="text-purple-400">async</span> <span className="text-gray-400">(</span>ticket<span className="text-gray-400">)</span> <span className="text-purple-400">=&gt;</span> <span className="text-gray-400">{'{'}</span>
  <span className="text-purple-400">const</span> response <span className="text-gray-400">=</span> <span className="text-purple-400">await</span> fetch<span className="text-gray-400">(</span><span className="text-green-400">'https://api.chaosctrl.com/v1/analyze'</span><span className="text-gray-400">, {'{'}</span>
    method: <span className="text-green-400">'POST'</span><span className="text-gray-400">,</span>
    headers: <span className="text-gray-400">{'{'}</span>
      <span className="text-green-400">'Authorization'</span>: <span className="text-green-400">`Bearer ${'{'}process.env.CHAOS_KEY{'}'}`</span><span className="text-gray-400">,</span>
      <span className="text-green-400">'Content-Type'</span>: <span className="text-green-400">'application/json'</span>
    <span className="text-gray-400">{'}'},</span>
    body: JSON.stringify<span className="text-gray-400">({'{'}</span>
      description: ticket.description<span className="text-gray-400">,</span>
      context: <span className="text-green-400">'sprint_42'</span>
    <span className="text-gray-400">{'}'})</span>
  <span className="text-gray-400">{'}'});</span>

  <span className="text-purple-400">const</span> data <span className="text-gray-400">=</span> <span className="text-purple-400">await</span> response.json<span className="text-gray-400">();</span>
  <span className="text-purple-400">return</span> data.score; <span className="text-gray-500">// Returns 0-100</span>
<span className="text-gray-400">{'}'}</span>
</pre>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default APIPage;