import React, { useState, useMemo } from "react";
import { Send, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { STAFF_DATA, INITIAL_SCHEDULE } from "./MockData";
import Step5_FullTime from "./Step5_FullTime";
import Step5_PartTime from "./Step5_PartTime";

const Step5_FinalEdit = ({ onPublish }) => {
  // 1. Khai báo các State
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [viewMode, setViewMode] = useState("week");
  const [zoom, setZoom] = useState("normal");
  const [currentDate, setCurrentDate] = useState(new Date("2026-03-27"));

  // 2. Tính toán ngày hiển thị
  const displayDays = useMemo(() => {
    const dates = [];
    let count = viewMode === "day" ? 1 : viewMode === "week" ? 7 : 30;
    for (let i = 0; i < count; i++) {
      const d = new Date(currentDate);
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
  }, [viewMode, currentDate]);

  // 3. Logic điều hướng thời gian
  const handleNavigate = (direction) => {
    const newDate = new Date(currentDate);
    const step = viewMode === "day" ? 1 : viewMode === "week" ? 7 : 30;
    newDate.setDate(newDate.getDate() + direction * step);
    setCurrentDate(newDate);
  };

  // 4. Logic thêm/xóa nhân sự
  const handleAddStaff = (day, shift, name) => {
    setSchedule((prev) => {
      const next = { ...prev };
      if (!next[day]) next[day] = {};
      if (!next[day][shift]) next[day][shift] = [];
      if (!next[day][shift].includes(name)) {
        next[day][shift] = [...next[day][shift], name];
      }
      return next;
    });
  };

  const handleRemove = (day, shift, name) => {
    setSchedule((prev) => {
      const next = { ...prev };
      if (next[day]?.[shift]) {
        next[day][shift] = next[day][shift].filter((n) => n !== name);
      }
      return next;
    });
  };

  // 5. Logic Kéo thả
  const handleDrop = (e, targetDay, targetShift) => {
    e.preventDefault();
    const name = e.dataTransfer.getData("staffName");
    const sourceDay = e.dataTransfer.getData("sourceDay");
    const sourceShift = e.dataTransfer.getData("sourceShift");

    if (sourceDay === targetDay && sourceShift === targetShift) return;

    setSchedule((prev) => {
      const next = { ...prev };
      if (next[sourceDay]?.[sourceShift]) {
        next[sourceDay][sourceShift] = next[sourceDay][sourceShift].filter((n) => n !== name);
      }
      if (!next[targetDay]) next[targetDay] = {};
      if (!next[targetDay][targetShift]) next[targetDay][targetShift] = [];
      if (!next[targetDay][targetShift].includes(name)) {
        next[targetDay][targetShift] = [...next[targetDay][targetShift], name];
      }
      return next;
    });
  };

  // 6. Giao diện hiển thị
  return (
    <div className="max-w-[1600px] mx-auto p-6 space-y-8 bg-slate-50 min-h-screen pb-20 animate-in fade-in duration-500">
      <header className="bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-100 flex justify-between items-center sticky top-4 z-[100]">
        <div className="flex gap-4">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            {["day", "week", "month"].map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                  viewMode === m ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400"
                }`}
              >
                {m === 'day' ? 'Ngày' : m === 'week' ? 'Tuần' : 'Tháng'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 border-l pl-4 border-slate-200">
            <button onClick={() => setZoom("compact")} className={`p-2 rounded-lg ${zoom === "compact" ? "text-indigo-600 bg-indigo-50" : "text-slate-400"}`}>
              <ZoomOut size={20} />
            </button>
            <button onClick={() => setZoom("large")} className={`p-2 rounded-lg ${zoom === "large" ? "text-indigo-600 bg-indigo-50" : "text-slate-400"}`}>
              <ZoomIn size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 bg-slate-50 px-6 py-2 rounded-full border border-slate-100">
          <button onClick={() => handleNavigate(-1)} className="p-1 hover:bg-white rounded-full shadow-sm transition-all text-slate-400 hover:text-indigo-600">
            <ChevronLeft />
          </button>
          <span className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-700">
            {currentDate.toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" })}
          </span>
          <button onClick={() => handleNavigate(1)} className="p-1 hover:bg-white rounded-full shadow-sm transition-all text-slate-400 hover:text-indigo-600">
            <ChevronRight />
          </button>
        </div>

        <button
          onClick={() => onPublish(schedule)} // Truyền dữ liệu schedule lên cha khi bấm xuất bản
          className="px-8 py-4 bg-indigo-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-3 active:scale-95 transition-all hover:bg-indigo-700"
        >
          <Send size={16} /> Xuất bản lịch
        </button>
      </header>

      <div className="space-y-12">
        <Step5_FullTime
          data={schedule}
          days={displayDays}
          onDrop={handleDrop}
          onRemove={handleRemove}
          onAddStaff={handleAddStaff}
          staffInfo={STAFF_DATA}
          zoomLevel={zoom}
        />
        <Step5_PartTime
          data={schedule}
          days={displayDays}
          onDrop={handleDrop}
          onRemove={handleRemove}
          onAddStaff={handleAddStaff}
          staffInfo={STAFF_DATA}
          zoomLevel={zoom}
        />
      </div>
    </div>
  );
};

export default Step5_FinalEdit;