"use client";

import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

/**
 * ThemeToggle Component
 * 
 * A reusable component that provides a toggle button for switching between dark and light modes.
 * Positioned in the top right corner by default.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes for the button
 * @returns {JSX.Element} - The theme toggle button
 */
const ThemeToggle = ({ className = "" }) => {
  // Theme state (true = dark, false = light)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme based on system preference or saved preference
  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      
      // Update document class for theme
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Store preference in localStorage
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      
      return newMode;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-10 p-2 rounded-full bg-sidebar-accent hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors ${className}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <FaSun className="size-5 text-sidebar-accent-foreground" />
      ) : (
        <FaMoon className="size-5 text-sidebar-accent-foreground" />
      )}
    </button>
  );
};

export default ThemeToggle;