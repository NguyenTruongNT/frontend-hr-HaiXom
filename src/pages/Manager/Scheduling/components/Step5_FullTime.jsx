import React, { useState } from "react";
import { UserPlus, X, Info } from "lucide-react";
import StaffAvatar from "./StaffAvatar"; // Component Avatar dùng chung

const Step5_FullTime = ({ data, days, onDrop, onRemove, onAddStaff, staffInfo, zoomLevel }) => {
  const [showDropdown, setShowDropdown] = useState(null);
  const shifts = ["Hành chính"];
  
  // Chỉ lấy danh sách nhân viên Full-time để hiển thị trong Dropdown
  const ftStaffList = Object.keys(staffInfo).filter(name => staffInfo[name].role === "Full-time");

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden mb-10">
      <div className="p-6 bg-slate-50/50 border-b flex justify-between items-center">
        <h4 className="font-black text-slate-800 uppercase italic flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white"><Info size={16}/></div>
          Nhân sự Full-time (Hành chính)
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="p-5 font-black text-slate-700 text-xs border-b sticky left-0 bg-white z-20 w-32">Nhân sự</th>
              {days.map(day => <th key={day} className="p-5 text-center text-[11px] font-black text-slate-600 uppercase border-b border-l min-w-[160px]">{day}</th>)}
            </tr>
          </thead>
          <tbody>
            {shifts.map(shift => (
              <tr key={shift}>
                <td className="p-5 font-black text-slate-700 text-[11px] border-b sticky left-0 bg-white z-20 uppercase shadow-sm">{shift}</td>
                {days.map(day => (
                  <td key={`${day}-${shift}`} className={`border-b border-l p-4 min-h-[120px] bg-emerald-50/20`} onDragOver={(e) => {
    e.preventDefault(); // Bắt buộc phải có để cho phép thả
    e.dataTransfer.dropEffect = "move";
  }}
  onDrop={(e) => onDrop(e, day, shift)}>
                    <div className="flex flex-wrap gap-2 relative">
                      {(data[day]?.[shift] || []).map(name => (
                        <StaffAvatar key={name} name={name} day={day} shift={shift} info={staffInfo[name]} onRemove={() => onRemove(day, shift, name)} zoomLevel={zoomLevel} />
                      ))}
                      
                      {/* Nút thêm nhân sự & Dropdown */}
                      <div className="relative">
                        <button 
                          onClick={() => setShowDropdown(showDropdown === `${day}-${shift}` ? null : `${day}-${shift}`)}
                          className="w-10 h-10 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-all"
                        >
                          <UserPlus size={16} />
                        </button>
                        
                        {showDropdown === `${day}-${shift}` && (
                          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 shadow-2xl rounded-2xl z-[50] max-h-60 overflow-y-auto p-2 animate-in fade-in slide-in-from-top-2">
                            {ftStaffList.map(name => (
                              <button 
                                key={name}
                                onClick={() => { onAddStaff(day, shift, name); setShowDropdown(null); }}
                                className="w-full text-left px-3 py-2 hover:bg-indigo-50 rounded-lg text-[11px] font-bold text-slate-600 flex justify-between items-center group"
                              >
                                {name} <span className="text-[9px] text-slate-300 group-hover:text-indigo-400">{staffInfo[name].position}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Step5_FullTime;