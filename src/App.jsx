import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import EmployeeLayout from "./components/Layouts/Employee/EmployeeLayout";
import EmployeeDashboard from "./pages/Employee/Dashboard";
import EmployeeProfile from "./pages/Employee/Profile";
import EmployeeSalary from "./pages/Employee/Salary";
import EmployeeSchedule from "./pages/Employee/Schedule";
import ShiftMarket from "./pages/Employee/ShiftMarket";

import Login from "./pages/Login";
import ManagerLayout from "./components/Layouts/Manager/ManagerLayout";
import ManagerProfile from "./pages/Manager/ManagerProfile";
import SchedulingPage from "./pages/Manager/Scheduling/index";
import StaffManager from "./pages/Manager/Staff/StaffManager";
import Dashboard from "./pages/Manager/Home/Dashboard";

// Kế toán
import AccountingLayout from "./components/Layouts/Accounting/AccountingLayout";
import AccountingDashboard from "./pages/Accounting/Dashboard";
import Attendance from "./pages/Accounting/Attendance";
import AllowanceManager from "./pages/Accounting/Allowances";
import DeductionManager from "./pages/Accounting/Deductions";
import PayrollManager from "./pages/Accounting/Payroll";

//Admin
import AdminLayout from "./components/Layouts/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token && token !== "undefined" && token !== "null";

  if (!isAuthenticated) {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_data");
    }
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* NHÓM CẦN ĐĂNG NHẬP */}
        <Route element={<ProtectedRoute />}>
          {/* ROUTE CHO NHÂN VIÊN (ROLE 3) */}
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="profile" element={<EmployeeProfile />} />
            <Route path="salary" element={<EmployeeSalary />} />
            <Route path="schedule" element={<EmployeeSchedule />} />
            <Route path="exchange" element={<ShiftMarket />} />
          </Route>

          {/* ROUTE CHO QUẢN LÝ CHI NHÁNH (ROLE 2) */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="staff" element={<StaffManager />} />
            <Route path="scheduling" element={<SchedulingPage />} />
            <Route path="profile" element={<ManagerProfile />} />
          </Route>

          {/* ROUTE CHO KẾ TOÁN CHI NHÁNH (C1 - ROLE 1 HOẶC TÙY CHỈNH) */}
          <Route path="/accounting" element={<AccountingLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AccountingDashboard />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="allowances" element={<AllowanceManager />} />
            <Route path="deductions" element={<DeductionManager />} />
            <Route path="payroll" element={<PayrollManager />} />
          </Route>

          {/* Cấu trúc ĐÚNG cho Admin Route */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Thay <index element={...} /> bằng <Route index element={...} /> */}
            <Route index element={<Dashboard />} />

            <Route path="dashboard" element={<AdminDashboard />} />

            {/* Sau này thêm các page khác vào đây */}
            {/* <Route path="salary" element={<SalaryPage />} /> */}
          </Route>
        </Route>

        <Route path="/" element={<HomeRedirect />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
/**
 * Component hỗ trợ điều hướng dựa trên Role khi người dùng vào "/"
 */
const HomeRedirect = () => {
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
  const role = userData?.role;

  if (!role) return <Navigate to="/login" replace />;

  // Điều hướng dựa trên role từ tài liệu API
  if (role === 1) return <Navigate to="/accounting/dashboard" replace />;
  if (role === 2) return <Navigate to="/manager/dashboard" replace />;
  if (role === 3) return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/employee/dashboard" replace />;
};

export default App;
