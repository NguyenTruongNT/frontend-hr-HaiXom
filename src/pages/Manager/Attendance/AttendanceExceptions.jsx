import React, { useState } from 'react';
import { Check, X, Clock, MessageSquare, User } from 'lucide-react';

const AttendanceExceptions = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const pendingRequests = [
    { id: "NV001", name: "Nguyễn Văn An", type: "Quên chấm công", date: "16/06", shift: "Ca Sáng", reason: "Máy lỗi, đã báo quản lý" },
    { id: "NV002", name: "Trần Thị Bình", type: "Đi muộn 18 phút", date: "16/06", shift: "Ca Chiều", reason: "Kẹt xe, có hình chụp" },
    { id: "NV004", name: "Phạm Thị Dung", type: "Quên chấm công", date: "15/06", shift: "Ca Sáng", reason: "Quên badge" },
    { id: "NV003", name: "Lê Hoàng Cường", type: "Về sớm 30 phút", date: "15/06", shift: "Ca Tối", reason: "Ốm, xin phép trưởng ca" },
    { id: "NV005", name: "Hoàng Văn Em", type: "Quên chấm công", date: "14/06", shift: "Ca Sáng", reason: "Máy chấm công lỗi" },
  ];

  return (
    <div className="p-10 mt-5 bg-slate-50 min-h-screen font-sans">
      {/* Header & Tabs */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h2 className="font-black text-slate-800 text-sm uppercase tracking-tight">
            Xử lý ngoại lệ chấm công
          </h2>
          <div className="flex gap-6">
            <button 
              onClick={() => setActiveTab('pending')}
              className={`text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'pending' ? 'text-indigo-600' : 'text-slate-400'}`}
            >
              Chờ duyệt <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">5</span>
            </button>
            <button 
              onClick={() => setActiveTab('approved')}
              className={`text-xs font-bold transition-all ${activeTab === 'approved' ? 'text-indigo-600' : 'text-slate-400'}`}
            >
              Đã duyệt
            </button>
            <button 
              onClick={() => setActiveTab('rejected')}
              className={`text-xs font-bold transition-all ${activeTab === 'rejected' ? 'text-indigo-600' : 'text-slate-400'}`}
            >
              Từ chối
            </button>
          </div>
        </div>

        {/* List of Requests */}
        <div className="p-4 space-y-3">
          {pendingRequests.map((req, idx) => (
            <div 
              key={idx} 
              className="group flex items-center justify-between p-5 bg-white rounded-[1.5rem] border border-slate-50 hover:border-indigo-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                  <User size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-slate-800 text-sm">{req.name}</h4>
                    <span className="text-[10px] font-bold text-slate-300 uppercase">{req.id}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] font-bold text-slate-500">{req.type}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-[11px] font-medium text-slate-400">{req.date} • {req.shift}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 italic mt-1 flex items-center gap-1">
                    <MessageSquare size={12} /> "{req.reason}"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition-all active:scale-95">
                  <Check size={16} /> Duyệt
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all active:scale-95">
                  <X size={16} /> Từ chối
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceExceptions;