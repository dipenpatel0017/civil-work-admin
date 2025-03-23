// components/Topbar.jsx
import React from 'react';
import ThemeToggle from './ThemeToggle';

const Topbar = () => {
  return (
    <div className="w-full h-16 bg-gray-100 dark:bg-gray-900 flex items-center justify-between px-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        
      </h2>
      <ThemeToggle />
    </div>
  );
};

export default Topbar;
