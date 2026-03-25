import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar cố định bên trái */}
      <Sidebar />

      {/* Nội dung chính bên phải */}
      <main className="flex-1 ml-64 p-8">
        {/* Thanh Header nhỏ phía trên (Tùy chọn) */}
        

        {/* Nơi hiển thị các trang con như Dashboard, Ma trận lương... */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;