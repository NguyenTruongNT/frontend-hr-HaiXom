// src/components/Layouts/Admin/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
      <h2 className="font-bold text-slate-800 text-lg uppercase tracking-tight">Hệ thống quản trị C3</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-slate-600 italic">Chào, Nguyễn Văn Huỳnh</span>
        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">H</div>
      </div>
    </header>
  );
};

export default Header; 