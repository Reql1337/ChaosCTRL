import React, { useState } from 'react';
import { X, ArrowRight, Loader2, ShieldAlert, CheckCircle } from 'lucide-react';
import { analyzeTransaction } from '../../services/geminiService';
import { AnalysisResult, Transaction } from '../../types';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyze: (result: AnalysisResult) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, onAnalyze }) => {
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!merchant.trim() || !amount) return;
    setIsAnalyzing(true);
    const analysis = await analyzeTransaction(merchant, parseFloat(amount));
    setResult(analysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-brand-gray border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl p-6 overflow-hidden">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl font-bold text-white">Add Transaction</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24} /></button>
        </div>

        {!result ? (
          <div className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Merchant Name</label>
                <input 
                  className="w-full bg-brand-black border border-white/10 rounded-lg p-3 text-white focus:border-brand-yellow outline-none transition-colors"
                  placeholder="e.g., Starbucks, Amazon, Apple Store"
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Amount</label>
                <input 
                  type="number"
                  className="w-full bg-brand-black border border-white/10 rounded-lg p-3 text-white focus:border-brand-yellow outline-none transition-colors"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
             </div>
             <div className="flex justify-end pt-4">
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !merchant.trim()}
                  className="flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover disabled:opacity-50 text-brand-black px-6 py-3 rounded-full font-bold transition-all w-full justify-center"
                >
                  {isAnalyzing ? <><Loader2 className="animate-spin" size={20}/> Processing...</> : 'Analyze Spending'}
                </button>
             </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col items-center justify-center text-center">
                 <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${result.riskScore > 50 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                    {result.riskScore > 50 ? <ShieldAlert size={32} /> : <CheckCircle size={32} />}
                 </div>
                 <h3 className="font-display text-xl font-bold text-white">
                    {result.riskScore > 50 ? 'High Spending Risk' : 'Safe Spending'}
                 </h3>
                 <p className="text-brand-muted text-sm mt-1">{result.category}</p>
             </div>
             
             <div className="bg-brand-black/50 p-4 rounded-xl border border-white/5">
                <p className="text-gray-300 text-sm">"{result.advice}"</p>
             </div>

             <div className="flex gap-3 pt-2">
                <button onClick={() => { onAnalyze(result); onClose(); }} className="flex-1 bg-brand-yellow text-brand-black hover:bg-brand-yellowHover py-3 rounded-full font-bold flex justify-center items-center gap-2 transition-colors">
                  Save Transaction
                </button>
                <button onClick={() => { setResult(null); setMerchant(''); setAmount(''); }} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-full font-bold transition-colors">
                  New Scan
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionModal;