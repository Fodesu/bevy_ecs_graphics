import { useState, useEffect, useCallback } from "react";

const THEME_STORAGE_KEY = "bevy-theme";

type Theme = "light" | "dark" | "system";

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

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      const initialTheme = stored || "system";
      setThemeState(initialTheme);
    } catch {
      setThemeState("system");
    }
    setIsLoaded(true);
  }, []);

  // Apply theme when it changes
  useEffect(() => {
    if (!isLoaded) return;

    const actualTheme = theme === "system" ? getSystemTheme() : theme;
    setResolvedTheme(actualTheme);
    applyTheme(actualTheme);

    // Save to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, isLoaded]);

  // Listen for system theme changes
  useEffect(() => {
    if (!isLoaded || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const newTheme = mediaQuery.matches ? "dark" : "light";
      setResolvedTheme(newTheme);
      applyTheme(newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, isLoaded]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  }, []);

  return {
    theme,
    resolvedTheme,
    isLoaded,
    setTheme,
    toggleTheme,
  };
}
