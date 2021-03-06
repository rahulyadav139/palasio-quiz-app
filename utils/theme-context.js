import React, { useState, useContext, useCallback } from 'react';

const ThemeContext = React.createContext({
  theme: false,
});

const ThemeProvider = props => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    if (isDarkTheme) {
      setIsDarkTheme(false);
      localStorage.setItem('theme', 'light');
    } else {
      setIsDarkTheme(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  const defaultThemeHandler = useCallback(() => {
    const prevTheme = localStorage.getItem('theme');

    if (prevTheme === 'dark') {
      setIsDarkTheme(true);
      localStorage.setItem('theme', 'dark');
    } else {
      setIsDarkTheme(false);
      localStorage.setItem('theme', 'light');
    }
  }, [setIsDarkTheme]);

  const defaultValue = {
    theme: isDarkTheme,
    themeHandler: toggleTheme,
    defaultThemeHandler,
  };

  return (
    <ThemeContext.Provider value={defaultValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
