import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { BiSun, BiMoon } from 'react-icons/bi';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center text-xl p-2 rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-800"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <BiSun className="text-yellow-400 hover:text-yellow-300" />
      ) : (
        <BiMoon className="text-indigo-600 hover:text-indigo-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
