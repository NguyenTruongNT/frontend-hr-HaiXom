import React, { useState, useEffect } from 'react';
import { 
  Save, Trash2, Edit3, Search, 
  FileSpreadsheet, UserCheck, AlertCircle, X, CheckCircle
} from 'lucide-react';

const AttendanceExceptions = () => {
  // --- STATE QUẢN LÝ DỮ LIỆU ---
  const [history, setHistory] = useState([
    { id: "NV001", name: "Nguyễn Văn An", pos: "Bếp chính", type: "Quên chấm công", date: "2026-03-25", shift: "Ca Sáng", reason: "Máy lỗi, đã báo QL", processedAt: "26/03/2026" },
    { id: "NV007", name: "Đặng Minh Quân", pos: "Phục vụ", type: "Chấm công muộn", date: "2026-03-25", shift: "Ca Gãy", reason: "Hỏng xe, có ảnh chụp", processedAt: "26/03/2026" }
  ]);

  // --- STATE QUẢN LÝ FORM & UI ---
  const [formData, setFormData] = useState({ id: '', type: 'Chấm công muộn', date: '', shift: 'Ca Sáng', reason: '' });
  const [isEditing, setIsEditing] = useState(null); // Lưu ID của dòng đang sửa
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null); // { message, type }
  const [showConfirm, setShowConfirm] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Danh sách nhân sự giả lập để chọn
  const staffList = [
    { id: "NV001", name: "Nguyễn Văn An", pos: "Bếp chính" },
    { id: "NV002", name: "Trần Thị Bình", pos: "Phục vụ" },
    { id: "NV007", name: "Đặng Minh Quân", pos: "Phục vụ" },
  ];

  // Tự động tắt thông báo sau 3s
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // --- HÀNH ĐỘNG (ACTIONS) ---
  
  const handleSave = () => {
    if (!formData.id || !formData.date || !formData.reason) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }
    setShowConfirm(true);
  };

  const confirmSave = () => {
    const selectedStaff = staffList.find(s => s.id === formData.id);
    const newEntry = {
      ...selectedStaff,
      ...formData,
      processedAt: new Date().toLocaleDateString('vi-VN')
    };

    if (isEditing) {
      // Cập nhật dòng hiện có
      setHistory(prev => prev.map(item => item.id === isEditing ? newEntry : item));
      setNotification({ message: "Sửa xử lý ngoại lệ thành công!", type: "success" });
    } else {
      // Thêm mới lên đầu bảng
      setHistory(prev => [newEntry, ...prev]);
      setNotification({ message: "Xử lý ngoại lệ thành công!", type: "success" });
    }

    // Reset Form
    setFormData({ id: '', type: 'Chấm công muộn', date: '', shift: 'Ca Sáng', reason: '' });
    setIsEditing(null);
    setShowConfirm(false);
  };

  const handleEdit = (item) => {
    setFormData({ id: item.id, type: item.type, date: item.date, shift: item.shift, reason: item.reason });
    setIsEditing(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bản ghi này?")) {
      setHistory(prev => prev.filter(item => item.id !== id));
      setNotification({ message: "Đã xóa bản ghi thành công!", type: "error" });
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setNotification({ message: "Xuất file PDF thành công!", type: "success" });
    }, 5000);
  };

  // Lọc dữ liệu theo search
  const filteredHistory = history.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#F1F5F9] min-h-screen font-sans space-y-6 relative">
      
      {/* NOTIFICATION TOAST (TOP RIGHT) */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2 shadow-2xl animate-bounce-short ${notification.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'} text-white font-bold`}>
          <CheckCircle size={20} />
          <span>{notification.message}</span>
        </div>
      )}

      {/* CONFIRMATION POPUP */}
      {showConfirm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Xác nhận lưu hệ thống?</h3>
            <p className="text-xs text-slate-500 mt-2 font-medium">Dữ liệu sẽ được gửi về phòng nhân sự và không thể hoàn tác khi đã chốt công.</p>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs uppercase">Hủy</button>
              <button onClick={confirmSave} className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase shadow-lg shadow-indigo-100">Xác nhận</button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: FORM NHẬP NGOẠI LỆ */}
      <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-800 text-white flex items-center gap-2">
          <AlertCircle size={18} className="text-amber-400" />
          <h2 className="text-xs font-black uppercase tracking-widest">
            {isEditing ? `Đang chỉnh sửa bản ghi: ${isEditing}` : 'Thiết lập xử lý ngoại lệ mới'}
          </h2>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-500 uppercase">Nhân viên vi phạm</label>
            <select 
              value={formData.id}
              onChange={(e) => setFormData({...formData, id: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
              <option value="">Chọn NV (Mã - Họ tên - Chức vụ)</option>
              {staffList.map(s => <option key={s.id} value={s.id}>{s.id} - {s.name} - {s.pos}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-500 uppercase">Loại ngoại lệ</label>
            <select 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold transition-all">
              <option>Chấm công muộn</option>
              <option>Chấm công lỗi (Máy hỏng)</option>
              <option>Quên chấm công</option>
              <option>Nghỉ có phép</option>
              <option>Nghỉ không phép</option>
              <option>Xin về sớm</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-500 uppercase">Ngày vi phạm</label>
            <input 
              type="date" 
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-500 uppercase">Ca làm việc</label>
            <select 
              value={formData.shift}
              onChange={(e) => setFormData({...formData, shift: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold transition-all">
              <option>Ca Sáng</option>
              <option>Ca Trưa</option>
              <option>Ca Chiều</option>
              <option>Ca Tối</option>
              <option>Ca Gãy</option>
              <option>Full-time</option>
            </select>
          </div>

          <div className="md:col-span-3 space-y-2">
            <label className="text-[11px] font-black text-slate-500 uppercase flex justify-between">
              Lý do xử lý ngoại lệ <span className="text-rose-500">* Bắt buộc ghi rõ lý do để C3 kiểm soát</span>
            </label>
            <textarea 
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              placeholder="Nhập chi tiết lý do (Ví dụ: Máy vân tay tại CN Q1 không nhận, đã xác nhận trực tiếp)..."
              className="w-full bg-slate-50 border border-rose-100 rounded-xl px-4 py-3 text-sm focus:border-rose-300 outline-none min-h-[80px] transition-all"
            ></textarea>
          </div>

          <div className="flex items-end gap-2">
            <button 
              onClick={handleSave}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3 rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all active:scale-95 uppercase text-xs tracking-widest">
              <Save size={18} /> {isEditing ? 'Lưu thay đổi' : 'Lưu xử lý'}
            </button>
            {isEditing && (
               <button onClick={() => {setIsEditing(null); setFormData({id:'', type:'Chấm công muộn', date:'', shift:'Ca Sáng', reason:''})}} className="p-3 bg-slate-200 rounded-xl text-slate-600"><X size={18}/></button>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: DANH SÁCH ĐÃ XỬ LÝ */}
      <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-wrap justify-between items-center gap-4">
          <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight flex items-center gap-2">
            <UserCheck className="text-indigo-500" size={20} /> Danh sách ngoại lệ đã xử lý
          </h3>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm mã, họ tên..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 w-64 transition-all"
              />
            </div>
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className={`flex items-center gap-2 border px-4 py-2 rounded-xl text-xs font-black transition-all shadow-sm uppercase ${isExporting ? 'bg-slate-100 text-slate-400 border-slate-200 animate-pulse' : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'}`}>
              <FileSpreadsheet size={16} /> {isExporting ? 'Đang xuất PDF...' : 'Xuất Excel tổng hợp'}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Nhân viên</th>
                <th className="px-6 py-4">Loại vi phạm</th>
                <th className="px-6 py-4">Ngày vi phạm</th>
                <th className="px-6 py-4">Ca làm</th>
                <th className="px-6 py-4">Lý do hệ thống</th>
                <th className="px-6 py-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredHistory.length > 0 ? filteredHistory.map((item, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/30 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-800 text-xs">{item.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{item.id} - {item.pos}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-lg bg-rose-50 text-rose-600 text-[10px] font-black uppercase">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500 italic">{item.shift}</td>
                  <td className="px-6 py-4 max-w-[250px]">
                    <p className="text-[11px] text-slate-400 italic line-clamp-2">"{item.reason}"</p>
                    <p className="text-[9px] text-indigo-400 mt-1 font-bold">Ngày xử lý: {item.processedAt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEdit(item)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Sửa">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-slate-400 text-xs font-bold italic">Không tìm thấy dữ liệu phù hợp...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceExceptions;