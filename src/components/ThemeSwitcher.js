import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { themeMode, changeTheme, colors } = useTheme();

  const options = [
    { label: 'Sistem', value: 'system' },
    { label: 'Terang', value: 'light' },
    { label: 'Gelap', value: 'dark' },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textDim }]}>Penyesuaian Tema Tampilan</Text>
      <View style={[styles.switcherContainer, { borderColor: colors.primary }]}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={[
              styles.btn,
              themeMode === opt.value && { backgroundColor: colors.primary }
            ]}
            onPress={() => changeTheme(opt.value)}
          >
            <Text style={[
              styles.btnText,
              { color: themeMode === opt.value ? '#ffffff' : colors.text }
            ]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 10, marginBottom: 30, alignItems: 'center' },
  label: { fontSize: 13, fontWeight: 'bold', marginBottom: 10 },
  switcherContainer: { flexDirection: 'row', borderWidth: 1, borderRadius: 8, overflow: 'hidden' },
  btn: { paddingVertical: 10, paddingHorizontal: 20 },
  btnText: { fontSize: 14, fontWeight: 'bold' }
});