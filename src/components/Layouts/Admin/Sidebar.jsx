import React from 'react';
import { 
  LayoutDashboard, Settings, Table2, Users, Calculator, 
  ChevronRight, Building, UserCircle, Clock, Percent, 
  TrendingUp, FileUser, MoveHorizontal, BarChart, LogOut // Thêm LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Giả định bạn dùng react-router

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xử lý logic xóa token nếu cần
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuGroups = [
    { title: "Trang chủ", items: [{ label: "Dashboard", icon: <LayoutDashboard size={18}/>, path: "/admin" }] },
    { 
      title: "Quản trị hệ thống", 
      items: [
        { label: "Thiết lập chi nhánh", icon: <Building size={18}/> },
        { label: "Chức danh vị trí", icon: <UserCircle size={18}/> },
        { label: "Cấu hình ca làm", icon: <Clock size={18}/> }
      ] 
    },
    { 
      title: "Thang bảng lương", 
      items: [
        { label: "Ma trận lương", icon: <Table2 size={18}/> },
        { label: "Công thức & Tỷ lệ", icon: <Percent size={18}/> },
        { label: "Phê duyệt nâng bậc", icon: <TrendingUp size={18}/>, badge: 12 }
      ] 
    },
    { 
      title: "Quản trị nhân sự", 
      items: [
        { label: "Hồ sơ nhân viên", icon: <FileUser size={18}/> },
        { label: "Luân chuyển Nhân sự", icon: <MoveHorizontal size={18}/>, badge: 2 }
      ] 
    },
    { 
      title: "Tính lương & Báo cáo", 
      items: [
        { label: "Tổng hợp công", icon: <Calculator size={18}/> },
        { label: "Chốt bảng lương", icon: <Settings size={18}/> },
        { label: "Báo cáo Quỹ lương", icon: <BarChart size={18}/> }
      ] 
    }
  ];

  return (
    <aside className="w-64 bg-[#1e293b] h-screen text-slate-300 flex flex-col fixed left-0 top-0 border-r border-slate-700">
      <div className="p-5 border-b border-slate-700 font-bold text-white text-lg italic text-center">
        HẢI XỒM 
      </div>
      
      <nav className="flex-1 overflow-y-auto p-3 custom-scrollbar">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 px-2">
              {group.title}
            </h4>
            {group.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors mb-1 group">
                <div className="flex items-center gap-3">
                  <span className="group-hover:text-white">{item.icon}</span>
                  <span className="text-sm font-medium group-hover:text-white">{item.label}</span>
                </div>
                {item.badge && <span className="bg-red-500 text-[10px] text-white px-1.5 py-0.5 rounded-full">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* Nút Đăng xuất được thêm vào cuối góc dưới cùng */}
      <div className="p-4 border-t border-slate-700 mt-auto">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all font-semibold text-sm group"
        >
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          <span>Đăng xuất hệ thống</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;