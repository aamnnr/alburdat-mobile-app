import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ManualCard({ inputManual, setInputManual, handleSetManual, isLoading }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.cardTitle, { color: colors.primary, borderBottomColor: colors.border }]}>
        Pengaturan Dosis Manual
      </Text>
      
      <Text style={[styles.label, { color: colors.textDim }]}>Masukkan Dosis Khusus (Gram)</Text>
      <TextInput 
        style={[styles.input, { 
          backgroundColor: colors.background, 
          color: colors.primary, 
          borderColor: colors.border 
        }]} 
        placeholder="Contoh: 15.5" 
        placeholderTextColor={colors.textDim}
        keyboardType="numeric"
        value={inputManual}
        onChangeText={setInputManual}
      />
      
      <TouchableOpacity 
        style={[styles.btnBlue, { backgroundColor: colors.blueCustom }]} 
        onPress={handleSetManual} 
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.btnText}>Terapkan Dosis Manual</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 12, marginBottom: 20, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 },
  label: { fontSize: 12, fontWeight: 'bold', marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 15 },
  btnBlue: { padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});