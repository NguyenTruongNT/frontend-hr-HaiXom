import React from 'react';
import { LayoutDashboard, Settings, Unlock, Cpu, CheckCircle } from 'lucide-react';

const StepProgress = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Khởi tạo', icon: <LayoutDashboard size={18} /> },
    { id: 2, label: 'Định mức', icon: <Settings size={18} /> },
    { id: 3, label: 'Mở đăng ký', icon: <Unlock size={18} /> },
    { id: 4, label: 'Thuật toán', icon: <Cpu size={18} /> },
    { id: 5, label: 'Chốt lịch', icon: <CheckCircle size={18} /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {steps.map((step) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        
        return (
          <div 
            key={step.id}
            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
              isActive 
                ? 'bg-white border-indigo-200 shadow-md shadow-indigo-100/50 translate-y-[-2px]' 
                : isCompleted 
                ? 'bg-emerald-50/50 border-emerald-100 text-emerald-600'
                : 'bg-white border-slate-100 text-slate-400 opacity-60'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 
              isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {step.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Bước {step.id}</p>
              <p className={`text-xs font-bold truncate ${isActive ? 'text-slate-800' : ''}`}>{step.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;