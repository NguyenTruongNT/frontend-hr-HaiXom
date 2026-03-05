import React from 'react';
import { PlusCircle, Calendar, Sparkles } from 'lucide-react';

const Step1_InitPlan = ({ onNext }) => {
  return (
    <div className="bg-white border border-slate-100 p-12 rounded-[2.5rem] shadow-sm text-center animate-in fade-in zoom-in duration-500 relative overflow-hidden">
      {/* Trang trí nhẹ nhàng */}
      <div className="absolute top-0 right-0 p-10 opacity-10 text-indigo-600 rotate-12">
        <Sparkles size={120} />
      </div>

      <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
        <Calendar size={48} />
      </div>
      
      <h2 className="text-2xl font-black text-slate-800 mb-3">Bắt đầu lập lịch tuần mới</h2>
      <p className="text-slate-400 text-sm mb-10 max-w-md mx-auto leading-relaxed">
        Hệ thống sẽ khởi tạo một bản kế hoạch trống cho tuần tiếp theo. 
        Bạn sẽ thiết lập định mức nhân sự ở bước kế tiếp.
      </p>
      
      <button 
        onClick={onNext}
        className="group bg-indigo-600 hover:bg-indigo-700 text-white px-14 py-5 rounded-2xl font-black shadow-xl shadow-indigo-100 flex items-center gap-4 mx-auto transition-all active:scale-95"
      >
        <PlusCircle size={22} className="group-hover:rotate-90 transition-transform duration-300" /> 
        KHỞI TẠO KẾ HOẠCH
      </button>
    </div>
  );
};

export default Step1_InitPlan;