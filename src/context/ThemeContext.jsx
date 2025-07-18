import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const THEME_KEY = "learnhub-theme-mode";

export const ThemeProvider = ({ children }) => {
  // Modes: 'light', 'dark', 'system'
  const [mode, setMode] = useState("system");
  const [theme, setTheme] = useState("light");

  // Detect system preference
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  // Apply theme class to body
  const applyBodyClass = (theme) => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${theme}-theme`);
  };

  // On mount, load saved mode or default to system
  useEffect(() => {
    const savedMode = localStorage.getItem(THEME_KEY);
    if (savedMode === "light" || savedMode === "dark" || savedMode === "system") {
      setMode(savedMode);
    } else {
      setMode("system");
    }
  }, []);

  // Update theme whenever mode or system preference changes
  useEffect(() => {
    if (mode === "system") {
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
      applyBodyClass(systemTheme);
    } else {
      setTheme(mode);
      applyBodyClass(mode);
    }
  }, [mode]);

  // Listen to system theme changes if mode is system
  useEffect(() => {
    if (mode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
      applyBodyClass(newTheme);
    };
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [mode]);

  // Change mode and save to localStorage
  const changeMode = (newMode) => {
    setMode(newMode);
    localStorage.setItem(THEME_KEY, newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, theme, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);