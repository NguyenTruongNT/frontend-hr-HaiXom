import React from "react";
import { X } from "lucide-react";

const StaffAvatar = ({ name, day, shift, info, onRemove, zoomLevel }) => {
  const avatarSize = zoomLevel === 'compact' ? 'w-8 h-8 rounded-lg text-[10px]' : 'w-10 h-10 rounded-xl text-[11px]';
  
  const handleDragStart = (e) => {
    e.dataTransfer.setData("staffName", name);
    e.dataTransfer.setData("sourceDay", day);
    e.dataTransfer.setData("sourceShift", shift);
  };

  return (
    <div 
      draggable 
      onDragStart={handleDragStart}
      className="relative group/avatar cursor-move active:scale-90 transition-transform"
    >
      <div className={`${avatarSize} flex items-center justify-center font-black shadow-sm border transition-all bg-white text-indigo-600 border-slate-200 hover:border-indigo-500 hover:shadow-md`}>
        {name.substring(0, 2)}
      </div>

      {/* Tooltip (Hover hành động hiển thị chi tiết) */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl opacity-0 invisible group-hover/avatar:opacity-100 group-hover/avatar:visible transition-all duration-200 z-[100] pointer-events-none border border-white/10">
        <div className="space-y-1.5">
          <p className="text-[11px] font-black text-indigo-400 uppercase tracking-tighter leading-none">{info?.fullName || name}</p>
          <div className="h-[1px] w-full bg-white/10 my-1.5"></div>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Mã NV: <span className="text-white">{info?.id || "N/A"}</span></p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Vai trò: <span className="text-white">{info?.role || "N/A"}</span></p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Vị trí: <span className="text-white">{info?.position || "N/A"}</span></p>
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
      </div>

      <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-lg p-0.5 opacity-0 group-hover/avatar:opacity-100 transition-all shadow-md hover:scale-110">
        <X size={10} />
      </button>
    </div>
  );
};

export default StaffAvatar;