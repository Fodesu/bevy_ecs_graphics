import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "bevy-theme";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize theme on mount
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as
      | "light"
      | "dark"
      | "system"
      | null;
    const theme = stored || "system";
    const resolvedTheme = theme === "system" ? getSystemTheme() : theme;
    applyTheme(resolvedTheme);
    setIsReady(true);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const currentStored = localStorage.getItem(
        THEME_STORAGE_KEY
      ) as "light" | "dark" | "system" | null;
      if (!currentStored || currentStored === "system") {
        applyTheme(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!isReady) {
    // Prevent flash of wrong theme
    return null;
  }

  return <>{children}</>;
}
