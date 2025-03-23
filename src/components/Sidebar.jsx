// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Admin Management", path: "/admin-management" },
  { name: "Employee Management", path: "/employee-management" },
  { name: "Department Management", path: "/department-management" },
  { name: "Leave Management", path: "/leave-management" },
  { name: "Payroll Management", path: "/payroll-management" },
  { name: "Document Management", path: "/document-management" },
  { name: "Task Management", path: "/task-management" },

];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 shadow-md z-50">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
       Admin
      </div>
      <nav className="mt-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block py-2 px-4 hover:bg-gray-800 ${
              location.pathname === item.path ? "bg-gray-800" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
