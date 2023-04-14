import React from "react";
interface ColorTheme {
  theme: string;
  toggleTheme: () => string | void;
}
const ThemeContext = React.createContext<ColorTheme>({
  theme: "",
  toggleTheme: () => "",
});

export enum THEME_MODE {
  LIGHT = "light",
  DARK = "dark",
}

export interface Props {
  children?: React.ReactNode;
}

export const ThemeProvider = React.memo<Props>((props) => {
  const [theme, setTheme] = React.useState<THEME_MODE>(THEME_MODE.DARK);
  console.log("THEME", theme);
  const value = React.useMemo<ColorTheme>(() => {
    return {
      theme: theme,
      toggleTheme: () => {
        return setTheme((theme) =>
          theme === THEME_MODE.DARK ? THEME_MODE.LIGHT : THEME_MODE.DARK
        );
      },
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
});

export const useTheme = () => React.useContext(ThemeContext);
