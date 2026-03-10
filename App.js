import React from 'react';
import { StatusBar } from 'react-native';
import Dashboard from './src/screens/Dashboard';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}