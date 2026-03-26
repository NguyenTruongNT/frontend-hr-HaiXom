import React from 'react';
import { Plus, Download, History } from 'lucide-react';

const PersonnelTransfer = () => {
  const transferHistory = [
    { name: "Đặng Minh Quân", from: "CN Q.1", to: "CN Q.3", time: "17-19/06", days: "3 công", billTo: "CN Q.3", status: "Hoàn thành" },
    { name: "Trần Minh Tú", from: "CN Q.7", to: "CN Q.1", time: "16-18/06", days: "3 công", billTo: "CN Q.1", status: "Đang thực hiện" },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans space-y-6">
      {/* Top Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card: Cho mượn nhân sự */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <span className="text-lg">🏰</span> Cho mượn nhân sự
            </h3>
            <button className="bg-[#22C55E] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-emerald-600 transition-all">
              <Plus size={16} /> Cho mượn
            </button>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-50 shadow-sm">
             <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-xl">👨‍🍳</div>
             <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-sm">Đặng Minh Quân</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Bếp chính → CN Quận 3</p>
                <p className="text-[10px] text-slate-400 italic">17/06 - 19/06 (3 ngày)</p>
             </div>
             <span className="bg-purple-50 text-purple-600 text-[9px] font-bold px-3 py-1 rounded-lg uppercase">Đang cho mượn</span>
          </div>
        </div>

        {/* Card: Mượn nhân sự */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <span className="text-lg">🏰</span> Mượn nhân sự
            </h3>
            <button className="bg-[#2563EB] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-blue-700 transition-all">
              <Plus size={16} /> Yêu cầu mượn
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-50 shadow-sm">
               <div className="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center text-xl">👨‍💼</div>
               <div className="flex-1">
                  <h4 className="font-bold text-slate-800 text-sm">Trần Minh Tú</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Bếp phụ ← CN Quận 7</p>
                  <p className="text-[10px] text-slate-400 italic">16/06 - 18/06 (3 ngày)</p>
               </div>
               <span className="bg-cyan-50 text-cyan-600 text-[9px] font-bold px-3 py-1 rounded-lg uppercase">Đang mượn</span>
            </div>
          </div>
        </div>

      </div>

      {/* History Table Section */}
      <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-sm">Lịch sử luân chuyển / mượn người</h3>
          <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
            <Download size={14} /> Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
              <tr>
                <th className="px-6 py-4">Nhân viên</th>
                <th className="px-6 py-4">Từ CN</th>
                <th className="px-6 py-4">Đến CN</th>
                <th className="px-6 py-4">Thời gian</th>
                <th className="px-6 py-4">Số công</th>
                <th className="px-6 py-4 text-center">Hạch toán</th>
                <th className="px-6 py-4 text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transferHistory.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-all text-xs">
                  <td className="px-6 py-4 font-bold text-slate-700">{row.name}</td>
                  <td className="px-6 py-4 text-slate-500">{row.from}</td>
                  <td className="px-6 py-4 text-slate-500">{row.to}</td>
                  <td className="px-6 py-4 text-slate-500 italic">{row.time}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{row.days}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold ${row.billTo === "CN Q.3" ? "bg-purple-50 text-purple-600" : "bg-cyan-50 text-cyan-600"}`}>
                      Hạch toán {row.billTo}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold ${row.status === "Hoàn thành" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PersonnelTransfer;