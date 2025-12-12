import React, { useState } from 'react';
import { X, ArrowRight, Loader2, AlertTriangle, Gem } from 'lucide-react';
import { analyzeScopeChange } from '../../services/geminiService';
import { ScopeAnalysisResult } from '../../types';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (result: ScopeAnalysisResult) => void;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose, onAccept }) => {
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScopeAnalysisResult | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setIsAnalyzing(true);
    const analysis = await analyzeScopeChange(description);
    setResult(analysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-900/90 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-navy-800 border border-emerald-500/20 rounded-2xl w-full max-w-lg shadow-2xl p-6 overflow-hidden">
        
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-200"></div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl font-bold text-white">Simulate Scope Change</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24} /></button>
        </div>

        {!result ? (
          <div className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Change Request Description</label>
                <textarea 
                  className="w-full bg-navy-900 border border-white/10 rounded-lg p-4 text-white focus:border-emerald-500 outline-none transition-colors h-32 resize-none"
                  placeholder="e.g., Marketing wants to change the landing page layout 2 days before launch."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
             </div>
             <div className="flex justify-end pt-2">
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !description.trim()}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-navy-900 px-6 py-3 rounded-full font-bold transition-all w-full justify-center"
                >
                  {isAnalyzing ? <><Loader2 className="animate-spin" size={20}/> Analyzing...</> : 'Analyze Impact'}
                </button>
             </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-navy-900" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        <path className={`${result.score > 70 ? 'text-chaos-orange' : 'text-emerald-500'}`} strokeDasharray={`${result.score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-bold font-display text-white">{result.score}</span>
                        <span className="text-[10px] uppercase text-gray-400">Score</span>
                    </div>
                </div>
                <div>
                   <h3 className={`font-display text-xl font-bold ${result.score > 70 ? 'text-chaos-orange' : 'text-emerald-400'}`}>
                      {result.score > 70 ? 'High Disruption' : 'Moderate Impact'}
                   </h3>
                   <p className="text-gray-400 text-sm mt-1">
                      Adds <span className="text-white font-bold">+{result.impactDays} days</span> to timeline
                   </p>
                </div>
             </div>
             
             <div className="bg-navy-900/50 p-4 rounded-xl border border-white/5">
                <p className="text-gray-300 text-sm">"{result.reasoning}"</p>
             </div>

             <div className="flex gap-3 pt-2">
                <button onClick={() => { onAccept(result); onClose(); }} className="flex-1 bg-emerald-500 text-navy-900 hover:bg-emerald-400 py-3 rounded-full font-bold flex justify-center items-center gap-2 transition-colors">
                  Add to Roadmap
                </button>
                <button onClick={() => { setResult(null); setDescription(''); }} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-full font-bold transition-colors">
                  Test Another
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisModal;