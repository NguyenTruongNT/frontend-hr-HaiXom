import React, { useState, useEffect } from 'react';
import { 
  Search, Download, Calendar as CalendarIcon, 
  Fingerprint, ScanFace, Edit3, X, CheckCircle, AlertCircle
} from 'lucide-react';

import { createPortal } from "react-dom";

const RealtimeAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([
    { id: "NV001", name: "Nguyễn Văn An", dept: "Bếp", shift: "Sáng", in: "06:04", out: "13:59", method: "Khuôn mặt", status: "Đúng giờ", note: "-" },
    { id: "NV004", name: "Phạm Thị Dung", dept: "Thu ngân", shift: "Chiều", in: "13:51", out: "22:04", method: "Khuôn mặt", status: "Đi muộn", note: "Muộn 5 phút" },
    { id: "NV005", name: "Hoàng Văn Em", dept: "Phục vụ", shift: "Sáng", in: "06:01", out: "14:05", method: "Vân tay", status: "Đúng giờ", note: "-" },
    { id: "NV008", name: "Bùi Thị Hạnh", dept: "Phục vụ", shift: "-", in: "-", out: "-", method: "-", status: "Nghỉ", note: "-" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả trạng thái');
  const [selectedDate, setSelectedDate] = useState('2026-03-26');
  const [isExporting, setIsExporting] = useState(false);
  const [notification, setNotification] = useState(null);

  const [editingRow, setEditingRow] = useState(null);
  const [editForm, setEditForm] = useState({ status: '', note: '' });
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setNotification({ message: "Xuất file thành công rồi nhé tình yêu!", sub: "Bảng công tháng 3-2026 đã được lưu vào thư mục Download." });
    }, 5000);
  };

  const openEditModal = (row) => {
    setEditingRow(row);
    setEditForm({ status: row.status, note: row.note === '-' ? '' : row.note });
  };

  // Logic kiểm tra thay đổi: Bắt buộc ghi chú chỉ khi status thay đổi so với bản gốc
  const isStatusChanged = editingRow && editForm.status !== editingRow.status;
  const isNoteMissing = isStatusChanged && !editForm.note.trim();

  const handleSaveClick = () => {
    if (isNoteMissing) return;
    setShowConfirm(true);
  };

  const confirmSave = () => {
    setAttendanceData(prev => prev.map(item => 
      item.id === editingRow.id ? { ...item, status: editForm.status, note: editForm.note || "-" } : item
    ));
    setNotification({ message: "Cập nhật thành công!", sub: `Trạng thái của ${editingRow.name} đã được thay đổi.` });
    setEditingRow(null);
    setShowConfirm(false);
  };

  const filteredData = attendanceData.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'Tất cả trạng thái' || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans relative">
      
      {/* NOTIFICATION TOAST - GIAO DIỆN THEO ẢNH CỦA BẠN */}
      {notification && (
        <div className="fixed bottom-10 right-10 z-50 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden border border-slate-100 min-w-[380px] animate-in slide-in-from-bottom-5">
          <div className="p-5 flex items-start gap-4">
            <div className="bg-emerald-100 p-2 rounded-full">
              <CheckCircle size={20} className="text-emerald-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-slate-900 font-black text-sm mb-1">{notification.message}</h4>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">{notification.sub}</p>
            </div>
            <button onClick={() => setNotification(null)} className="text-slate-300 hover:text-slate-500 transition-colors">
              <X size={18} />
            </button>
          </div>
          <div className="h-1.5 bg-emerald-500 w-full animate-out fade-out fill-mode-forwards duration-[5000ms]"></div>
        </div>
      )}

      {/* MODAL XỬ LÝ NGOẠI LỆ */}
      {editingRow && createPortal (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-slate-800 p-6 text-white flex justify-between items-center">
              <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
                <Edit3 size={18} className="text-amber-400" /> Thiết lập xử lý ngoại lệ
              </h3>
              <button onClick={() => setEditingRow(null)} className="hover:bg-white/10 p-2 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <InfoItem label="Mã nhân viên" value={editingRow.id} />
                <InfoItem label="Họ tên" value={editingRow.name} />
                <InfoItem label="Bộ phận" value={editingRow.dept} />
                <InfoItem label="Ca làm việc" value={editingRow.shift} />
                <InfoItem label="Check-in" value={editingRow.in} />
                <InfoItem label="Check-out" value={editingRow.out} />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase">Thay đổi trạng thái</label>
                  <div className="flex gap-2">
                    {['Đúng giờ', 'Đi muộn', 'Nghỉ'].map(st => (
                      <button 
                        key={st}
                        onClick={() => setEditForm({...editForm, status: st})}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${editForm.status === st ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase flex justify-between">
                    <span>Ghi chú {isStatusChanged && <span className="text-rose-500">(Bắt buộc)</span>}</span>
                  </label>
                  <textarea 
                    value={editForm.note}
                    onChange={(e) => setEditForm({...editForm, note: e.target.value})}
                    placeholder={isStatusChanged ? "Nhập lý do thay đổi trạng thái..." : "Nhập ghi chú thêm (không bắt buộc)..."}
                    className={`w-full bg-slate-50 border rounded-2xl p-4 text-sm outline-none transition-all focus:ring-2 min-h-[100px] ${isNoteMissing ? 'border-rose-200' : 'border-slate-200 focus:ring-indigo-500'}`}
                  />
                  {isNoteMissing && <p className="text-[10px] text-rose-500 font-bold italic">* Bạn vừa thay đổi trạng thái, vui lòng điền lý do.</p>}
                </div>
              </div>

              <button 
                onClick={handleSaveClick}
                disabled={isNoteMissing}
                className={`w-full font-black py-4 rounded-2xl shadow-xl uppercase text-xs tracking-widest transition-all active:scale-95 ${isNoteMissing ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'}`}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>, document.body
      )}

      {/* POPUP XÁC NHẬN CON */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/20 z-[1000] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-xs w-full text-center border border-slate-100">
            <AlertCircle size={40} className="mx-auto text-amber-500 mb-4" />
            <h4 className="font-black text-slate-800 uppercase text-sm mb-2">Xác nhận cập nhật?</h4>
            <p className="text-xs text-slate-500 mb-6">Dữ liệu chấm công sẽ được thay đổi trên toàn hệ thống.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-3 text-xs font-bold text-slate-400 hover:bg-slate-50 rounded-xl">Hủy</button>
              <button onClick={confirmSave} className="flex-1 py-3 text-xs font-black bg-slate-800 text-white rounded-xl shadow-lg">Xác nhận</button>
            </div>
          </div>
        </div>
      )}

      {/* Header Realtime */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm mã NV, họ tên..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold shadow-sm w-80 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Hệ thống Realtime</span>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-black text-slate-800 uppercase text-sm tracking-tight">
             Bảng chấm công chi tiết <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-xs font-black text-slate-600 outline-none cursor-pointer" 
              />
              <CalendarIcon size={14} className="text-slate-400 ml-2" />
            </div>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-black text-slate-600 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
              <option>Tất cả trạng thái</option>
              <option>Đúng giờ</option>
              <option>Đi muộn</option>
              <option>Nghỉ</option>
            </select>

            <button 
              onClick={handleExport}
              disabled={isExporting}
              className={`flex items-center gap-2 border px-5 py-2 rounded-xl text-xs font-black transition-all shadow-sm uppercase ${isExporting ? 'bg-slate-100 text-slate-400 animate-pulse' : 'bg-slate-800 text-white hover:bg-slate-900'}`}>
              <Download size={14} /> {isExporting ? 'Đang xuất file...' : 'Export Excel'}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] border-b border-slate-50">
                <th className="px-6 py-5 text-left">Mã NV</th>
                <th className="px-6 py-5 text-left">Họ tên</th>
                <th className="px-6 py-5 text-left">Bộ phận</th>
                <th className="px-6 py-5 text-center">Ca</th>
                <th className="px-6 py-5 text-center">Check-in</th>
                <th className="px-6 py-5 text-center">Check-out</th>
                <th className="px-6 py-5 text-center">Phương thức</th>
                <th className="px-6 py-5 text-center">Trạng thái</th>
                <th className="px-6 py-5 text-left">Ghi chú</th>
                <th className="px-6 py-5 text-center">Xử lý ngoại lệ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-400">{row.id}</td>
                  <td className="px-6 py-4 text-xs font-black text-slate-800">{row.name}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-tighter">{row.dept}</td>
                  <td className="px-6 py-4 text-xs text-center font-bold text-slate-600 italic">{row.shift}</td>
                  <td className="px-6 py-4 text-xs text-center font-black text-slate-800">{row.in}</td>
                  <td className="px-6 py-4 text-xs text-center font-black text-slate-800">{row.out}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-500">
                      {row.method === "Khuôn mặt" ? <ScanFace size={14} className="text-pink-500" /> : row.method === "Vân tay" ? <Fingerprint size={14} className="text-indigo-500" /> : <div className="w-3.5 h-3.5 bg-slate-100 rounded-full" />}
                      {row.method}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider ${
                      row.status === "Đúng giờ" || row.status === "Có mặt" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                      row.status === "Đi muộn" ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-rose-50 text-rose-600 border border-rose-100"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold text-slate-400 italic max-w-[150px] truncate">{row.note}</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => openEditModal(row)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                    >
                      <Edit3 size={16} />
                    </button>
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

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">{label}</p>
    <p className="text-xs font-black text-slate-700">{value}</p>
  </div>
);

export default RealtimeAttendance;