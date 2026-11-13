"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // On first mount, restore saved theme from localStorage, defaulting to light.
  // Rebuild (2026-11-13): the whole site is now white — migrate everyone to
  // light once (flag hasnain-theme-v2), the toggle still works after that.
  useEffect(() => {
    try {
      const migrated = localStorage.getItem("hasnain-theme-v2");
      const saved = localStorage.getItem("hasnain-theme") as Theme | null;
      if (!migrated) {
        setThemeState("light");
        localStorage.setItem("hasnain-theme-v2", "1");
      } else if (saved === "dark" || saved === "light") {
        setThemeState(saved);
      } else {
        setThemeState("light");
      }
    } catch {
      setThemeState("light");
    }
    setMounted(true);
  }, []);

  // Apply/remove `dark` class on <html> whenever theme changes
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("hasnain-theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => setThemeState((t) => (t === "light" ? "dark" : "light"));
  const setTheme = (t: Theme) => setThemeState(t);



  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
