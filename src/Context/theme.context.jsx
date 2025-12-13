import { createContext, useState, useEffect } from "react";

export const mode = createContext(null);

export default function ModeContextProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <mode.Provider value={{ toggleTheme, theme }}>{children}</mode.Provider>
  );
}
