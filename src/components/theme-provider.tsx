// components/ThemeProvider.tsx
"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

// Define the theme context type
type ThemeContextType = {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
};

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
});

/**
 * Theme Provider Component
 * 
 * Provides theme context to the entire Next.js application and manages theme state
 * Handles:
 * - Initial theme detection (system preference, saved preference)
 * - Theme persistence in localStorage
 * - Theme toggling functionality
 * - CSS class application for dark mode
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize with system theme, will be updated in useEffect
  const [theme, setThemeState] = useState<"light" | "dark" | "system">("system");
  const [mounted, setMounted] = useState(false);

  // Function to set theme and update related state
  const setTheme = (newTheme: "light" | "dark" | "system") => {
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
    
    // Update DOM based on theme
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (newTheme === "system") {
      document.documentElement.classList.toggle("dark", prefersDark);
    } else {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
    
    // Update state
    setThemeState(newTheme);
  };

  // Initialize theme from localStorage or system preference
  // Only runs client-side after initial mount
  useEffect(() => {
    setMounted(true);
    
    // Check for saved preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    
    // Check for system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Set theme based on saved preference or system preference
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("system");
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Context value
  const contextValue = {
    theme,
    setTheme,
  };

  // Prevent flash of wrong theme by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use the theme context
 * 
 * Usage:
 * const { theme, setTheme } = useTheme();
 * 
 * To toggle theme:
 * const { theme, setTheme } = useTheme();
 * const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}