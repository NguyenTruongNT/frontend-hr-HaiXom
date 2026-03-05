import React, { useEffect, useState } from 'react';
import { Cpu, CheckCircle, ShieldCheck, Zap, Loader2 } from 'lucide-react';

const Step4_AutoMatch = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const tasks = [
    "Đang quét dữ liệu đăng ký...",
    "Kiểm tra định mức nhân sự ca...",
    "Đối chiếu lịch bận đã duyệt...",
    "Sắp xếp nhân sự Full-time cố định...",
    "Tối ưu hóa các vị trí Part-time...",
    "Hoàn thiện bản nháp lịch làm việc."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= tasks.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [onComplete, tasks.length]);

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-500">
      <div className="relative mb-10">
        <div className="w-28 h-28 bg-white border-4 border-indigo-100 rounded-[2.5rem] flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-100">
          <Cpu size={56} className="animate-pulse" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg">
          <Loader2 className="animate-spin" size={20} />
        </div>
      </div>
      
      <h3 className="text-2xl font-black text-slate-800 mb-2 italic uppercase tracking-tighter">AI Processing</h3>
      <p className="text-sm text-slate-400 font-bold mb-10 tracking-widest uppercase">Hải Xồm AI đang xử lý dữ liệu</p>

      <div className="w-full max-w-sm space-y-3">
        {tasks.map((task, idx) => (
          <div 
            key={idx} 
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500 ${
              idx === currentStep 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' 
                : idx < currentStep 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-600 opacity-60' 
                : 'bg-white border-slate-50 text-slate-300'
            }`}
          >
            {idx < currentStep ? <CheckCircle size={18} /> : <Zap size={18} />}
            <span className="text-xs font-black uppercase tracking-tight">{task}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step4_AutoMatch;