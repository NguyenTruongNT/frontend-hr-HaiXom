// src/pages/Manager/Home/Dashboard.jsx
import React from "react";
import { 
  Users, CalendarDays, ArrowRight, LayoutDashboard, 
  ClipboardCheck, Rss, ShieldAlert, ArrowLeftRight,
  AlertCircle, FileBarChart
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    { label: "Tổng nhân sự", value: "41", icon: <Users size={20} />, color: "bg-indigo-600", detail: "Chi nhánh Quận 7" },
    { label: "Đang làm việc", value: "12/15", icon: <Rss size={20} />, color: "bg-emerald-500", detail: "Cập nhật 1 phút trước" },
    { label: "Ngoại lệ chờ duyệt", value: "05", icon: <ShieldAlert size={20} />, color: "bg-rose-500", detail: "Quên check-in/out" },
  ];

  const shortcuts = [
    { 
      title: "Chấm công Realtime", 
      desc: "Giám sát trực tiếp dữ liệu từ máy chấm công đổ về Server.",
      icon: <Rss className="text-emerald-600" size={24} />,
      link: "/manager/realtime",
      count: "LIVE",
      color: "border-emerald-100"
    },
    { 
      title: "Xử lý ngoại lệ", 
      desc: "Duyệt Manual Override cho nhân viên quên thẻ hoặc lỗi khuôn mặt.",
      icon: <ShieldAlert className="text-rose-600" size={24} />,
      link: "/manager/exceptions",
      count: "5 ca cần xử lý",
      color: "border-rose-100"
    },
    { 
      title: "Trao đổi nhân sự", 
      desc: "Mượn/Cho mượn nhân sự giữa các chi nhánh trong hệ thống.",
      icon: <ArrowLeftRight className="text-indigo-600" size={24} />,
      link: "/manager/transfer",
      count: "Hạch toán riêng",
      color: "border-indigo-100"
    },
    { 
      title: "Xếp ca làm việc", 
      desc: "Phân ca, chốt lịch tuần và điều chỉnh ca gãy linh hoạt.",
      icon: <CalendarDays className="text-amber-600" size={24} />,
      link: "/manager/schedule",
      count: "Tuần tới",
      color: "border-amber-100"
    },
    { 
      title: "Quản lý nhân sự", 
      desc: "Xem hồ sơ, chỉnh sửa thông tin nhân viên tại cơ sở.",
      icon: <Users className="text-blue-600" size={24} />,
      link: "/manager/staff",
      count: "Hồ sơ C2",
      color: "border-blue-100"
    }
    // ,
    // { 
    //   title: "Bảng công tổng hợp", 
    //   desc: "Xem dữ liệu công cuối cùng trước khi đẩy về phòng kế toán.",
    //   icon: <FileBarChart className="text-purple-600" size={24} />,
    //   link: "/manager/reports",
    //   count: "Dữ liệu chốt",
    //   color: "border-purple-100"
    // }
  ];

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen space-y-10 pb-20 font-sans animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Chỉ số nhanh (Stats) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 flex items-center gap-5">
              <div className={`${item.color} p-4 rounded-[1.5rem] text-white shadow-lg`}>
                {item.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                <p className="text-2xl font-black text-slate-800">{item.value}</p>
                <p className="text-[9px] font-bold text-slate-400 mt-1">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chức năng chính (Shortcuts) */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Trung tâm vận hành chi nhánh</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shortcuts.map((card, idx) => (
              <button 
                key={idx}
                className={`group bg-white p-8 rounded-[2.5rem] border ${card.color} shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left relative overflow-hidden`}
              >
                <div className="mb-6 p-4 bg-slate-50 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h4 className="text-xl font-black text-slate-800 mb-2">{card.title}</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6">{card.desc}</p>
                
                <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                  <span className="px-3 py-1 bg-slate-100 text-[10px] font-black text-slate-500 rounded-lg uppercase">
                    {card.count}
                  </span>
                  <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Truy cập <ArrowRight size={16} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Thông báo vận hành quan trọng */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="bg-white/10 p-4 rounded-2xl text-amber-400">
              <AlertCircle size={32} />
            </div>
            <div>
              <h4 className="text-lg font-black uppercase tracking-tight">Cảnh báo dữ liệu chấm công!</h4>
              <p className="text-slate-400 text-sm font-medium">Có 5 trường hợp đi muộn chưa được xác nhận lý do trong ngày hôm nay.</p>
            </div>
          </div>
          <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-colors shrink-0">
            Xử lý ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;