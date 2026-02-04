import React from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    CartesianGrid
} from 'recharts';

interface ScopeVelocityChartProps {
    data: any[];
    isDarkMode: boolean;
    theme: any;
}

const ScopeVelocityChart: React.FC<ScopeVelocityChartProps> = ({ data, isDarkMode, theme }) => {
    return (
        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-8 mb-8 ${theme.shadow}`}>
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className={`text-xl font-bold ${theme.text}`}>Scope Velocity</h3>
                    <p className={`${theme.textMuted} text-sm mt-1`}>New Requests vs Resolved Items</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className={`${theme.textMuted} text-sm`}>New Scope</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                        <span className={`${theme.textMuted} text-sm`}>Resolved</span>
                    </div>
                </div>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barGap={8}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#9CA3AF' : '#64748B', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#9CA3AF' : '#64748B', fontSize: 12 }} />
                        <RechartsTooltip
                            cursor={{ fill: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                            contentStyle={{
                                backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E2E8F0',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                            }}
                            itemStyle={{ color: isDarkMode ? '#fff' : '#0F172A' }}
                        />
                        <Bar dataKey="newRequests" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={12} />
                        <Bar dataKey="resolved" fill="#FB923C" radius={[4, 4, 0, 0]} barSize={12} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ScopeVelocityChart;
