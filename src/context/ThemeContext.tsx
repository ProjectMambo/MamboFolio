"use client";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

type ThemeContextType = {
    theme: ThemeMode;
    toggleTheme: () => void;
};

function getInitialTheme(): ThemeMode {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("mambo-theme");
    return saved === "light" || saved === "dark" ? saved : "dark";
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const next: ThemeMode = theme === "dark" ? "light" : "dark";
        setTheme(next);
        localStorage.setItem("mambo-theme", next);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
