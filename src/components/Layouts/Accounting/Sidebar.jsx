import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Clock, Star, BadgePercent, Calculator } from 'lucide-react';
import axios from 'axios';

// 1. Định nghĩa dữ liệu giả lập bên ngoài để đảm bảo nó luôn tồn tại
const MOCK_PROFILE = {
  name: "Trần Kế Toán",
  branch: "CHI NHÁNH THỦY LỢI",
  role_code: "C1"
};

const Sidebar = () => {
  // 2. Khởi tạo state bằng MOCK_PROFILE ngay lập tức
  const [profile, setProfile] = useState(MOCK_PROFILE);

  const menuItems = [
    { name: 'Trang chủ', path: '/accounting/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Chấm công', path: '/accounting/attendance', icon: <Clock size={20} /> },
    { name: 'Phụ cấp & Thưởng', path: '/accounting/allowances', icon: <Star size={20} /> },
    { name: 'Khấu trừ', path: '/accounting/deductions', icon: <BadgePercent size={20} /> },
    { name: 'Tính lương', path: '/accounting/payroll', icon: <Calculator size={20} /> },
  ];

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        // Lấy token từ localStorage (nếu có)
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/user-profile', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        
        // 3. CHỈ CẬP NHẬT khi API có dữ liệu thật
        if (response.data && response.data.full_name) {
          setProfile({
            name: response.data.full_name,
            branch: response.data.branch_name?.toUpperCase() || "CHI NHÁNH THỦY LỢI",
            role_code: "C1"
          });
        }
      } catch{
        // 4. Khi lỗi, không gọi setProfile, state sẽ giữ nguyên MOCK_PROFILE
        console.log("Đang hiển thị Sidebar với dữ liệu giả lập (API chưa kết nối).");
      }
    };

    fetchSidebarData();
  }, []);

  return (
    <aside className="w-64 bg-white border-r border-slate-100 min-h-screen p-4 flex flex-col shadow-sm">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-100 shadow-lg flex-shrink-0">
          <Calculator size={24} />
        </div>
        <div className="overflow-hidden">
          <h1 className="text-lg font-black text-slate-800 leading-none truncate">Hải Xồm HR</h1>
          <p className="text-[10px] text-slate-400 mt-1 font-medium italic">Accounting Panel</p>
        </div>
      </div>

      {/* Profile Box - Đảm bảo hiển thị dữ liệu từ state 'profile' */}
      <div className="bg-indigo-50/50 rounded-2xl p-4 mb-6 flex items-center gap-3 border border-indigo-100/50">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
          {profile.role_code}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-bold text-slate-800 truncate">
            {profile.name}
          </p>
          <p className="text-[9px] text-slate-400 truncate uppercase font-semibold">
            {profile.branch}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                : 'text-slate-500 hover:bg-slate-50'
              }`
            }
          >
            <span>{item.icon}</span>
            <span className="font-semibold text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;