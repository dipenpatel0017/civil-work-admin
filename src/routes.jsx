import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import DepartmentManagement from "./pages/DepartmentManagement";
import AdminManagement from "./pages/AdminManagement";
import EmployeeManagement from './pages/EmployeeManagement.jsx';
import LeaveManagement from "./pages/LeaveManagement"; 
import PayrollManagement from "./pages/PayrollManagement";
import DocumentManagement from './pages/DocumentManagement';
import TaskManagement from './pages/TaskManagement';


export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/department-Management" element={<DepartmentManagement />} />
        <Route path="/admin-management" element={<AdminManagement />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
        <Route path="/leave-management" element={<LeaveManagement />} />      
        <Route path="/payroll-management" element={<PayrollManagement />} />
        <Route path="/document-management" element={<DocumentManagement />} />
        <Route path="/task-management" element={<TaskManagement />}/>
      </Routes>
    </Layout>
  );
}
