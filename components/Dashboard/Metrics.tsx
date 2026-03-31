import React from 'react';
import { Briefcase, Activity, CreditCard, Plus, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string;
    change?: string;
    isPositive?: boolean;
    icon: React.ReactNode;
    theme: any;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon, theme }) => (
    <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-6 flex flex-col justify-between ${theme.shadow} transition-colors duration-300`}>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${theme.isDarkMode ? 'bg-white/5' : 'bg-slate-100'} ${theme.text}`}>
                {icon}
            </div>
            {change && (
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {change}
                </div>
            )}
        </div>
        <div>
            <p className={`${theme.textMuted} text-sm font-medium mb-1`}>{title}</p>
            <h3 className={`${theme.text} text-2xl font-bold font-display`}>{value}</h3>
        </div>
    </div>
);

interface MetricsGridProps {
    stats: { totalTickets: number };
    currentChaosScore: number;
    predictedDelay: number;
    onSimulate: () => void;
    theme: any;
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ stats, currentChaosScore, predictedDelay, onSimulate, theme }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
                title="Total Tickets"
                value={stats.totalTickets.toLocaleString()}
                change="2.5%"
                isPositive={true}
                icon={<Briefcase size={20} />}
                theme={theme}
            />
            <MetricCard
                title="Chaos Score"
                value={`${currentChaosScore}/100`}
                change="0.5%"
                isPositive={currentChaosScore < 50}
                icon={<Activity size={20} />}
                theme={theme}
            />
            <MetricCard
                title="Predicted Delay"
                value={`+${predictedDelay} Days`}
                change="0.2%"
                isPositive={false}
                icon={<CreditCard size={20} />}
                theme={theme}
            />
            <button
                onClick={onSimulate}
                className={`border-2 border-dashed ${theme.border} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all group h-full`}
            >
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus size={24} />
                </div>
                <span className={`font-bold ${theme.text} text-sm`}>Simulate Change</span>
            </button>
        </div>
    );
};

export default MetricsGrid;
