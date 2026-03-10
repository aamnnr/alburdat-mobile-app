import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const sharedColors = {
  primary: "#388E3C",    // Hijau Tailwind Anda
  blueCustom: "#1E88E5", // Biru Custom
  gold: "#D4AF37",       // Gold
  danger: "#f44336",
};

const lightTheme = {
  ...sharedColors,
  background: "#E8F5E9", // Accent (Latar hijau sangat muda)
  card: "#ffffff",
  text: "#333333",       // Secondary
  textDim: "#666666",
  border: "#cccccc",
  badgeBg: "#e0e0e0",
};

const darkTheme = {
  ...sharedColors,
  background: "#121212",
  card: "#1e1e1e",
  text: "#ffffff",
  textDim: "#b0bec5",
  border: "#333333",
  badgeBg: "#2c2c2c",
};

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system');

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('@themeMode');
      if (saved) setThemeMode(saved);
    };
    loadTheme();
  }, []);

  const isDark = themeMode === 'system' ? systemTheme === 'dark' : themeMode === 'dark';
  const colors = isDark ? darkTheme : lightTheme;

  const changeTheme = async (mode) => {
    setThemeMode(mode);
    await AsyncStorage.setItem('@themeMode', mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, changeTheme, isDark, colors }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);