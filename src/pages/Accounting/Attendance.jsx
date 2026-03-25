import React, { useState, useEffect } from 'react';
import { FileDown, Calendar, X, Clock, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import axios from 'axios';

// DỮ LIỆU GIẢ LẬP (MOCK DATA)
const MOCK_ATTENDANCE = [
  { id: 'NV001', name: 'Nguyễn Văn A', role: 'Bếp Chính', standard: 26, actual: 25, leave: 1, ot: 2, status: 'Chốt' },
  { id: 'NV002', name: 'Trần Thị B', role: 'Phục Vụ', standard: 26, actual: 24, leave: 2, ot: 0, status: 'Chốt' },
  { id: 'NV003', name: 'Phạm Văn C', role: 'Thu Ngân', standard: 26, actual: 22, leave: 4, ot: 1, status: 'Chờ' },
  { id: 'NV004', name: 'Lê Thị D', role: 'Quản Lý Kho', standard: 26, actual: 26, leave: 0, ot: 5, status: 'Chốt' },
  { id: 'NV005', name: 'Hoàng Văn E', role: 'Bảo Vệ', standard: 26, actual: 23, leave: 3, ot: 0, status: 'Chờ' },
  { id: 'NV006', name: 'Nguyễn Văn A', role: 'Bếp Chính', standard: 26, actual: 25, leave: 1, ot: 2, status: 'Chốt' },
  { id: 'NV007', name: 'Trần Thị B', role: 'Phục Vụ', standard: 26, actual: 24, leave: 2, ot: 0, status: 'Chốt' },
  { id: 'NV008', name: 'Phạm Văn C', role: 'Thu Ngân', standard: 26, actual: 22, leave: 4, ot: 1, status: 'Chờ' },
  { id: 'NV009', name: 'Lê Thị D', role: 'Quản Lý Kho', standard: 26, actual: 26, leave: 0, ot: 5, status: 'Chốt' },
  { id: 'NV010', name: 'Hoàng Văn E', role: 'Bảo Vệ', standard: 26, actual: 23, leave: 3, ot: 0, status: 'Chờ' },
];

const Attendance = () => {
  // KHỞI TẠO LUÔN LÀ MẢNG MOCK ĐỂ TRÁNH LỖI MAP
  const [attendanceData, setAttendanceData] = useState(MOCK_ATTENDANCE);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isFinalized, setIsFinalized] = useState(false);
  const [loading, setLoading] = useState(false);
const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
const [selectedMonth, setSelectedMonth] = useState(`${new Date().getMonth() + 1}-${new Date().getFullYear()}`);
const [showExportSuccess, setShowExportSuccess] = useState(false);

const handleExportExcel = () => {
  // Logic xuất file của bạn ở đây...
  setShowExportSuccess(true);
  
  // Tự động đóng sau 3 giây
  setTimeout(() => {
    setShowExportSuccess(false);
  }, 5000);
};
  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/accounting/attendance');
        
        // KIỂM TRA CHẶN: Chỉ set nếu response.data thực sự là một mảng có dữ liệu
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setAttendanceData(response.data);
        } else {
          // Nếu API trả về mảng rỗng [] hoặc object, dùng Mock
          setAttendanceData(MOCK_ATTENDANCE);
        }
      } catch {
        console.warn("API lỗi, hệ thống tự động sử dụng Mock Data.");
        setAttendanceData(MOCK_ATTENDANCE); // Đảm bảo luôn có mảng để .map
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <div className="space-y-6 pb-10">
      {/* HEADER TRANG */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* BỘ LỌC LỊCH CHỌN THÁNG (Thay thế tiêu đề cũ) */}
{/* BỘ LỌC LỊCH CHỌN THÁNG */}
{/* BỘ LỌC LỊCH TÙY CHỈNH (CUSTOM DROPDOWN) */}
<div className="flex items-center gap-4 relative">
  {/* Icon Calendar */}
  <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100 z-10">
    <Calendar size={24} />
  </div>
  
  <div className="flex flex-col relative">
    <div 
      className="flex items-center gap-2 cursor-pointer group"
      onClick={() => setIsMonthPickerOpen(!isMonthPickerOpen)}
    >
      <h1 className="text-2xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
        Tháng {selectedMonth.split('-')[0].padStart(2, '0')} / {selectedMonth.split('-')[1]}
      </h1>
      <ChevronRight 
        size={22} 
        className={`text-slate-300 mt-1 transition-transform duration-300 ${isMonthPickerOpen ? 'rotate-90 text-indigo-500' : ''}`} 
      />
    </div>
    <p className="text-xs text-slate-400 font-medium italic mt-0.5">
      Dữ liệu lưu trữ 3 tháng gần nhất
    </p>

    {/* Menu danh sách tháng hiện ra khi bấm */}
    {isMonthPickerOpen && (
      <>
        {/* Lớp phủ để bấm ra ngoài thì đóng menu */}
        <div className="fixed inset-0 z-10" onClick={() => setIsMonthPickerOpen(false)}></div>
        
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-50 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
          {[0, 1, 2, 3].map((offset) => {
            const d = new Date();
            d.setMonth(d.getMonth() - offset);
            const m = d.getMonth() + 1;
            const y = d.getFullYear();
            const val = `${m}-${y}`;
            const isSelected = selectedMonth === val;

            return (
              <div
                key={offset}
                onClick={() => {
                  setSelectedMonth(val);
                  setIsMonthPickerOpen(false);
                  // Tự động chốt công nếu chọn tháng cũ
                  setIsFinalized(offset > 0); 
                }}
                className={`px-4 py-3 mx-2 rounded-xl cursor-pointer flex items-center justify-between transition-all ${
                  isSelected 
                  ? 'bg-indigo-50 text-indigo-600 font-bold' 
                  : 'text-slate-600 hover:bg-slate-50 hover:pl-6'
                }`}
              >
                <span className="text-sm">Tháng {m < 10 ? `0${m}` : m} / {y}</span>
                {isSelected && <CheckCircle2 size={16} className="text-indigo-500" />}
              </div>
            );
          })}
        </div>
      </>
    )}
  </div>
</div>

        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border font-bold text-xs ${
            isFinalized ? 'bg-red-50 border-red-100 text-red-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
          }`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${isFinalized ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
            {isFinalized ? 'ĐÃ CHỐT CÔNG' : 'CHƯA CHỐT CÔNG'}
          </div>
          {/* NÚT BẤM XUẤT EXCEL */}
<button 
  onClick={handleExportExcel}
  className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 text-white rounded-xl font-bold text-sm hover:bg-rose-600 active:scale-95 transition-all shadow-lg shadow-rose-100"
>
  <FileDown size={18} /> XUẤT EXCEL
</button>

{/* THÔNG BÁO XUẤT THÀNH CÔNG (TOAST MESSAGE) */}
{/* THÔNG BÁO XUẤT THÀNH CÔNG - GÓC TRÊN BÊN PHẢI */}
{showExportSuccess && (
  <div className="fixed top-6 right-6 z-[100] animate-in fade-in slide-in-from-right-8 duration-300">
    <div className="bg-white text-slate-800 px-5 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-4 border border-slate-50 min-w-[320px]">
      {/* Icon Success với hiệu ứng nền xanh nhẹ */}
      <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-100 flex-shrink-0">
        <CheckCircle2 size={20} className="text-white" />
      </div>
      
      <div className="flex-1">
        <p className="text-sm font-black text-slate-800">Xuất file thành công rồi nhé tình yêu!</p>
        <p className="text-[11px] text-slate-400 font-medium">Bảng công tháng {selectedMonth} đã được lưu vào thư mục Download.</p>
      </div>

      {/* Nút đóng thông báo nhanh */}
      <button 
        onClick={() => setShowExportSuccess(false)}
        className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors text-slate-300 hover:text-slate-500"
      >
        <X size={16} />
      </button>
    </div>
    
    {/* Thanh progress nhỏ chạy phía dưới (Tùy chọn để trông xịn hơn) */}
    <div className="absolute bottom-0 left-4 right-4 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
      <div className="h-full bg-emerald-500 animate-out slide-out-to-left-full duration-[3000ms] ease-linear"></div>
    </div>
  </div>
)}
        </div>
      </div>

      {/* BẢNG DANH SÁCH */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Danh Sách Nhân Viên</h3>
          <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest">
            {attendanceData.length} Nhân viên
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Mã</th>
                <th className="px-6 py-4">Họ Tên</th>
                <th className="px-6 py-4">Chức Vụ</th>
                <th className="px-6 py-4 text-center">Chuẩn</th>
                <th className="px-6 py-4 text-center border-l border-slate-100">Thực Tế</th>
                <th className="px-6 py-4 text-center text-rose-500">Phép</th>
                <th className="px-6 py-4 text-center text-emerald-600">OT (H)</th>
                
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {/* Kiểm tra an toàn trước khi map */}
              {Array.isArray(attendanceData) && attendanceData.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => setSelectedStaff(item)}
                  className="hover:bg-indigo-50/40 cursor-pointer transition-all group"
                >
                  <td className="px-8 py-5 font-bold text-slate-800 text-sm">{item.id}</td>
                  <td className="px-6 py-5 font-bold text-slate-700 text-sm">{item.name}</td>
                  <td className="px-6 py-5 text-slate-400 text-xs font-medium">{item.role}</td>
                  <td className="px-6 py-5 text-center font-bold text-slate-400 italic">{item.standard}</td>
                  <td className="px-6 py-5 text-center font-black text-indigo-600 border-l border-slate-50">{item.actual}</td>
                  <td className="px-6 py-5 text-center font-bold text-rose-400">{item.leave}</td>
                  <td className="px-6 py-5 text-center font-bold text-emerald-500">{item.ot}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL CHI TIẾT NHÂN VIÊN (GIỮ NGUYÊN) */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-[40px] w-full max-w-4xl shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-indigo-100">
                  {selectedStaff.id.slice(-3)}
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-800">{selectedStaff.name}</h4>
                  <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mt-1">{selectedStaff.role} • {selectedStaff.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStaff(null)} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Đi muộn', val: '15p', icon: <Clock size={16}/>, color: 'text-amber-500' },
                  { label: 'Về sớm', val: '0p', icon: <AlertCircle size={16}/>, color: 'text-rose-500' },
                  { label: 'Tăng ca', val: `${selectedStaff.ot}h`, icon: <CheckCircle2 size={16}/>, color: 'text-emerald-500' },
                  { label: 'Tổng công', val: `${selectedStaff.actual} ngày`, icon: <Calendar size={16}/>, color: 'text-indigo-500' },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 hover:border-indigo-200 transition-colors">
                    <div className={`mb-2 ${stat.color}`}>{stat.icon}</div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</p>
                    <p className="text-lg font-black text-slate-800">{stat.val}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h5 className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                  Lịch sử chấm công tháng này
                </h5>
                <div className="border border-slate-100 rounded-3xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase">
                      <tr>
                        <th className="px-6 py-4">Ngày</th>
                        <th className="px-6 py-4">Giờ vào</th>
                        <th className="px-6 py-4">Giờ ra</th>
                        <th className="px-6 py-4">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium">
                      {[23, 24, 25].map(day => (
                        <tr key={day} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 text-slate-600 font-bold">{day}/03/2026</td>
                          <td className="px-6 py-4 text-emerald-600">07:55</td>
                          <td className="px-6 py-4 text-rose-500">17:05</td>
                          <td className="px-6 py-4"><span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase font-bold">Đúng giờ</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 flex justify-end gap-3 rounded-b-[40px]">
              <button onClick={() => setSelectedStaff(null)} className="px-6 py-3 font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase text-xs">Đóng</button>
              <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase">Xuất Phiếu Công</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;