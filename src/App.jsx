// // App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Topbar from './components/Topbar';
// import Dashboard from './pages/Dashboard';

// const App = () => {
//   return (
//     <Router>
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1">
//           <Topbar />
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             {/* Add other routes for Projects, WorkOrders, etc. */}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ThemeToggle from "./components/ThemeToggle";
import RoutesList from "./routes";
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <div className="flex-1 p-4 overflow-y-auto">
            <RoutesList />
          </div>
        </div>
        <ThemeToggle />
      </div>
    </Router>
  );
};
<Toaster />
export default App;
