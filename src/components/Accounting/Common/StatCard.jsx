import React from 'react';

const StatCard = ({ title, value, unit, icon, colorClass }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
    <div className={`p-3 rounded-lg ${colorClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-800">{value}</span>
        <span className="text-xs text-slate-400 font-normal">{unit}</span>
      </div>
    </div>
  </div>
);

export default StatCard;