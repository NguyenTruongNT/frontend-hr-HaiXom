// src/pages/Admin/SalaryAllowance.jsx
import React from 'react';

const SalaryAllowance = () => {
  return (
    <div className="bg-[#1e293b] p-8 rounded-2xl shadow-2xl text-slate-300 max-w-4xl mx-auto">
      <h2 className="text-white font-bold mb-6 flex items-center gap-2">
        📄 Khai Báo Phụ Cấp
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Hàng 1 */}
        <select className="bg-[#334155] border-none rounded-lg p-3 text-sm focus:ring-2 ring-indigo-500 outline-none">
          <option>Chọn Nhân Viên</option>
        </select>
        <input type="text" placeholder="Loại Phụ Cấp" className="bg-[#334155] border-none rounded-lg p-3 text-sm" />
        
        {/* Hàng 2 */}
        <textarea placeholder="Mô Tả" className="col-span-2 bg-[#334155] border-none rounded-lg p-3 text-sm h-24 resize-none" />
        
        {/* Hàng 3 */}
        <input type="text" placeholder="Số Tiền (VND)" className="bg-[#334155] border-none rounded-lg p-3 text-sm" />
        <input type="date" className="bg-[#334155] border-none rounded-lg p-3 text-sm text-slate-500" />
        
        <button className="col-span-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all">
          💾 Lưu
        </button>
      </div>
    </div>
  );
};

export default SalaryAllowance;