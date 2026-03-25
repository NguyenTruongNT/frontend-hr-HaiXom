import React, { useState } from "react";
import {
  Save, Trash2, Edit2, FileText, TrendingUp,
  Upload, AlertTriangle, CheckCircle2, Calendar as CalendarIcon, User,
} from "lucide-react";

const MOCK_STAFF = [
  { id: "NV001", name: "Nguyễn Văn A" },
  { id: "NV002", name: "Trần Thị B" },
  { id: "NV003", name: "Phạm Văn C" },
];

const Deductions = () => {
  const [deductions, setDeductions] = useState([
    { id: 1, staffId: "NV002", staffName: "Trần Thị B", type: "Tạm ứng", amount: 2000000, date: "2026-03-25", note: "Ứng lương đợt 1" },
    { id: 2, staffId: "NV001", staffName: "Nguyễn Văn A", type: "Phạt/Bồi thường", amount: 500000, date: "2026-03-24", note: "Làm hỏng dụng cụ bếp" },
  ]);

  const [formData, setFormData] = useState({
    staffId: "", type: "", description: "", amount: "", date: new Date().toISOString().split("T")[0],
  });
  
  const [modal, setModal] = useState({ show: false, type: "", data: null });
  const [isEditing, setIsEditing] = useState(false);
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const totalDeduction = deductions.reduce((sum, item) => sum + Number(item.amount), 0);

  const handleConfirmAction = () => {
    if (modal.type === "add") {
      const staff = MOCK_STAFF.find((s) => s.id === formData.staffId);
      setDeductions([{ ...formData, id: Date.now(), staffName: staff.name, note: formData.description }, ...deductions]);
    } else if (modal.type === "edit") {
      const updated = deductions.map((item) =>
        item.id === modal.data.id ? { ...modal.data, staffName: MOCK_STAFF.find((s) => s.id === modal.data.staffId).name, note: modal.data.description } : item
      );
      setDeductions(updated);
      setIsEditing(false);
    } else if (modal.type === "delete") {
      setDeductions(deductions.filter((item) => item.id !== modal.data.id));
    }
    setFormData({ staffId: "", type: "", description: "", amount: "", date: new Date().toISOString().split("T")[0] });
    setModal({ show: false, type: "", data: null });
  };

  return (
    <div className="space-y-6 pb-10 bg-slate-50/50 min-h-screen p-4 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KHUNG KHAI BÁO KHẤU TRỪ */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-slate-200">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <div className="p-2 bg-rose-50 rounded-xl text-rose-600 italic">
              <FileText size={22} />
            </div>
            {isEditing ? "CHỈNH SỬA KHẤU TRỪ" : "KHAI BÁO KHẤU TRỪ"}
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DROPDOWN NHÂN VIÊN */}
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 mb-1 block">Nhân Viên</label>
                <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-[18px] flex items-center justify-between cursor-pointer hover:border-rose-300 transition-all min-h-[58px]"
                  onClick={() => setIsStaffOpen(!isStaffOpen)}>
                  {formData.staffId ? (
                    <div>
                      <div className="font-black text-slate-800 text-sm">{MOCK_STAFF.find(s => s.id === formData.staffId)?.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{formData.staffId}</div>
                    </div>
                  ) : <span className="text-sm text-slate-400 font-bold italic">Chọn nhân viên...</span>}
                  <User size={18} className="text-slate-300" />
                </div>
                {isStaffOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsStaffOpen(false)}></div>
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-2 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95">
                      {MOCK_STAFF.map((s) => (
                        <div key={s.id} className="px-4 py-3 mx-2 rounded-xl cursor-pointer hover:bg-slate-50 flex flex-col border-b border-slate-50 last:border-none"
                          onClick={() => { setFormData({ ...formData, staffId: s.id }); setIsStaffOpen(false); }}>
                          <div className="font-black text-slate-800 text-sm">{s.name}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{s.id}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* DROPDOWN LOẠI KHẤU TRỪ */}
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 mb-1 block">Loại Khấu Trừ</label>
                <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-[18px] flex items-center justify-between cursor-pointer hover:border-rose-300 transition-all min-h-[58px]"
                  onClick={() => setIsTypeOpen(!isTypeOpen)}>
                  {formData.type ? (
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      formData.type === "Tạm ứng" ? "bg-blue-100 text-blue-600" : 
                      formData.type === "Điện nước" ? "bg-amber-100 text-amber-600" : 
                      formData.type === "Ký hàng" ? "bg-purple-100 text-purple-600" : "bg-rose-100 text-rose-600"
                    }`}>{formData.type}</span>
                  ) : <span className="text-sm text-slate-400 font-bold italic">Chọn loại khấu trừ...</span>}
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                </div>
                {isTypeOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsTypeOpen(false)}></div>
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-2">
                      {["Tạm ứng", "Điện nước", "Ký hàng", "Phạt/Bồi thường"].map((t) => (
                        <div key={t} className="px-4 py-3 mx-2 rounded-xl cursor-pointer hover:bg-slate-50 flex items-center"
                          onClick={() => { setFormData({ ...formData, type: t }); setIsTypeOpen(false); }}>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                            t === "Tạm ứng" ? "bg-blue-100 text-blue-600" : 
                            t === "Điện nước" ? "bg-amber-100 text-amber-600" : 
                            t === "Ký hàng" ? "bg-purple-100 text-purple-600" : "bg-rose-100 text-rose-600"
                          }`}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <textarea className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold italic outline-none focus:ring-2 focus:ring-rose-500 h-24"
              placeholder="Lý do khấu trừ chi tiết..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-black text-rose-600 uppercase"
                placeholder="Số Tiền Khấu Trừ" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
              
              <div className="relative">
                <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none"
                  value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                <CalendarIcon size={18} className="absolute right-4 top-4 text-slate-300 pointer-events-none" />
              </div>

              <button onClick={() => setModal({ show: true, type: isEditing ? "edit" : "add", data: formData })}
                disabled={!formData.staffId || !formData.amount}
                className={`flex items-center justify-center gap-2 rounded-2xl font-black text-sm shadow-lg transition-all active:scale-95 ${isEditing ? "bg-amber-500 text-white" : "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-rose-100"}`}>
                <Save size={20} /> {isEditing ? "CẬP NHẬT" : "LƯU KHẤU TRỪ"}
              </button>
            </div>
            {isEditing && <p onClick={() => { setIsEditing(false); setFormData({ staffId: "", type: "", description: "", amount: "", date: "" }); }}
                className="text-center text-xs font-bold text-rose-500 cursor-pointer underline mt-2">Hủy chỉnh sửa</p>}
          </div>
        </div>

        {/* TỔNG HỢP KHẤU TRỪ */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4"><TrendingUp size={32} /></div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Tổng Khấu Trừ Tháng</h4>
          <div className="text-4xl font-black text-slate-800">{totalDeduction.toLocaleString()}đ</div>
          <div className="mt-4 px-4 py-1 bg-rose-500 text-white text-[10px] font-black rounded-full uppercase italic">Dữ liệu chi phí</div>
        </div>
      </div>

      {/* BẢNG CHI TIẾT KHẤU TRỪ */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-black text-slate-800 italic uppercase text-sm">Chi Tiết Các Khoản Khấu Trừ</h3>
          <span className="text-[10px] bg-slate-100 px-3 py-1 rounded-full text-slate-500 font-bold uppercase">{deductions.length} bản ghi</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-5 text-center w-20">Mã</th>
                <th className="px-6 py-5">Nhân Viên</th>
                <th className="px-6 py-5 text-center">Loại Khấu Trừ</th>
                <th className="px-6 py-5">Lý Do / Ghi Chú</th>
                <th className="px-6 py-4 text-center w-32">Ngày QĐ</th>
                <th className="px-6 py-5 text-right">Số Tiền</th>
                <th className="px-8 py-5 text-right w-40">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {deductions.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-5 text-center font-bold text-slate-400 text-xs">{item.staffId}</td>
                  <td className="px-6 py-5 font-black text-slate-800 text-sm">{item.staffName}</td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      item.type === "Tạm ứng" ? "bg-blue-100 text-blue-600" : 
                      item.type === "Điện nước" ? "bg-amber-100 text-amber-600" : 
                      item.type === "Ký hàng" ? "bg-purple-100 text-purple-600" : "bg-rose-100 text-rose-600"
                    }`}>{item.type}</span>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-500 font-bold italic max-w-[200px] truncate">{item.note}</td>
                  <td className="px-6 py-5 text-center text-xs font-bold text-slate-400 italic">{item.date}</td>
                  <td className="px-6 py-5 text-right font-black text-rose-600 italic">-{Number(item.amount).toLocaleString()}đ</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setFormData({...item, description: item.note}); setIsEditing(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="p-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm"><Edit2 size={14} /></button>
                      <button onClick={() => setModal({ show: true, type: "delete", data: item })}
                        className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {modal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 animate-in zoom-in">
          <div className="bg-white rounded-[40px] w-full max-w-sm p-10 shadow-2xl text-center border border-white">
            <div className={`mx-auto w-20 h-20 rounded-3xl flex items-center justify-center mb-6 rotate-12 ${modal.type === "delete" ? "bg-rose-100 text-rose-500" : "bg-emerald-100 text-emerald-500"}`}>
              {modal.type === "delete" ? <AlertTriangle size={40} /> : <CheckCircle2 size={40} />}
            </div>
            <h4 className="text-2xl font-black text-slate-800 mb-2 italic uppercase">Xác nhận!</h4>
            <p className="text-sm text-slate-500 mb-10 font-medium px-4">Bạn có chắc chắn muốn <span className="text-rose-600 font-bold">
              {modal.type === "add" ? "thêm mới" : modal.type === "edit" ? "cập nhật" : "xóa bỏ"}</span> bản ghi khấu trừ này không?</p>
            <div className="flex gap-4">
              <button onClick={() => setModal({ show: false, type: "", data: null })} className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600 text-[10px] uppercase tracking-widest">Hủy bỏ</button>
              <button onClick={handleConfirmAction} className={`flex-1 py-4 rounded-2xl font-black text-white text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95 ${modal.type === "delete" ? "bg-rose-500 shadow-rose-200" : "bg-indigo-600 shadow-indigo-200"}`}>Đồng ý</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deductions;