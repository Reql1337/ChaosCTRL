import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ChaosGaugeProps {
  score: number; // 0 to 100
  label?: string;
  isChaos?: boolean; // if true, higher score = bad (Red/Orange), else higher = good (Green)
}

const ChaosGauge: React.FC<ChaosGaugeProps> = ({ score, label = "Score", isChaos = true }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const getColor = (s: number) => {
    // Chaos logic: High score is BAD (Orange/Red)
    if (isChaos) {
        if (s < 40) return '#10B981'; // Green (Low Chaos)
        if (s < 70) return '#34D399'; // Light Green/Med
        return '#F97316'; // Orange (High Chaos)
    } 
    // Health logic: High score is GOOD
    else {
        if (s < 50) return '#F97316';
        if (s < 80) return '#34D399';
        return '#10B981';
    }
  };

  const activeColor = getColor(score);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full absolute inset-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius="70%"
              outerRadius="100%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              cornerRadius={10}
            >
              <Cell key="cell-0" fill={activeColor} />
              <Cell key="cell-1" fill="rgba(255,255,255,0.05)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-0 text-center mt-2">
        <span className="block text-3xl font-bold font-display text-white">{score}</span>
        <span className="text-[10px] uppercase tracking-wider text-gray-500">{label}</span>
      </div>
    </div>
  );
};

export default ChaosGauge;