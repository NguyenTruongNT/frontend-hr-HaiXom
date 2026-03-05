import React, { useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';

const Step2_Quota = ({ onNext }) => {
  // Định mức nhân sự chính xác cho 4 ca như bạn yêu cầu
  const [quotas, setQuotas] = useState({
    'Ca Sáng': { 'Chạy bàn': 2, 'Thu ngân': 1, 'Bếp': 1, 'Quản lý ca': 1 },
    'Ca Trưa': { 'Chạy bàn': 3, 'Thu ngân': 1, 'Bếp': 2, 'Quản lý ca': 1 },
    'Ca Chiều': { 'Chạy bàn': 3, 'Thu ngân': 1, 'Bếp': 2, 'Quản lý ca': 1 },
    'Ca Tối': { 'Chạy bàn': 2, 'Thu ngân': 1, 'Bếp': 1, 'Quản lý ca': 1 },
    'Ca Gãy': { 'Chạy bàn': 2, 'Thu ngân': 1, 'Bếp': 1, 'Quản lý ca': 1 },
  });

  const handleInputChange = (shift, pos, value) => {
    const val = parseInt(value) || 0;
    setQuotas(prev => ({
      ...prev,
      [shift]: { ...prev[shift], [pos]: val }
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Thông báo trạng thái tuần - Bước 2 */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-[2rem] p-5 flex items-center gap-4">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
          <Info size={20} />
        </div>
        <div>
           <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">Bước 2: Thiết lập định mức</p>
           <p className="text-sm font-medium text-indigo-900">
            Vui lòng thiết lập <span className="font-black text-indigo-600">số lượng nhân sự tối thiểu</span> cần có cho mỗi vị trí trong từng ca.
          </p>
        </div>
      </div>

      {/* Grid định mức 4 cột - Đúng giao diện bạn yêu cầu */}
      {/* Grid định mức 5 cột - Đã cập nhật theo yêu cầu */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
  {Object.entries(quotas).map(([shift, positions]) => (
    <div key={shift} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 bg-indigo-500 rounded-full"></div>
        <h4 className="font-black text-slate-800 text-[11px] uppercase tracking-wider truncate">
          {shift}
        </h4>
      </div>
      
      <div className="space-y-4">
        {Object.entries(positions).map(([pos, count]) => (
          <div key={pos} className="flex justify-between items-center group">
            <span className="text-[10px] text-slate-500 font-bold group-hover:text-indigo-600 transition-colors truncate pr-1">
              {pos}
            </span>
            <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-100 group-focus-within:border-indigo-200 transition-all">
              <input 
                type="number" 
                value={count}
                onChange={(e) => handleInputChange(shift, pos, e.target.value)}
                className="w-8 bg-transparent text-center text-xs font-black text-slate-700 outline-none"
                min="0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

      {/* Action Button - Đẩy sang Bước 3 */}
      <div className="flex justify-center pt-4">
        <button 
          onClick={() => onNext(quotas)}
          className="group relative flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all active:scale-95 uppercase tracking-widest text-xs"
        >
          Xác nhận định mức & Mở đăng ký
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Step2_Quota;