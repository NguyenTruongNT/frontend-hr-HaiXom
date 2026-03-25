import React, { useState, useEffect, useCallback } from "react";
import { 
  FileDown, 
  RefreshCcw, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Loader2
} from "lucide-react";

const Payroll = () => {
  // 1. Quản lý logic thời gian
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonthNum = today.getMonth() + 1;
  const currentYearNum = today.getFullYear();

  const prevMonthNum = currentMonthNum === 1 ? 12 : currentMonthNum - 1;
  const prevMonthYear = currentMonthNum === 1 ? currentYearNum - 1 : currentYearNum;

  // Xác định tháng mặc định hiển thị ban đầu (Dựa trên ngày 15)
  const initialMonth = currentDay <= 15 ? 'prev' : 'current';

  // 2. States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth); // 'prev' hoặc 'current'
  const [isCalculating, setIsCalculating] = useState(false);
  const [detailModal, setDetailModal] = useState({ show: false, title: "", list: [], staff: "" });

  // 3. Hàm Fetch Data từ API (Giả định endpoint của bạn)
  const fetchPayrollData = useCallback(async (monthType) => {
    setLoading(true);
    try {
      monthType === 'prev' ? prevMonthNum : currentMonthNum;
      monthType === 'prev' ? prevMonthYear : currentYearNum;
      
      // Thay thế URL này bằng API thật của bạn
      // const response = await fetch(`/api/payroll?month=${targetMonth}&year=${targetYear}`);
      // const result = await response.json();
      // setData(result);

      // Mô phỏng delay mạng khi gọi API
      setTimeout(() => {
        setData(MOCK_DATA_BY_MONTH[monthType]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu lương:", error);
      setLoading(false);
    }
  }, [prevMonthNum, currentMonthNum, prevMonthYear, currentYearNum]);

  // Tự động tải dữ liệu khi đổi tháng
  useEffect(() => {
    fetchPayrollData(selectedMonth);
  }, [selectedMonth, fetchPayrollData]);

  // 4. Các hàm xử lý sự kiện
  const handleAutoCalculate = async () => {
    setIsCalculating(true);
    // Gọi API để thực thi logic tính toán phía backend
    // await api.post('/payroll/calculate', { month: ... });
    
    setTimeout(() => {
      setIsCalculating(false);
      fetchPayrollData(selectedMonth); // Reload lại dữ liệu sau khi tính
      alert("Hệ thống đã cập nhật dữ liệu khớp với thực tế!");
    }, 1500);
  };

  const openDetail = (type, staffName, details) => {
    setDetailModal({
      show: true,
      title: type === 'allowance' ? "Chi tiết Phụ cấp" : "Chi tiết Khấu trừ",
      list: details || [],
      staff: staffName
    });
  };

  // Trạng thái tháng n-1 (Chốt sau ngày 5)
  const isPrevMonthLocked = currentDay > 5;

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          {/* Nút Tháng n-1 */}
          <button 
            onClick={() => setSelectedMonth('prev')}
            className={`flex items-center border rounded-2xl p-1 transition-all shadow-sm ${
              selectedMonth === 'prev' 
              ? 'bg-white border-indigo-500 ring-2 ring-indigo-100 scale-105' 
              : 'bg-slate-100 border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <div className="px-4 py-2 text-sm font-bold text-slate-700">
              Tháng {prevMonthNum}/{prevMonthYear}
            </div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-xl text-[10px] font-black uppercase ${isPrevMonthLocked ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
              {isPrevMonthLocked ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
              {isPrevMonthLocked ? "Đã chốt" : "Đang tạm tính"}
            </div>
          </button>

          {/* Nút Tháng n */}
          <button 
            onClick={() => setSelectedMonth('current')}
            className={`flex items-center border rounded-2xl p-1 transition-all shadow-sm ${
              selectedMonth === 'current' 
              ? 'bg-white border-indigo-500 ring-2 ring-indigo-100 scale-105' 
              : 'bg-slate-100 border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <div className="px-4 py-2 text-sm font-bold text-slate-700">
              Tháng {currentMonthNum}/{currentYearNum}
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-100 text-amber-600 text-[10px] font-black uppercase">
              <Clock size={12}/> Đang tạm tính
            </div>
          </button>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={handleAutoCalculate}
            disabled={isCalculating || loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            {isCalculating ? <Loader2 size={18} className="animate-spin" /> : <RefreshCcw size={18} />}
            {isCalculating ? "Đang xử lý..." : "Tính lương tự động"}
          </button>
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <FileDown size={18} />
            Xuất Excel
          </button>
        </div>
      </div>

      {/* PAYROLL TABLE */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="animate-spin text-indigo-600" size={32} />
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Đang tải dữ liệu...</span>
            </div>
          </div>
        )}

        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
          <h3 className="font-black text-slate-800 italic uppercase text-sm tracking-tight flex items-center gap-2">
            Chi Tiết Tính Lương <ChevronRight size={16} className="text-slate-400"/> 
            <span className="text-indigo-600">
              Tháng {selectedMonth === 'prev' ? `${prevMonthNum}/${prevMonthYear}` : `${currentMonthNum}/${currentYearNum}`}
            </span>
          </h3>
          <span className="text-[10px] bg-slate-100 px-3 py-1 rounded-full text-slate-500 font-bold uppercase italic">
            Mặc định: {currentDay > 15 ? "Tháng hiện tại" : "Tháng trước"}
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-5 w-24">Mã</th>
                <th className="px-6 py-5">Họ Tên</th>
                <th className="px-6 py-5 text-right">Lương Cơ Bản</th>
                <th className="px-6 py-5 text-right">Phụ Cấp</th>
                <th className="px-6 py-5 text-right">Khấu Trừ</th>
                <th className="px-6 py-5 text-right">Thực Lĩnh</th>
                <th className="px-8 py-5 text-center">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.length > 0 ? data.map((item) => {
                const netSalary = item.baseSalary + item.allowances - item.deductions;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-5 font-bold text-slate-800 text-sm">{item.id}</td>
                    <td className="px-6 py-5 font-black text-slate-800 text-sm">{item.name}</td>
                    <td className="px-6 py-5 text-right font-bold text-slate-600">
                      {item.baseSalary.toLocaleString()} đ
                    </td>
                    <td 
                      className="px-6 py-5 text-right font-black text-emerald-600 cursor-pointer hover:underline underline-offset-4"
                      onClick={() => openDetail('allowance', item.name, item.allowanceDetail)}
                    >
                      +{item.allowances.toLocaleString()} đ
                    </td>
                    <td 
                      className="px-6 py-5 text-right font-black text-rose-500 cursor-pointer hover:underline underline-offset-4"
                      onClick={() => openDetail('deduction', item.name, item.deductionDetail)}
                    >
                      -{item.deductions.toLocaleString()} đ
                    </td>
                    <td className="px-6 py-5 text-right font-black text-indigo-700 text-lg italic">
                      {netSalary.toLocaleString()} đ
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase italic ${item.status === 'Hoàn tất' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                )
              }) : (
                <tr>
                  <td colSpan="7" className="px-8 py-20 text-center text-slate-400 font-bold italic">
                    Không có dữ liệu cho tháng này
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL (Giữ nguyên logic cũ) */}
      {detailModal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden border border-white">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h4 className="text-lg font-black text-slate-800 uppercase italic leading-tight">{detailModal.title}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{detailModal.staff}</p>
              </div>
              <button onClick={() => setDetailModal({ ...detailModal, show: false })} className="text-slate-400">✕</button>
            </div>
            <div className="p-6 space-y-3">
              {detailModal.list.map((info, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                  <span className="font-bold text-slate-600 text-sm">{info.type}</span>
                  <span className={`font-black ${detailModal.title.includes('Phụ cấp') ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {detailModal.title.includes('Phụ cấp') ? '+' : '-'}{info.amount.toLocaleString()} đ
                  </span>
                </div>
              ))}
            </div>
            <div className="p-6 bg-slate-50/50 border-t border-slate-100">
              <button onClick={() => setDetailModal({ ...detailModal, show: false })} className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black text-[10px] uppercase">Đóng chi tiết</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Dữ liệu giả lập theo tháng để test logic chuyển đổi
const MOCK_DATA_BY_MONTH = {
  prev: [
    { 
      id: "NV001", name: "Nguyễn Văn A", baseSalary: 8500000, allowances: 1800000, deductions: 1200000, status: "Hoàn tất",
      allowanceDetail: [{ type: "Trách nhiệm", amount: 1800000 }],
      deductionDetail: [{ type: "BHXH", amount: 1200000 }]
    }
  ],
  current: [
    { 
      id: "NV001", name: "Nguyễn Văn A", baseSalary: 8500000, allowances: 500000, deductions: 0, status: "Chờ chốt",
      allowanceDetail: [{ type: "Ăn trưa", amount: 500000 }],
      deductionDetail: []
    },
    { 
      id: "NV002", name: "Trần Thị B", baseSalary: 7200000, allowances: 2100000, deductions: 800000, status: "Chờ chốt",
      allowanceDetail: [{ type: "Doanh thu", amount: 2100000 }],
      deductionDetail: [{ type: "BHXH", amount: 800000 }]
    }
  ]
};

export default Payroll;