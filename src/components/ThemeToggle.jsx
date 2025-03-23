// components/ThemeToggle.jsx
import React from 'react';

const ThemeToggle = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full"
    >
      🌗
    </button>
  );
};

export default ThemeToggle;
