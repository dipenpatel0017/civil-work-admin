// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
