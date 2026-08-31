"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";

type ThemeMode = "light" | "dark";

/**
 * Interface representing the operational payload managed by the theme core engine.
 *
 * @interface ThemeContextType
 * @property {ThemeMode} theme - The currently active presentation palette mode signature.
 * @property {() => void} toggleTheme - Dispatches state modifications inversion switches between active modes.
 */
type ThemeContextType = {
    theme: ThemeMode;
    toggleTheme: () => void;
};

/**
 * Evaluates execution scopes on initialization to resolve configuration fallbacks
 * or persist records retrieved from persistent storage caches.
 *
 * @returns {ThemeMode} The default baseline theme mode selection token.
 */
function getInitialTheme(): ThemeMode {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("mambo-theme");
    return saved === "light" || saved === "dark" ? saved : "dark";
}

/**
 * Context container isolating theme distribution definitions.
 */
const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    toggleTheme: () => {},
});

/**
 * Context wrapping manager responsible for monitoring runtime palette state alterations.
 * Synchronizes chosen styling modifications synchronously across the root DOM subtree attributes
 * using layout layout engines to minimize structural visual flashes.
 *
 * @public
 * @param {Object} props - Component container node configurations.
 * @param {React.ReactNode} props.children - Target element array nested inside context provider branches.
 * @returns {JSX.Element} A coordinated contextual application lifecycle wrapper managing interface parameters.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

    useLayoutEffect(() => {
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

/**
 * Custom hook utility to tap directly into theme management state dispatch actions.
 *
 * @public
 * @returns {ThemeContextType} Operational state settings and control flags mapped from context cores.
 */
export const useTheme = () => useContext(ThemeContext);
