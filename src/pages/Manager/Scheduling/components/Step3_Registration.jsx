import React, { useState } from 'react';
import { Lock, CheckCircle2, AlertCircle, Calendar, Clock } from 'lucide-react';

const Step3_Registration = ({ onNext }) => {
  const registerProgress = 75;

  // Cấu trúc dữ liệu chuẩn để sau này map với API
  const [config, setConfig] = useState({
    openedAtDate: '2026-03-02',
    openedAtTime: '08:00',
    closedAtDate: '2026-03-04',
    closedAtTime: '22:00',
    isAutoRemind: true // Thêm option tự động nhắc nhở
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  // Hàm này dùng để đóng gói dữ liệu gửi lên server
  const handleProceed = () => {
    const payload = {
      start_registration: `${config.openedAtDate}T${config.openedAtTime}:00`,
      end_registration: `${config.closedAtDate}T${config.closedAtTime}:00`,
      status: 'CLOSED_FOR_MATCHING'
    };
    console.log("Dữ liệu thực tế gửi lên server:", payload);
    onNext(payload);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
      <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Cổng đăng ký đang mở</h3>
            </div>
            <p className="text-sm text-slate-400 font-medium">Nhân viên chi nhánh đang đăng ký nguyện vọng qua App.</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 px-6 py-3 rounded-2xl text-center shadow-sm">
            <p className="text-[10px] font-black text-emerald-600 uppercase">Đã đăng ký</p>
            <p className="text-2xl font-black text-emerald-700">18/24</p>
          </div>
        </div>

        {/* THIẾT LẬP THỜI GIAN ĐĂNG KÝ - CHUẨN DỮ LIỆU THỰC TẾ */}
        <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-[2rem] mb-10">
          <div className="flex items-center justify-between mb-4 px-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Calendar size={14} className="text-indigo-500" /> Cấu hình thời gian
            </h4>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Tự động nhắc nhở</span>
                <input 
                    type="checkbox" 
                    checked={config.isAutoRemind}
                    onChange={(e) => setConfig({...config, isAutoRemind: e.target.checked})}
                    className="w-4 h-4 accent-indigo-600"
                />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mở cổng */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-500 uppercase flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Mở cổng từ
              </label>
              <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm focus-within:border-indigo-300 transition-all">
                <input 
                  type="date" 
                  name="openedAtDate"
                  value={config.openedAtDate}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent px-2 py-1 text-xs font-bold text-slate-700 outline-none"
                />
                <div className="w-px h-6 bg-slate-100 my-auto"></div>
                <input 
                  type="time" 
                  name="openedAtTime"
                  value={config.openedAtTime}
                  onChange={handleInputChange}
                  className="w-20 bg-transparent px-2 py-1 text-xs font-bold text-slate-700 outline-none"
                />
              </div>
            </div>

            {/* Đóng cổng */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-500 uppercase flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div> Hạn chót đóng cổng
              </label>
              <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm focus-within:border-indigo-300 transition-all">
                <input 
                  type="date" 
                  name="closedAtDate"
                  value={config.closedAtDate}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent px-2 py-1 text-xs font-bold text-slate-700 outline-none"
                />
                <div className="w-px h-6 bg-slate-100 my-auto"></div>
                <input 
                  type="time" 
                  name="closedAtTime"
                  value={config.closedAtTime}
                  onChange={handleInputChange}
                  className="w-20 bg-transparent px-2 py-1 text-xs font-bold text-slate-700 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="mb-10 px-1">
          <div className="flex justify-between text-xs font-black mb-3 uppercase tracking-widest text-slate-500">
            <span>Tiến độ nhân viên đăng ký</span>
            <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-lg">{registerProgress}%</span>
          </div>
          <div className="w-full bg-slate-100 h-5 rounded-full overflow-hidden p-1.5 inner-shadow">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full transition-all duration-1000 shadow-sm"
              style={{ width: `${registerProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Thông báo nhắc nhở */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
            <AlertCircle className="text-amber-500 shrink-0" size={18} />
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              Còn 6 nhân viên chưa đăng ký. Hệ thống sẽ gửi thông báo đẩy (Push Notification) cho họ vào lúc {config.closedAtTime} tối nay.
            </p>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-start gap-3">
            <CheckCircle2 className="text-indigo-500 shrink-0" size={18} />
            <p className="text-[11px] text-indigo-800 font-bold leading-relaxed">
              Cổng đăng ký tự động đóng vào ngày {config.closedAtDate}. Quản lý có thể đóng sớm bằng nút bên dưới.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleProceed}
          className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 uppercase tracking-[0.2em] text-xs"
        >
          <Lock size={18} /> Đóng cổng & Chốt dữ liệu đăng ký
        </button>
      </div>
    </div>
  );
};

export default Step3_Registration;