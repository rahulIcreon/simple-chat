import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const ThemeMode = createContext();

export const ThemeModeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");
    const value = useMemo(() => {
        return {
            theme: theme,
            toggleTheme: () => {
                return setTheme((theme) =>
                    theme === "dark" ? "light" : "dark"
                );
            },
        };
    }, [theme]);

    return (
        <ThemeMode.Provider value={value}>
            <div id={theme}>
                {children}
            </div>
        </ThemeMode.Provider>
    );
};

export const useTheme = () => useContext(ThemeMode)