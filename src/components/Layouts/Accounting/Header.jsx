import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import axios from 'axios';

const Header = () => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // DỮ LIỆU GIẢ LẬP BAN ĐẦU
  const [data, setData] = useState({
    employee: {
      full_name: "Trần Kế Toán" 
    }
  });

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get('/api/user-profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        // NẾU API THÀNH CÔNG -> GHI ĐÈ DỮ LIỆU GIẢ LẬP
        if (response.data && response.data.full_name) {
          setData({
            employee: { full_name: response.data.full_name }
          });
        }
      } catch {
        console.warn("Header API lỗi, đang dùng dữ liệu giả lập để test UI.");
        // Không làm gì cả, state 'data' vẫn giữ giá trị "Trần Kế Toán (Mock)"
      }
    };

    fetchHeaderData();
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      'dashboard': 'Trang chủ',
      'attendance': 'Quản lý Chấm công',
      'allowances': 'Phụ cấp & Thưởng',
      'deductions': 'Khấu trừ',
      'payroll': 'Tính toán Lương'
    };
    const key = Object.keys(titles).find(k => path.includes(k));
    return titles[key] || 'Kế toán Chi nhánh';
  };

  return (
    <header className="hidden md:flex bg-white border-b p-4 px-8 justify-between items-center sticky top-0 z-30 h-20">
      <div>
        <h2 className="text-lg font-bold text-slate-800">{getPageTitle()}</h2>
        <p className="text-xs text-slate-400 font-medium italic">Chào mừng trở lại, {data.employee.full_name}!</p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right border-r pr-6 border-slate-100">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            {currentTime.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }).toUpperCase()}
          </p>
          <p className="text-xl font-black text-indigo-600 leading-none mt-1">
            {currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;