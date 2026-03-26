import React from 'react';
import { 
  Search, Filter, Download, Bell, 
  ChevronDown, Calendar as CalendarIcon, 
  Fingerprint, ScanFace 
} from 'lucide-react';

const RealtimeAttendance = () => {
  const data = [
    { id: "NV001", name: "Nguyễn Văn An", dept: "Bếp", shift: "Sáng", in: "06:04", out: "13:59", method: "Khuôn mặt", status: "Có mặt", note: "-" },
    { id: "NV004", name: "Phạm Thị Dung", dept: "Thu ngân", shift: "Chiều", in: "13:51", out: "22:04", method: "Khuôn mặt", status: "Đi muộn", note: "Muộn 5 phút" },
    { id: "NV005", name: "Hoàng Văn Em", dept: "Phục vụ", shift: "Sáng", in: "06:01", out: "14:05", method: "Vân tay", status: "Có mặt", note: "-" },
    { id: "NV008", name: "Bùi Thị Hạnh", dept: "Phục vụ", shift: "-", in: "-", out: "-", method: "-", status: "Nghỉ", note: "-" },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          
          
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase">Máy chấm công</span>
          </div>
          
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-800">
             Chấm công Realtime <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-slate-600 mr-2">25/03/2026</span>
              <CalendarIcon size={14} className="text-slate-400" />
            </div>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 outline-none">
              <option>Tất cả ca</option>
            </select>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 outline-none">
              <option>Tất cả trạng thái</option>
            </select>
            <button className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100">
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4 text-left">Mã NV</th>
                <th className="px-6 py-4 text-left">Họ tên</th>
                <th className="px-6 py-4 text-left">Bộ phận</th>
                <th className="px-6 py-4 text-center">Ca</th>
                <th className="px-6 py-4 text-center">Check-in</th>
                <th className="px-6 py-4 text-center">Check-out</th>
                <th className="px-6 py-4 text-center">Phương thức</th>
                <th className="px-6 py-4 text-center">Trạng thái</th>
                <th className="px-6 py-4 text-left">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-500">{row.id}</td>
                  <td className="px-6 py-4 text-xs font-black text-slate-800">{row.name}</td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-600">{row.dept}</td>
                  <td className="px-6 py-4 text-xs text-center font-bold text-slate-600">{row.shift}</td>
                  <td className="px-6 py-4 text-xs text-center font-black text-slate-800">{row.in}</td>
                  <td className="px-6 py-4 text-xs text-center font-black text-slate-800">{row.out}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-500">
                      {row.method === "Khuôn mặt" ? <ScanFace size={14} className="text-pink-500" /> : row.method === "Vân tay" ? <Fingerprint size={14} className="text-indigo-500" /> : null}
                      {row.method}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                      row.status === "Có mặt" ? "bg-emerald-50 text-emerald-600" :
                      row.status === "Đi muộn" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-400"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold text-slate-400 italic">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RealtimeAttendance;