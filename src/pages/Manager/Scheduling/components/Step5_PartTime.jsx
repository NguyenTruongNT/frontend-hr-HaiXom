import React, { useState } from "react";
import { UserPlus, Info } from "lucide-react";
import StaffAvatar from "./StaffAvatar"; // Đảm bảo file này tồn tại cùng thư mục

const Step5_PartTime = ({ data, days, onDrop, onRemove, onAddStaff, staffInfo, zoomLevel }) => {
  const [showDropdown, setShowDropdown] = useState(null);
  const shifts = ["Ca Sáng", "Ca Trưa", "Ca Chiều", "Ca Tối", "Ca Gãy"];
  
  // Lọc danh sách nhân sự Part-time từ 20+ nhân sự giả lập
  const ptStaffList = Object.keys(staffInfo).filter(name => staffInfo[name].role === "Part-time");

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden mb-10">
      <div className="p-6 bg-slate-50/50 border-b flex justify-between items-center">
        <h4 className="font-black text-slate-800 uppercase italic flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow-lg">
            <Info size={16}/>
          </div>
          Xếp ca Part-time (Chia ca chi tiết)
        </h4>
      </div>
      
      <div className="overflow-x-auto lg:overflow-visible">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50/30">
              <th className="p-5 font-black text-slate-700 text-xs border-b sticky left-0 bg-white z-30 w-32 shadow-[4px_0_10px_rgba(0,0,0,0.02)]">Ca làm</th>
              {days.map(day => (
                <th key={day} className="p-5 text-center text-[10px] font-black text-slate-500 uppercase border-b border-l border-slate-100 min-w-[150px]">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shifts.map(shift => (
              <tr key={shift} className="group">
                <td className="p-5 font-black text-slate-700 text-[11px] border-b sticky left-0 bg-white z-30 uppercase shadow-[4px_0_10px_rgba(0,0,0,0.02)]">{shift}</td>
                {days.map(day => {
                  const currentStaff = data[day]?.[shift] || [];
                  return (
                    <td 
  key={`${day}-${shift}`} 
  className={`border-b border-l border-slate-50 p-4 min-h-[130px] transition-colors ${currentStaff.length === 0 ? 'bg-rose-50/10' : 'bg-white hover:bg-slate-50/50'}`}
  onDragOver={(e) => {
    e.preventDefault(); // Bắt buộc phải có để cho phép thả
    e.dataTransfer.dropEffect = "move";
  }}
  onDrop={(e) => onDrop(e, day, shift)} // Gọi hàm xử lý từ file chính
>
  <div className="flex flex-wrap gap-2.5 items-start min-h-[40px]">
    {currentStaff.map(name => (
      <StaffAvatar 
        key={name} 
        name={name} 
        day={day} 
        shift={shift} // Truyền thêm shift để biết vị trí cũ
        info={staffInfo[name]} 
        onRemove={() => onRemove(day, shift, name)} 
        zoomLevel={zoomLevel} 
      />
    ))}
                        
                        {/* Nút thêm & Dropdown chọn nhân sự */}
                        <div className="relative">
                          <button 
                            onClick={() => setShowDropdown(showDropdown === `${day}-${shift}` ? null : `${day}-${shift}`)}
                            className="w-10 h-10 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:border-indigo-400 hover:text-indigo-400 hover:bg-white transition-all shadow-sm"
                          >
                            <UserPlus size={16} />
                          </button>
                          
                          {showDropdown === `${day}-${shift}` && (
                            <>
                              <div className="fixed inset-0 z-[40]" onClick={() => setShowDropdown(null)}></div>
                              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-100 shadow-2xl rounded-2xl z-[50] max-h-64 overflow-y-auto p-2 animate-in fade-in zoom-in-95">
                                <p className="p-2 text-[9px] font-black text-slate-400 uppercase border-b border-slate-50 mb-1">Chọn nhân viên PT</p>
                                {ptStaffList.map(name => (
                                  <button 
                                    key={name}
                                    onClick={() => { onAddStaff(day, shift, name); setShowDropdown(null); }}
                                    className="w-full text-left px-3 py-2.5 hover:bg-indigo-50 rounded-xl text-[11px] font-bold text-slate-600 flex justify-between items-center group transition-colors"
                                  >
                                    <span>{staffInfo[name].fullName}</span>
                                    <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded-md group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors uppercase">{staffInfo[name].position}</span>
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
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
  );
};

export default Step5_PartTime;