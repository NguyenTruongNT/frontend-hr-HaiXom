import React, { useState, useEffect } from 'react';
import { 
  Search, Download, Calendar as CalendarIcon, 
  Fingerprint, ScanFace, Edit3, X, CheckCircle, AlertCircle, Loader2
} from 'lucide-react';
import { createPortal } from "react-dom";
import axios from "axios";
import Echo from "laravel-echo";
import windowPusher from "pusher-js";

const RealtimeAttendance = () => {
  // ================= STATE DỮ LIỆU & LỌC (TỪ CODE 2) =================
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả trạng thái');
  
  const getLocalYYYYMMDD = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const [selectedDate, setSelectedDate] = useState(getLocalYYYYMMDD());

  // ================= STATE UI & NOTIFICATION (TỪ CODE 1) =================
  const [isExporting, setIsExporting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [editForm, setEditForm] = useState({ status: '', note: '' });
  const [showConfirm, setShowConfirm] = useState(false);

  // 1. HÀM GỌI API FETCH DATA (TỪ CODE 2)
  const fetchRealtimeData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://115.146.126.49:8084/api/v1/time-logs/realtime?date=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.data && response.data.data) {
        setAttendanceData(response.data.data);
      } else {
        setAttendanceData([]);
      }
      setLastUpdated(new Date().toLocaleTimeString("vi-VN"));
    } catch (err) {
      console.error("Lỗi API:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. THIẾT LẬP REALTIME & AUTO REFRESH (TỪ CODE 2)
  useEffect(() => {
    fetchRealtimeData();

    window.Pusher = windowPusher;
    const echo = new Echo({
      broadcaster: "pusher",
      key: "89c675856ea8e86af596",
      cluster: "ap1",
      forceTLS: true,
    });

    const channel = echo.channel("attendance-channel");
    channel.listen(".new-scan", (event) => {
      fetchRealtimeData();
      setNotification({ 
        message: "Cập nhật mới!", 
        sub: `Nhân viên ${event.employee_code} vừa quẹt thẻ thành công.` 
      });
    });

    return () => {
      echo.disconnect();
    };
  }, [selectedDate]);

  // Tự đóng thông báo
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // 3. XỬ LÝ EXPORT (UI CODE 1)
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setNotification({ 
        message: "Xuất file thành công!", 
        sub: `Bảng công ngày ${selectedDate} đã được lưu vào thư mục Download.` 
      });
    }, 3000);
  };

  // 4. XỬ LÝ MODAL (UI CODE 1)
  const openEditModal = (row) => {
    setEditingRow(row);
    setEditForm({ 
      status: row.status, 
      note: row.note === '-' ? '' : row.note 
    });
  };

  const isStatusChanged = editingRow && editForm.status !== editingRow.status;
  const isNoteMissing = isStatusChanged && !editForm.note.trim();

  const handleSaveClick = () => {
    if (isNoteMissing) return;
    setShowConfirm(true);
  };

  // 5. LƯU DỮ LIỆU LÊN SERVER (LOGIC CODE 2)
  const confirmSave = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Optimistic UI update (Cập nhật giao diện ngay lập tức)
      setAttendanceData(prev => prev.map(item => 
        item.record_id === editingRow.record_id ? { ...item, status: editForm.status, note: editForm.note || "-" } : item
      ));

      await axios.post(
        "http://115.146.126.49:8084/api/v1/time-logs/exception",
        {
          record_id: editingRow.record_id,
          status: editForm.status,
          note: editForm.note || "-",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotification({ 
        message: "Cập nhật thành công!", 
        sub: `Dữ liệu của ${editingRow.name} đã được lưu vĩnh viễn vào Database.` 
      });
      setEditingRow(null);
      setShowConfirm(false);
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      alert("Đã xảy ra lỗi khi kết nối với server!");
    }
  };

  // 6. LOGIC LỌC (CODE 1 + CODE 2)
  const filteredData = attendanceData.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'Tất cả trạng thái' || 
                        item.status.toUpperCase() === statusFilter.toUpperCase();
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans relative">
      
      {/* NOTIFICATION TOAST (GIỮ NGUYÊN GIAO DIỆN CODE 1) */}
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

      {/* MODAL XỬ LÝ NGOẠI LỆ (GIỮ NGUYÊN GIAO DIỆN CODE 1) */}
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
                <InfoItem label="Bộ phận" value={editingRow.department || editingRow.dept} />
                <InfoItem label="Ca làm việc" value={editingRow.shift} />
                <InfoItem label="Check-in" value={editingRow.check_in || editingRow.in} />
                <InfoItem label="Check-out" value={editingRow.check_out || editingRow.out} />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase">Thay đổi trạng thái</label>
                  <div className="flex gap-2">
                    {['Đúng giờ', 'Đi muộn', 'Nghỉ'].map(st => (
                      <button 
                        key={st}
                        onClick={() => setEditForm({...editForm, status: st})}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all ${editForm.status.toUpperCase() === st ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
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
                    className={`w-full bg-slate-50 border rounded-2xl p-4 text-sm outline-none transition-all focus:ring-2 min-h-[100px] ${isNoteMissing ? 'border-rose-200 shadow-[0_0_0_2px_rgba(244,63,94,0.1)]' : 'border-slate-200 focus:ring-indigo-500'}`}
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

      {/* POPUP XÁC NHẬN CON (GIỮ NGUYÊN GIAO DIỆN CODE 1) */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/20 z-[1000] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-xs w-full text-center border border-slate-100 animate-in zoom-in-95">
            <AlertCircle size={40} className="mx-auto text-amber-500 mb-4" />
            <h4 className="font-black text-slate-800 uppercase text-sm mb-2">Xác nhận cập nhật?</h4>
            <p className="text-xs text-slate-500 mb-6">Dữ liệu chấm công sẽ được thay đổi trên toàn hệ thống.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-3 text-xs font-bold text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">Hủy</button>
              <button onClick={confirmSave} className="flex-1 py-3 text-xs font-black bg-slate-800 text-white rounded-xl shadow-lg hover:bg-slate-900 transition-colors">Xác nhận</button>
            </div>
          </div>
        </div>
      )}

      {/* Header Search & System Status */}
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
            <div className={`w-2 h-2 bg-emerald-500 rounded-full ${loading ? 'animate-bounce' : 'animate-pulse'}`}></div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">
              {loading ? 'Đang cập nhật...' : 'Hệ thống Realtime: Online'}
            </span>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-black text-slate-800 uppercase text-sm tracking-tight">
               Bảng chấm công chi tiết <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
              Cập nhật lúc: {lastUpdated || "--:--"}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 hover:border-indigo-300 transition-colors">
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
              <option value="Tất cả trạng thái">Tất cả trạng thái</option>
              <option value="ĐÚNG GIỜ">Đúng giờ</option>
              <option value="ĐI MUỘN">Đi muộn</option>
              <option value="NGHỈ">Nghỉ</option>
            </select>

            <button 
              onClick={handleExport}
              disabled={isExporting}
              className={`flex items-center gap-2 border px-5 py-2 rounded-xl text-xs font-black transition-all shadow-sm uppercase ${isExporting ? 'bg-slate-100 text-slate-400' : 'bg-slate-800 text-white hover:bg-slate-900'}`}>
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
                <th className="px-6 py-5 text-center">Xử lý</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading && attendanceData.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 size={32} className="animate-spin text-indigo-500" />
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Đang tải dữ liệu từ máy chủ...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-6 py-20 text-center text-xs font-bold text-slate-400 italic">
                    Không tìm thấy dữ liệu chấm công cho ngày này.
                  </td>
                </tr>
              ) : (
                filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 text-[11px] font-bold text-slate-400">{row.id}</td>
                    <td className="px-6 py-4 text-xs font-black text-slate-800">{row.name}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-tighter">{row.department || row.dept}</td>
                    <td className="px-6 py-4 text-xs text-center font-bold text-slate-600 italic">{row.shift}</td>
                    <td className="px-6 py-4 text-xs text-center font-black text-slate-800">{row.check_in || row.in}</td>
                    <td className="px-6 py-4 text-xs text-center font-black text-slate-800">{row.check_out || row.out}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-500">
                        {row.method === "Khuôn mặt" ? <ScanFace size={14} className="text-pink-500" /> : <Fingerprint size={14} className="text-indigo-500" />}
                        {row.method}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider ${
                        row.status.toUpperCase() === "ĐÚNG GIỜ" || row.status === "Có mặt" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                        row.status.toUpperCase() === "ĐI MUỘN" ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-rose-50 text-rose-600 border border-rose-100"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-bold text-slate-400 italic max-w-[150px] truncate" title={row.note}>{row.note}</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => openEditModal(row)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                      >
                        <Edit3 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
    <p className="text-xs font-black text-slate-700">{value || "-"}</p>
  </div>
);

export default RealtimeAttendance;