import React from 'react';
import { 
  Users, Building2, Landmark, CheckCircle2, 
  AlertCircle, Zap, ChevronRight, Search 
} from 'lucide-react';

const Dashboard = () => {
  // Dữ liệu mẫu dựa trên ảnh image_cef50d.png
  const branchData = [
    { id: 'Q1', name: 'Quận 1', staff: 42, attendance: '100%', salary: '8.2B', status: 'Đã Chốt' },
    { id: 'Q3', name: 'Quận 3', staff: 38, attendance: '100%', salary: '7.5B', status: 'Đã Chốt' },
    { id: 'Q5', name: 'Quận 5', staff: 45, attendance: '100%', salary: '8.8B', status: 'Đã Chốt' },
    { id: 'Q7', name: 'Quận 7', staff: 41, attendance: '85%', salary: '8.0B', status: 'Chờ Chốt' },
    { id: 'Q9', name: 'Quận 9', staff: 39, attendance: '100%', salary: '7.6B', status: 'Đã Chốt' },
    { id: 'BT', name: 'Bình Thạnh', staff: 40, attendance: '100%', salary: '7.8B', status: 'Đã Chốt' },
    { id: 'TB', name: 'Tân Bình', staff: 43, attendance: '100%', salary: '8.4B', status: 'Đã Chốt' },
    { id: 'GV', name: 'Gò Vấp', staff: 36, attendance: '100%', salary: '6.9B', status: 'Đã Chốt' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Hàng Thống Kê (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Tổng Chi Nhánh" value="8" sub="Hoạt động toàn quốc" icon={<Building2 className="text-red-400" />} />
        <StatCard title="Tổng Nhân Viên" value="324" sub="Phân bổ 8 chi nhánh" icon={<Users className="text-blue-400" />} />
        <StatCard title="Tổng Quỹ Lương" value="65.2B" sub="Tháng 01/2025" icon={<Landmark className="text-purple-400" />} />
        <StatCard title="Chốt Lương" value="7/8" sub="87.5% hoàn tất" icon={<CheckCircle2 className="text-emerald-400" />} showCheck />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. Những Việc Cần Xử Lý Ngay */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <h3 className="text-slate-800 font-bold mb-5 flex items-center gap-2">
            <AlertCircle size={20} className="text-red-500" /> Những Việc Cần Xử Lý Ngay
          </h3>
          <div className="space-y-3">
            <UrgentItem icon="⏳" title="12 Đề Xuất Nâng Bậc" desc="Từ chi nhánh gửi lên chờ phê duyệt" color="border-red-500 bg-red-50/50" />
            <UrgentItem icon="📊" title="1 Chi Nhánh Chưa Chốt" desc="Chi nhánh Quận 7 chưa nộp bảng công" color="border-orange-400 bg-orange-50/50" />
            <UrgentItem icon="🔄" title="2 Luân Chuyển Chờ Xử Lý" desc="Cần xác nhận ngày chốt công chuyển" color="border-blue-500 bg-blue-50/50" />
          </div>
        </div>

        {/* 3. Thao Tác Nhanh */}
        <div className="bg-[#fff7ed] p-6 rounded-[2rem] border-l-4 border-red-500 shadow-sm">
          <h3 className="text-slate-800 font-bold mb-5 flex items-center gap-2">
            <Zap size={20} className="text-orange-500" fill="currentColor" /> Thao Tác Nhanh
          </h3>
          <div className="space-y-2">
            <QuickAction label="📋 Quản Lý Ma Trận Lương" />
            <QuickAction label="⚙️ Thiết Lập Công Thức & Tỷ Lệ" />
            <QuickAction label="✅ Phê Duyệt Nâng Bậc (12)" />
            <QuickAction label="💰 Chốt Bảng Lương Toàn Hệ" isPrimary />
          </div>
        </div>
      </div>

      {/* 4. Bảng Tình Trạng Tháng - Cập nhật theo image_cef50d.png */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="text-red-500">📍</span> Tình Trạng Tháng – Tất Cả Chi Nhánh
          </h3>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
             <input type="text" placeholder="Tìm chi nhánh..." className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm outline-none focus:ring-2 ring-indigo-100 w-64" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/50 text-slate-400 font-bold uppercase text-[11px] tracking-widest">
              <tr>
                <th className="px-8 py-4">Chi Nhánh</th>
                <th className="px-8 py-4 text-center">Nhân Viên</th>
                <th className="px-8 py-4 text-center">Chốt Công</th>
                <th className="px-8 py-4 text-right">Quỹ Lương</th>
                <th className="px-8 py-4 text-center">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {branchData.map((branch) => (
                <tr key={branch.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-800 text-base">{branch.name}</td>
                  <td className="px-8 py-5 text-center font-medium text-slate-600">{branch.staff}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${branch.attendance === '100%' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                      {branch.attendance === '100%' ? '✓ 100%' : `⏳ ${branch.attendance}`}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right font-bold text-slate-800 text-base">{branch.salary}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${branch.status === 'Đã Chốt' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                      {branch.status}
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

// --- Các Component hỗ trợ để code sạch hơn ---

const StatCard = ({ title, value, sub, icon, showCheck }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group hover:shadow-md transition-all">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</p>
        <h2 className={`text-3xl font-black mt-2 ${showCheck ? 'text-emerald-500' : 'text-slate-800'}`}>{value}</h2>
        <p className="text-[10px] text-slate-400 mt-1 font-medium">{sub}</p>
      </div>
      <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform">
        {showCheck ? <div className="w-6 h-6 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-500">✓</div> : icon}
      </div>
    </div>
  </div>
);

const UrgentItem = ({ icon, title, desc, color }) => (
  <div className={`p-4 rounded-2xl border-l-4 ${color} flex items-start gap-3 transition-transform hover:translate-x-1 cursor-pointer`}>
    <span className="text-xl mt-0.5">{icon}</span>
    <div>
      <p className="font-bold text-sm text-slate-800">{title}</p>
      <p className="text-[11px] text-slate-500 font-medium">{desc}</p>
    </div>
  </div>
);

const QuickAction = ({ label, isPrimary }) => (
  <button className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${isPrimary ? 'bg-white hover:bg-orange-50 border border-orange-100' : 'bg-white hover:bg-slate-50 border border-transparent hover:border-slate-100'}`}>
    <span className="text-sm font-bold text-slate-700">{label}</span>
    <ChevronRight size={18} className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
  </button>
);

export default Dashboard;