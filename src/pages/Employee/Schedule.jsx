import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Calendar as CalendarIcon,
  Loader2,
  Lock,
  CheckCircle2,
} from "lucide-react";
import attendanceApi from "../../api/attendanceApi";
import RegisterShiftModal from "./RegisterShiftModal";
import authApi from "../../api/authApi";



const EmployeeSchedule = () => {
  const [userType, setUserType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFullTimeWarning, setShowFullTimeWarning] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState([]);
  const [registrationConfig, setRegistrationConfig] = useState(null);
  const [employeeId, setEmployeeId] = useState("");

    const fetchRegistrationConfig = async () => {
    try {
      // Tính ngày của tuần tiếp theo
      const nextWeek = new Date(currentWeek);
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      // Format ngày ra chuẩn YYYY-MM-DD
      const year = nextWeek.getFullYear();
      const month = String(nextWeek.getMonth() + 1).padStart(2, '0');
      const day = String(nextWeek.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      // Gọi API lấy dữ liệu cấu hình
      const res = await attendanceApi.getRegistrationConfig(dateStr);
      
      // Lưu vào state để truyền xuống Modal
      setRegistrationConfig(res);
    } catch (error) {
      console.error("Lỗi tải cấu hình đăng ký:", error);
    }
  };
  
  const handleRegistrationSubmit = async (selectedShifts) => {
    try {
      // 👉 Tạo payload chuẩn form bạn yêu cầu
      const payload = { 
        employeeId: employeeId,
        weekRange: registrationConfig?.weekRange || `${weekDays[0].toLocaleDateString('vi-VN')} - ${weekDays[6].toLocaleDateString('vi-VN')}`,
        registrations: selectedShifts 
      };

      // 1. Log ra để kiểm tra trước khi gửi
      console.log("🚀 CHUẨN BỊ GỬI PAYLOAD LÊN BACKEND:");
      console.log(JSON.stringify(payload, null, 2));

      // 2. Gửi API
      await attendanceApi.submitShiftRegistrations(payload);
      
      // 3. Log thành công
      console.log("✅ ĐĂNG KÝ CA THÀNH CÔNG VÀO CSDL!");
      
      // 4. Lấy lại config Modal
      fetchRegistrationConfig(); 
      
      // 5. Cập nhật lại lịch làm việc chính để hiện ca mới đăng ký
      const dateStr = formatDateLocal(currentWeek);
      const response = await attendanceApi.getWeeklySchedule(null, dateStr);
      setScheduleData(Array.isArray(response) ? response : []);

    } catch (error) {
      console.error("❌ Lỗi khi gửi đăng ký:", error);
      throw error;
    }
  };
  
  
  // --- HELPER: Định dạng ngày YYYY-MM-DD theo giờ địa phương (Tránh lỗi múi giờ) ---
  const formatDateLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // --- 1. LẤY THÔNG TIN USER KHI LOAD TRANG ---
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authApi.getMe(); 
        const role = response?.data?.role || 'part';
        // 👉 Lấy mã nhân viên (Tùy thuộc Backend trả về tên trường là gì, ví dụ: employee_code)
        setEmployeeId(response?.data?.employee?.employee_code || "EMP123");
        setUserType(role);
      } catch (error) {
        console.error("Lỗi lấy thông tin user:", error);
        setUserType("part"); 
      }
    };
    fetchUserProfile();
  }, []);

  // --- 2. LẤY LỊCH LÀM VIỆC THEO TUẦN (Sửa lỗi tham số và lệch ngày) ---
  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        // ✅ Sửa: Dùng formatDateLocal để gửi ngày chuẩn YYYY-MM-DD lên Backend
        const dateStr = formatDateLocal(currentWeek);
        
        // ✅ Sửa: Truyền null vào vị trí đầu tiên để URL ra đúng start_date
        const response = await attendanceApi.getWeeklySchedule(null, dateStr);
        
        setScheduleData(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Lỗi lấy lịch làm việc:", error);
        setScheduleData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [currentWeek]);

  // --- 3. LOGIC TÍNH TOÁN (Đã sửa lỗi ReferenceError gây trắng màn hình) ---
  const getDaysInWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    return [...Array(7)].map((_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const weekDays = getDaysInWeek(currentWeek);

  const totalWeeklyHours = useMemo(() => {
    let totalMinutes = 0;
    if (!Array.isArray(scheduleData)) return "0.0";

    scheduleData.forEach((shift) => {
      if (!shift.time) return;
      const segments = shift.time.split("&");
      segments.forEach((seg) => {
        const times = seg.trim().split("-");
        if (times.length === 2) {
          const [start, end] = times.map((t) => t.trim());
          const [startH, startM] = start.split(":").map(Number);
          const [endH, endM] = end.split(":").map(Number);
          let duration = endH * 60 + endM - (startH * 60 + startM);
          if (duration < 0) duration += 24 * 60;
          // ✅ Sửa: Xóa dòng gây lỗi totalWeeklyHours &&...
          totalMinutes += duration;
        }
      });
    });
    return (totalMinutes / 60).toFixed(1);
  }, [scheduleData]);

  const handleRegisterClick = () => {
    if (!userType) return;
    if (userType === "full") {
      setShowFullTimeWarning(true);
      setTimeout(() => setShowFullTimeWarning(false), 3000);
    } else {
      fetchRegistrationConfig();
      setIsModalOpen(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6 pb-24 text-left relative">
      
      {/* WARNING POPUP */}
      {showFullTimeWarning && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-4 max-w-xs text-center border-b-4 border-amber-500">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <Lock size={32} className="text-amber-600" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base font-black text-slate-800 uppercase">Thông báo hệ thống</h4>
              <p className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase">
                Tài khoản <span className="text-amber-600">Full-time</span> không cần đăng ký ca.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Lịch làm việc</h1>
          <p className="text-slate-500 text-sm font-medium">Theo dõi thời gian biểu cá nhân</p>
        </div>

        <button
          onClick={handleRegisterClick}
          disabled={!userType || loading}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all shadow-sm flex items-center gap-2 active:scale-95 border-2
            ${!userType ? "bg-slate-50 border-slate-200 text-slate-300" : "bg-white border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"}`}
        >
          {!userType ? <Loader2 size={16} className="animate-spin" /> : <CalendarIcon size={16} />}
          ĐĂNG KÝ CA TUẦN SAU
        </button>
      </div>

      {/* WEEK NAVIGATION */}
      <div className="flex items-center justify-between bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button onClick={() => { const d = new Date(currentWeek); d.setDate(d.getDate() - 7); setCurrentWeek(d); }} className="p-2 hover:bg-white rounded-lg transition-all"><ChevronLeft size={20} /></button>
          <div className="px-4 text-sm font-black text-slate-700 uppercase">
            {weekDays[0].getDate()}/{weekDays[0].getMonth() + 1} - {weekDays[6].getDate()}/{weekDays[6].getMonth() + 1}
          </div>
          <button onClick={() => { const d = new Date(currentWeek); d.setDate(d.getDate() + 7); setCurrentWeek(d); }} className="p-2 hover:bg-white rounded-lg transition-all"><ChevronRight size={20} /></button>
        </div>
      </div>

      {/* SCHEDULE TABLE */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex items-center justify-center">
            <Loader2 className="animate-spin text-indigo-500" />
          </div>
        )}

        <div className="divide-y divide-slate-50">
          {weekDays.map((day, idx) => {
            // ✅ Sửa: Format ngày Local (YYYY-MM-DD)
            const dateStr = formatDateLocal(day);
            
            // ✅ Sửa: So khớp linh hoạt với cả chuỗi ISO (T00:00:00) từ Backend
            const shifts = scheduleData.filter((s) => {
              const itemDate = s.date.includes('T') ? s.date.split('T')[0] : s.date;
              return itemDate === dateStr;
            });
            
            const isToday = new Date().toDateString() === day.toDateString();

            return (
              <div key={idx} className={`flex flex-col md:flex-row min-h-[100px] transition-colors ${isToday ? "bg-indigo-50/30" : "hover:bg-slate-50/50"}`}>
                <div className="w-full md:w-32 p-4 flex md:flex-col items-center justify-between md:justify-center border-b md:border-b-0 md:border-r border-slate-50 bg-slate-50/30 font-black">
                   <span className={`text-[10px] uppercase ${isToday ? "text-indigo-600" : "text-slate-400"}`}>{day.toLocaleDateString("vi-VN", { weekday: "short" })}</span>
                   <span className={`text-2xl ${isToday ? "text-indigo-600" : "text-slate-700"}`}>{day.getDate()}</span>
                </div>
                <div className="flex-1 p-4">
                  {shifts.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {shifts.map((shift, sIdx) => (
                        <div key={sIdx} className="bg-white border border-slate-100 p-4 rounded-[1.5rem] shadow-sm flex items-start gap-4">
                          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0"><Clock size={20} /></div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-black text-slate-800 uppercase text-sm">{shift.shiftName}</h4>
                              <CheckCircle2 size={14} className="text-emerald-500" />
                            </div>
                            <p className="text-xs font-bold text-indigo-600">{shift.time}</p>
                            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                              <MapPin size={12} className="text-rose-400" /> {shift.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center">
                      <p className="text-xs font-bold text-slate-200 italic uppercase">Nghỉ</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-lg">
          <CalendarIcon className="mb-3 opacity-50" size={24} />
          <p className="text-[10px] font-black uppercase opacity-70">Tổng giờ dự kiến</p>
          <p className="text-2xl font-black">{totalWeeklyHours} Giờ / Tuần</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-[2rem] text-white shadow-lg md:col-span-2 flex items-center">
          <p className="text-sm font-medium text-slate-300">
            {totalWeeklyHours > 0 ? "Vui lòng có mặt đúng giờ để check-in vân tay." : "Hiện chưa có lịch phân công cho tuần này."}
          </p>
        </div>
      </div>

      {/* MODAL ĐĂNG KÝ */}
      {/* MODAL ĐĂNG KÝ */}
      {userType && (
        <RegisterShiftModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userType={userType}
          weekRange={registrationConfig?.weekRange || `${weekDays[0].toLocaleDateString('vi-VN')} - ${weekDays[6].toLocaleDateString('vi-VN')}`}
          
          // 👉 2. THÊM 5 DÒNG NÀY ĐỂ BƠM DỮ LIỆU & HÀM SUBMIT VÀO MODAL
          realShiftTypes={registrationConfig?.realShiftTypes}
          realDays={registrationConfig?.realDays}
          shiftDemands={registrationConfig?.shiftDemands}
          fixedOffShifts={registrationConfig?.fixedOffShifts}
          onSubmit={handleRegistrationSubmit}
        />
      )}
    </div>
  );
};

export default EmployeeSchedule;