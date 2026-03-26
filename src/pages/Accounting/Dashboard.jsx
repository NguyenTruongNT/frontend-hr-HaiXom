import React from 'react';
import { Users, Wallet, AlertCircle, CheckCircle } from 'lucide-react';
import StatCard from '../../components/Accounting/Common/StatCard';

const Dashboard = () => {
  const stats = [
    {
      title: 'Tổng nhân viên',
      value: '45',
      unit: 'người',
      icon: <Users size={22} />,
      colorClass: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Quỹ lương tháng 3',
      value: '350.000.000',
      unit: 'VNĐ',
      icon: <Wallet size={22} />,
      colorClass: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Chưa chốt công',
      value: '05',
      unit: 'nhân viên',
      icon: <AlertCircle size={22} />,
      colorClass: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Trạng thái',
      value: 'Tạm tính',
      unit: '',
      icon: <CheckCircle size={22} />,
      colorClass: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      {/* Hàng StatCards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Khu vực nội dung bên dưới */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-[24px] shadow-sm border border-slate-100 min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800">Biểu đồ biến động quỹ lương</h3>
            <select className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg outline-none">
              <option>6 tháng gần nhất</option>
            </select>
          </div>
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-slate-100 text-slate-300 rounded-3xl">
            [Biểu đồ Chart.js sẽ hiển thị ở đây]
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Việc cần làm ngay</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl border border-red-100/50">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-semibold text-red-700">Kiểm tra 3 nhân viên thiếu vân tay</p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100/50">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <p className="text-sm font-semibold text-indigo-700">Nhập phụ cấp trách nhiệm cho C1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;