import React, { useState } from "react";
import {
  Save,
  Trash2,
  Edit2,
  FileText,
  TrendingUp,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Calendar as CalendarIcon,
  User,
} from "lucide-react";

const MOCK_STAFF = [
  { id: "NV001", name: "Nguyễn Văn A" },
  { id: "NV002", name: "Trần Thị B" },
  { id: "NV003", name: "Phạm Văn C" },
  { id: "NV004", name: "Nguyễn Văn D" },
  { id: "NV005", name: "Trần Thị E" },
  { id: "NV006", name: "Phạm Văn F" },
  { id: "NV007", name: "Nguyễn Văn H" },
  { id: "NV008", name: "Trần Thị K" },
  { id: "NV009", name: "Phạm Văn T" },
];

const Allowances = () => {
  const [allowances, setAllowances] = useState([
    {
      id: 1,
      staffId: "NV002",
      staffName: "Trần Thị B",
      type: "Doanh Thu",
      amount: 1500000,
      date: "2026-03-25",
      note: "Order vượt 120tr",
    },
    {
      id: 2,
      staffId: "NV001",
      staffName: "Nguyễn Văn A",
      type: "Trách Nhiệm",
      amount: 800000,
      date: "2026-03-24",
      note: "Bếp Trưởng",
    },
  ]);

  const [formData, setFormData] = useState({
    staffId: "",
    type: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [modal, setModal] = useState({ show: false, type: "", data: null });
  const [isEditing, setIsEditing] = useState(false);

  const totalAmount = allowances.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const handleConfirmAction = () => {
    if (modal.type === "add") {
      const staff = MOCK_STAFF.find((s) => s.id === formData.staffId);
      setAllowances([
        { ...formData, id: Date.now(), staffName: staff.name, note: formData.description },
        ...allowances,
      ]);
      setFormData({
        staffId: "",
        type: "",
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
      });
    } else if (modal.type === "edit") {
      const updated = allowances.map((item) =>
        item.id === modal.data.id
          ? {
              ...modal.data,
              staffName: MOCK_STAFF.find((s) => s.id === modal.data.staffId)
                .name, note: modal.data.description
            }
          : item,
      );
      setAllowances(updated);
      setIsEditing(false);
      setFormData({
        staffId: "",
        type: "",
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
      });
    } else if (modal.type === "delete") {
      setAllowances(allowances.filter((item) => item.id !== modal.data.id));
    }
    setModal({ show: false, type: "", data: null });
  };

  return (
    <div className="space-y-6 pb-10 bg-slate-50/50 min-h-screen p-4 animate-in fade-in duration-500">
      {/* SECTION 1: KHAI BÁO & TỔNG HỢP (Layout theo yêu cầu) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KHUNG KHAI BÁO (Tông màu sáng) */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-slate-200">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
              <FileText size={22} />
            </div>
            {isEditing ? "CHỈNH SỬA PHỤ CẤP" : "KHAI BÁO PHỤ CẤP"}
          </h3>

          <div className="space-y-4">
            {/* Dòng 1: Chọn NV & Loại */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CUSTOM DROPDOWN CHỌN NHÂN VIÊN */}
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 mb-1 block">
                  Nhân Viên
                </label>
                <div
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-[18px] flex items-center justify-between cursor-pointer hover:border-indigo-300 transition-all min-h-[58px]"
                  onClick={() => setIsStaffOpen(!isStaffOpen)}
                >
                  {formData.staffId ? (
                    <div>
                      <div className="font-black text-slate-800 text-sm">
                        {
                          MOCK_STAFF.find((s) => s.id === formData.staffId)
                            ?.name
                        }
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        {formData.staffId}
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400 font-bold italic">
                      Chọn nhân viên...
                    </span>
                  )}
                  <User size={18} className="text-slate-300" />
                </div>

                {isStaffOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsStaffOpen(false)}
                    ></div>
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-2 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                      {MOCK_STAFF.map((s) => (
                        <div
                          key={s.id}
                          className="px-4 py-3 mx-2 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors flex flex-col border-b border-slate-50 last:border-none"
                          onClick={() => {
                            setFormData({ ...formData, staffId: s.id });
                            setIsStaffOpen(false);
                          }}
                        >
                          <div className="font-black text-slate-800 text-sm">
                            {s.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                            {s.id}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* CUSTOM DROPDOWN LOẠI PHỤ CẤP */}
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 mb-1 block">
                  Loại Phụ Cấp
                </label>
                <div
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-[18px] flex items-center justify-between cursor-pointer hover:border-indigo-300 transition-all min-h-[58px]"
                  onClick={() => setIsTypeOpen(!isTypeOpen)}
                >
                  {formData.type ? (
                    /* Hiển thị Label khi đã chọn */
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        formData.type === "Doanh thu"
                          ? "bg-purple-100 text-purple-600"
                          : formData.type === "Trách nhiệm"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {formData.type}
                    </span>
                  ) : (
                    /* Hiển thị Placeholder khi chưa chọn */
                    <span className="text-sm text-slate-400 font-bold italic">
                      Chọn loại phụ cấp...
                    </span>
                  )}

                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                </div>

                {isTypeOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsTypeOpen(false)}
                    ></div>
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                      {["Doanh thu", "Trách nhiệm", "Làm thêm ngày"].map(
                        (type) => (
                          <div
                            key={type}
                            className="px-4 py-3 mx-2 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors flex items-center"
                            onClick={() => {
                              setFormData({ ...formData, type });
                              setIsTypeOpen(false);
                            }}
                          >
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase  ${
                                type === "Doanh thu"
                                  ? "bg-purple-100 text-purple-600"
                                  : type === "Trách nhiệm"
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {type}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Dòng 2: Mô tả */}
            <textarea
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium h-24 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-400 font-bold italic"
              placeholder="Mô tả chi tiết..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            {/* Dòng 3: Số tiền, Ngày & Nút Lưu */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-black text-emerald-600"
                placeholder="Số Tiền (VND)"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />

              <div className="relative">
                <input
                  type="date"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
                <CalendarIcon
                  size={18}
                  className="absolute right-4 top-4 text-slate-300 pointer-events-none"
                />
              </div>

              <button
                onClick={() =>
                  setModal({
                    show: true,
                    type: isEditing ? "edit" : "add",
                    data: formData,
                  })
                }
                disabled={!formData.staffId || !formData.amount}
                className={`flex items-center justify-center gap-2 rounded-2xl font-black text-sm shadow-lg transition-all active:scale-95 ${isEditing ? "bg-amber-500 text-white" : "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-orange-100"}`}
              >
                <Save size={20} /> {isEditing ? "CẬP NHẬT" : "LƯU LẠI"}
              </button>
            </div>
            {isEditing && (
              <p
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    staffId: "",
                    type: "Doanh thu",
                    description: "",
                    amount: "",
                    date: "",
                  });
                }}
                className="text-center text-xs font-bold text-rose-500 cursor-pointer underline mt-2"
              >
                Hủy chế độ chỉnh sửa
              </p>
            )}
          </div>
        </div>

        {/* TỔNG HỢP (Cân đối lại) */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
            <TrendingUp size={32} />
          </div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
            Tổng Phụ Cấp Tháng
          </h4>
          <div className="text-4xl font-black text-slate-800">
            {totalAmount.toLocaleString()}đ
          </div>
          <div className="mt-4 px-4 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-full uppercase tracking-tighter italic">
            Dữ liệu trực tuyến
          </div>
        </div>
      </div>

      {/* SECTION 2: BẢNG CHI TIẾT (Diện tích lớn) */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-black text-slate-800 italic uppercase text-sm tracking-tight">
            Chi Tiết Phụ Cấp & Thưởng
          </h3>
          <span className="text-[10px] bg-slate-100 px-3 py-1 rounded-full text-slate-500 font-bold uppercase">
            {allowances.length} nhân viên
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-5 text-center w-20">Mã</th>
                <th className="px-6 py-5">Nhân Viên</th>
                <th className="px-6 py-5">Loại Phụ Cấp</th>
                <th className="px-6 py-4 text-center w-32">Ngày QĐ</th>
                <th className="px-6 py-5 text-right">Số Tiền</th>
                <th className="px-6 py-5">Lý Do / Ghi Chú</th>
                <th className="px-6 py-5 text-center">Minh Chứng</th>
                <th className="px-8 py-5 text-right w-40">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {allowances.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/30 transition-colors group"
                >
                  <td className="px-8 py-5 text-center font-bold text-slate-400 text-xs">
                    {item.staffId}
                  </td>
                  <td className="px-6 py-5 font-black text-slate-800 text-sm">
                    {item.staffName}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      item.type === 'Doanh Thu' ? 'bg-purple-100 text-purple-600' : 
                      item.type === 'Trách Nhiệm' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center text-xs font-bold text-slate-400 italic">
                    {item.date}
                  </td>
                  <td className="px-6 py-5 text-right font-black text-emerald-600 italic">
                    {Number(item.amount).toLocaleString()}đ
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-500 font-bold italic max-w-[200px] truncate">{item.note}</td>
                  <td className="px-6 py-5 text-center">
                    <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                      <Upload size={16} />
                    </button>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setFormData(item);
                          setIsEditing(true);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="p-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() =>
                          setModal({ show: true, type: "delete", data: item })
                        }
                        className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIRM MODAL (Sử dụng cho cả Thêm, Sửa, Xóa) */}
      {modal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 animate-in zoom-in duration-200">
          <div className="bg-white rounded-[40px] w-full max-w-sm p-10 shadow-2xl text-center border border-white">
            <div
              className={`mx-auto w-20 h-20 rounded-3xl flex items-center justify-center mb-6 rotate-12 ${modal.type === "delete" ? "bg-rose-100 text-rose-500" : "bg-emerald-100 text-emerald-500"}`}
            >
              {modal.type === "delete" ? (
                <AlertTriangle size={40} />
              ) : (
                <CheckCircle2 size={40} />
              )}
            </div>
            <h4 className="text-2xl font-black text-slate-800 mb-2 italic uppercase">
              Xác nhận!
            </h4>
            <p className="text-sm text-slate-500 mb-10 font-medium px-4">
              Bạn có chắc chắn muốn{" "}
              <span className="text-indigo-600 font-bold">
                {modal.type === "add"
                  ? "thêm mới"
                  : modal.type === "edit"
                    ? "cập nhật"
                    : "xóa bỏ"}
              </span>{" "}
              bản ghi này không?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setModal({ show: false, type: "", data: null })}
                className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600 text-[10px] uppercase tracking-widest transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmAction}
                className={`flex-1 py-4 rounded-2xl font-black text-white text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95 ${modal.type === "delete" ? "bg-rose-500 shadow-rose-200" : "bg-indigo-600 shadow-indigo-200"}`}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allowances;
