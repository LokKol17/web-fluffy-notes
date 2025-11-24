"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    cardBg: string;
  };
  wallpaper: string;
}

const themes: Theme[] = [
  {
    id: "hello-kitty",
    name: "Hello Kitty",
    colors: {
      primary: "#FF69B4",
      secondary: "#FFB6C1",
      accent: "#FF1493",
      background: "#FFF0F5",
      text: "#8B008B",
      cardBg: "#FFB6C180",
    },
    wallpaper: "/hello-kitty-bg.png",
  },
  {
    id: "my-melody",
    name: "My Melody",
    colors: {
      primary: "#FFB6C1",
      secondary: "#FFC0CB",
      accent: "#FF69B4",
      background: "#FFF5F8",
      text: "#8B4A8B",
      cardBg: "#FFC0CB80",
    },
    wallpaper: "/my-melody-bg.png",
  },
  {
    id: "kuromi",
    name: "Kuromi",
    colors: {
      primary: "#8B008B",
      secondary: "#BA55D3",
      accent: "#9370DB",
      background: "#1a0a1a",
      text: "#E6E6FA",
      cardBg: "#8B008B80",
    },
    wallpaper: "/kuromi-bg.png",
  },
  {
    id: "cinnamonroll",
    name: "Cinnamonroll",
    colors: {
      primary: "#F5DEB3",
      secondary: "#FFEFD5",
      accent: "#DEB887",
      background: "#FFFAF0",
      text: "#8B7355",
      cardBg: "#F5DEB380",
    },
    wallpaper: "/cinnamonroll-bg.png",
  },
  {
    id: "pompompurin",
    name: "Pompompurin",
    colors: {
      primary: "#FFD700",
      secondary: "#FFFFE0",
      accent: "#FFA500",
      background: "#FFFAF0",
      text: "#8B4513",
      cardBg: "#FFD70080",
    },
    wallpaper: "/pompompurin-bg.png",
  },
  {
    id: "keroppi",
    name: "Keroppi",
    colors: {
      primary: "#32CD32",
      secondary: "#98FB98",
      accent: "#228B22",
      background: "#F0FFF0",
      text: "#006400",
      cardBg: "#98FB9880",
    },
    wallpaper: "/keroppi-bg.png",
  },
  {
    id: "pochacco",
    name: "Pochacco",
    colors: {
      primary: "#87CEEB",
      secondary: "#B0E0E6",
      accent: "#4682B4",
      background: "#F0F8FF",
      text: "#191970",
      cardBg: "#87CEEB80",
    },
    wallpaper: "/pochacco-bg.png",
  },
];

interface ThemeContextType {
  currentTheme: Theme;
  themes: Theme[];
  setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentThemeId, setCurrentThemeId] = useState("hello-kitty");
  
  const currentTheme = themes.find(theme => theme.id === currentThemeId) || themes[0];

  const setTheme = (themeId: string) => {
    setCurrentThemeId(themeId);
    localStorage.setItem("fluffy-theme", themeId);
    applyTheme(themes.find(theme => theme.id === themeId) || themes[0]);
  };

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.style.setProperty("--theme-primary", theme.colors.primary);
    root.style.setProperty("--theme-secondary", theme.colors.secondary);
    root.style.setProperty("--theme-accent", theme.colors.accent);
    root.style.setProperty("--theme-background", theme.colors.background);
    root.style.setProperty("--theme-text", theme.colors.text);
    root.style.setProperty("--theme-card-bg", theme.colors.cardBg);
    root.style.setProperty("--theme-wallpaper", `url('${theme.wallpaper}')`);
    root.setAttribute("data-theme", theme.id);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("fluffy-theme") || "hello-kitty";
    const theme = themes.find(t => t.id === savedTheme) || themes[0];
    setCurrentThemeId(theme.id);
    applyTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, themes, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
