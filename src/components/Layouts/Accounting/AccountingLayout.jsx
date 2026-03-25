import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AccountingLayout = () => {
  return (
    // h-screen: Cố định toàn bộ khung hình bằng chiều cao trình duyệt
    // overflow-hidden: Ngăn toàn bộ trang web bị cuộn
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* Sidebar: Giữ nguyên vị trí */}
      <Sidebar />

      {/* Vùng bên phải */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header: Giữ cố định ở trên cùng của vùng bên phải */}
        <Header title="Trang chủ" />
        
        {/* Main Content: Đây là vùng DUY NHẤT được phép cuộn */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F8FAFC]">
          <div className="p-8 max-w-[1600px] mx-auto">
             <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default AccountingLayout;