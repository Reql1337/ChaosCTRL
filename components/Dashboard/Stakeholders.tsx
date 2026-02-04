import React from 'react';

interface Stakeholder {
    name: string;
    role: string;
    chaosScore: number;
    requests: number;
    avatar: string;
}

interface StakeholdersGridProps {
    data: Stakeholder[];
    theme: any;
    onSelect: (stakeholder: Stakeholder) => void;
}

const StakeholdersGrid: React.FC<StakeholdersGridProps> = ({ data, theme, onSelect }) => {
    return (
        <div className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((person, idx) => (
                    <div
                        key={idx}
                        onClick={() => onSelect(person)}
                        className={`${theme.cardBg} ${theme.border} border rounded-2xl p-6 ${theme.shadow} flex flex-col items-center text-center hover:border-emerald-500/50 transition-colors cursor-pointer group`}
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-white/10 flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg group-hover:scale-105 transition-transform">
                            {person.avatar}
                        </div>
                        <h3 className={`text-lg font-bold ${theme.text}`}>{person.name}</h3>
                        <p className={`text-sm ${theme.textMuted} mb-6`}>{person.role}</p>

                        <div className="w-full bg-navy-900/50 rounded-xl p-4 border border-white/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-gray-400 font-bold uppercase">Chaos Contribution</span>
                                <span className={`text-xs font-bold ${person.chaosScore > 50 ? 'text-red-500' : 'text-emerald-500'}`}>
                                    {person.chaosScore > 50 ? 'High' : 'Low'}
                                </span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                                <div className={`h-full ${person.chaosScore > 60 ? 'bg-red-500' : person.chaosScore > 30 ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${person.chaosScore}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-500 text-left">{person.requests} Major Change Requests</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StakeholdersGrid;
