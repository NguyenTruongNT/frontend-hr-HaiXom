import React from 'react';
import { LayoutDashboard, Calendar, CheckCircle2 } from 'lucide-react';

const StepProgress = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Khởi tạo', icon: <LayoutDashboard size={20} /> },
    { id: 2, label: 'Xếp ca làm', icon: <Calendar size={20} /> },
    { id: 3, label: 'Lịch chính thức', icon: <CheckCircle2 size={20} /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {steps.map((step) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        
        return (
          <div 
            key={step.id}
            className={`flex items-center gap-4 p-5 rounded-[1.5rem] border transition-all duration-500 ${
              isActive 
                ? 'bg-white border-indigo-200 shadow-xl shadow-indigo-100/40 translate-y-[-4px]' 
                : isCompleted 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                : 'bg-white border-slate-100 text-slate-400 opacity-50'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-500 ${
              isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-300' : 
              isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {step.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] leading-none mb-1.5 opacity-60">
                Giai đoạn 0{step.id}
              </p>
              <h4 className={`text-sm font-black truncate uppercase ${isActive ? 'text-slate-800' : ''}`}>
                {step.label}
              </h4>
            </div>
            
            {isActive && (
              <div className="ml-auto flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;