import React, { useState } from "react";
import {
  Save,
  Send,
  AlertCircle,
  UserPlus,
  X,
  CheckCircle2,
  Download,
  Share2,
  GripVertical,
  Info,
} from "lucide-react";
import FinalScheduleView from "./FinalScheduleView";

const Step5_FinalEdit = () => {
  const [isPublished, setIsPublished] = useState(false);
  const [alert, setAlert] = useState(null);

  // 1. Lịch bận cố định (Dùng để kiểm tra khi kéo thả)
  const busySchedules = {
    An: ["Thứ 2", "CN"],
    Chi: ["Thứ 4"],
    Dũng: ["Thứ 7"],
    Tuấn: ["Thứ 6"],
    Hoa: ["Thứ 3"],
    Nam: ["Thứ 5"],
  };

  // 2. Dữ liệu giả lập nhân sự đầy đủ
  const staffFullInfo = {
    An: { fullName: "Nguyễn Bình An", role: "Trưởng ca", position: "Bếp chính" },
    Bình: { fullName: "Lê Văn Bình", role: "Nhân viên", position: "Phục vụ" },
    Chi: { fullName: "Hoàng Yến Chi", role: "Part-time", position: "Thu ngân" },
    Dũng: { fullName: "Phạm Anh Dũng", role: "Nhân viên", position: "Tiếp thực" },
    Hoa: { fullName: "Trương Quỳnh Hoa", role: "Part-time", position: "Lễ tân" },
    Nam: { fullName: "Nguyễn Hải Nam", role: "Nhân viên", position: "Pha chế" },
    Lan: { fullName: "Đặng Ngọc Lan", role: "Nhân viên", position: "Thu ngân" },
    Huệ: { fullName: "Lý Minh Huệ", role: "Nhân viên", position: "Phục vụ" },
    Linh: { fullName: "Mai Diệu Linh", role: "Part-time", position: "Phục vụ" },
    Hùng: { fullName: "Trần Mạnh Hùng", role: "Nhân viên", position: "Bảo vệ" },
    Khánh: { fullName: "Đỗ Duy Khánh", role: "Nhân viên", position: "Phụ bếp" },
  };

  // 3. Dữ liệu lịch trình 5 ca
  const [schedule, setSchedule] = useState({
    "Thứ 2": { "Ca Sáng": ["An", "Bình"], "Ca Trưa": ["Chi", "Dũng"], "Ca Chiều": ["Hoa", "Nam"], "Ca Tối": ["Bình", "Linh"], "Ca Gãy": ["Tuấn", "Khánh"] },
    "Thứ 3": { "Ca Sáng": ["Lan", "Huệ"], "Ca Trưa": ["Tuấn", "Hùng"], "Ca Chiều": ["An", "Bình"], "Ca Tối": ["Lan", "Hoa"], "Ca Gãy": ["Khánh", "Nam"] },
    "Thứ 4": { "Ca Sáng": ["An", "Bình"], "Ca Trưa": ["Chi", "Dũng"], "Ca Chiều": ["Tuấn", "Lan"], "Ca Tối": ["Bình", "Hùng"], "Ca Gãy": ["Nam"] },
    "Thứ 5": { "Ca Sáng": ["Hùng", "Khánh"], "Ca Trưa": ["Chi", "An"], "Ca Chiều": ["Nam", "Hoa"], "Ca Tối": ["Hoa", "Linh"], "Ca Gãy": ["Dũng", "Hoa"] },
    "Thứ 6": { "Ca Sáng": ["An", "Bình"], "Ca Trưa": ["Dũng", "Tuấn"], "Ca Chiều": ["Chi", "Linh"], "Ca Tối": ["Bình", "Nam"], "Ca Gãy": ["Huệ", "An"] },
    "Thứ 7": { "Ca Sáng": ["An", "Lan"], "Ca Trưa": ["Chi", "Hoa"], "Ca Chiều": ["Lan", "Huệ"], "Ca Tối": ["Tuấn", "Bình"], "Ca Gãy": ["Hùng"] },
    CN: { "Ca Sáng": ["Bình", "Hùng"], "Ca Trưa": ["Dũng", "Lan"], "Ca Chiều": ["Khánh", "Hoa"], "Ca Tối": ["Hoa", "An"], "Ca Gãy": ["Linh", "Tuấn"] },
  });

  const shifts = ["Ca Sáng", "Ca Trưa", "Ca Chiều", "Ca Tối", "Ca Gãy"];
  const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
  const quotaPerShift = 2;

  const handleDragStart = (e, staffName, sourceDay, sourceShift) => {
    e.dataTransfer.setData("staffName", staffName);
    e.dataTransfer.setData("sourceDay", sourceDay);
    e.dataTransfer.setData("sourceShift", sourceShift);
  };

  const handleDrop = (e, targetDay, targetShift) => {
    e.preventDefault();
    const staffName = e.dataTransfer.getData("staffName");
    const sourceDay = e.dataTransfer.getData("sourceDay");
    const sourceShift = e.dataTransfer.getData("sourceShift");

    if (busySchedules[staffName]?.includes(targetDay)) {
      setAlert(`${staffName} có lịch bận cố định vào ${targetDay}. Không thể điều động!`);
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    if (sourceDay === targetDay && sourceShift === targetShift) return;

    setSchedule((prev) => {
      const newSchedule = { ...prev };
      newSchedule[sourceDay][sourceShift] = newSchedule[sourceDay][sourceShift].filter((n) => n !== staffName);
      if (!newSchedule[targetDay][targetShift].includes(staffName)) {
        newSchedule[targetDay][targetShift] = [...newSchedule[targetDay][targetShift], staffName];
      }
      return newSchedule;
    });
  };

  const getStatusStyle = (count) => {
    if (count === 0) return "bg-rose-50/30 border-rose-100";
    if (count < quotaPerShift) return "bg-rose-50/60 border-rose-200";
    return "bg-emerald-50/40 border-emerald-100";
  };

  if (isPublished) return <FinalScheduleView realData={schedule} />;

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-20 px-4">
      {/* Alert Thông báo lỗi */}
      {alert && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[1000] bg-rose-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <AlertCircle size={20} />
          <span className="font-black uppercase text-xs tracking-wider">{alert}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
            <GripVertical size={24} />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase italic">Hiệu chỉnh & Điều động</h3>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">Kéo thả nhân sự • Hover để xem chi tiết</p>
          </div>
        </div>

        <div className="flex gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100 overflow-x-auto max-w-full">
          <Legend label="Thiếu" color="bg-rose-500" />
          <Legend label="Đủ/Thừa" color="bg-emerald-500" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 rounded-xl border border-indigo-100">
            <Info size={12} className="text-indigo-500" />
            <span className="text-[10px] font-black text-indigo-500 uppercase">Có lịch bận</span>
          </div>
        </div>
      </div>

      {/* BẢNG ĐIỀU ĐỘNG */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="w-full border-separate border-spacing-0 table-auto lg:table-fixed">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-6 font-black text-slate-700 text-xs border-b border-slate-100 bg-white sticky left-0 z-20 shadow-[4px_0_10px_rgba(0,0,0,0.02)]">Ca làm việc</th>
                {days.map((day) => (
                  <th key={day} className="p-6 text-center text-[11px] font-black text-slate-600 uppercase border-b border-slate-100 border-l border-slate-100/50 min-w-[150px] lg:min-w-0">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift} className="group">
                  <td className="p-6 font-black text-slate-700 text-xs border-b border-slate-100 bg-white sticky left-0 z-20 shadow-[4px_0_10px_rgba(0,0,0,0.02)]">{shift}</td>
                  {days.map((day) => {
                    const staff = schedule[day]?.[shift] || [];
                    const statusClass = getStatusStyle(staff.length);

                    return (
                      <td key={`${day}-${shift}`} className={`p-3 border-b border-l border-slate-100 transition-colors ${statusClass}`} onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, day, shift)}>
                        <div className="min-h-[120px] flex flex-col gap-3">
                          <div className="flex flex-wrap gap-2">
                            {staff.map((name, idx) => {
                              const info = staffFullInfo[name] || { fullName: name, role: "NV", position: "N/A" };
                              return (
                                <div key={idx} draggable onDragStart={(e) => handleDragStart(e, name, day, shift)} className="group/avatar relative active:scale-90 transition-transform">
                                  {/* Avatar Container */}
                                  <div className={`w-10 h-10 rounded-2xl shadow-sm border flex items-center justify-center text-[11px] font-black cursor-move transition-all ${busySchedules[name]?.includes(day) ? "bg-indigo-600 text-white border-indigo-700" : "bg-white text-indigo-600 border-slate-200 hover:border-indigo-500"}`}>
                                    {name.charAt(0)}
                                    {busySchedules[name]?.includes(day) && (
                                      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-indigo-400 rounded-full border-2 border-white"></div>
                                    )}
                                  </div>

                                  {/* TOOLTIP CHI TIẾT KHI HOVER */}
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 bg-slate-900 text-white rounded-2xl shadow-2xl opacity-0 invisible group-hover/avatar:opacity-100 group-hover/avatar:visible transition-all duration-200 z-[100] pointer-events-none border border-white/10">
                                    <div className="space-y-1">
                                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter leading-none">{info.fullName}</p>
                                      <div className="h-[1px] w-full bg-white/10 my-1"></div>
                                      <p className="text-[9px] text-slate-400 font-bold uppercase">Vai trò: <span className="text-white">{info.role}</span></p>
                                      <p className="text-[9px] text-slate-400 font-bold uppercase">Vị trí: <span className="text-white">{info.position}</span></p>
                                    </div>
                                    {/* Mũi tên tooltip */}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                                  </div>

                                  <button onClick={() => {
                                      const newSched = { ...schedule };
                                      newSched[day][shift] = newSched[day][shift].filter((n) => n !== name);
                                      setSchedule(newSched);
                                    }} className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-lg p-0.5 opacity-0 group-hover/avatar:opacity-100 transition-all shadow-md hover:scale-110"
                                  >
                                    <X size={10} />
                                  </button>
                                </div>
                              );
                            })}
                            <button className="w-10 h-10 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-indigo-500 hover:bg-white hover:text-indigo-500 transition-all">
                              <UserPlus size={16} />
                            </button>
                          </div>

                          {staff.length < quotaPerShift && (
                            <div className="mt-auto flex items-center gap-1 text-[9px] font-black uppercase text-rose-500 italic">
                              <AlertCircle size={10} /> Cần thêm {quotaPerShift - staff.length} NV
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-end gap-4 px-4">
        <button className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-400 rounded-3xl font-black text-xs uppercase tracking-widest hover:border-slate-300 hover:text-slate-600 transition-all">Lưu nháp hồ sơ</button>
        <button onClick={() => setIsPublished(true)} className="px-12 py-5 bg-indigo-600 text-white rounded-3xl font-black text-xs shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
          <Send size={18} /> Chốt & Xuất bản lịch
        </button>
      </div>
    </div>
  );
};

const Legend = ({ label, color }) => (
  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl shadow-sm border border-slate-100">
    <div className={`w-2 h-2 rounded-full ${color}`}></div>
    <span className="text-[10px] font-black text-slate-500 uppercase">{label}</span>
  </div>
);

export default Step5_FinalEdit;