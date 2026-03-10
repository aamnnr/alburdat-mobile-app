import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/ThemeContext';

export default function PakarCard({ 
  inputKomoditas, setInputKomoditas, inputUmur, setInputUmur, 
  handleKalkulasiPakar, hasilKalkulasi, setHasilKalkulasi, 
  handleKirimPakarKeAlat, isLoading 
}) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.cardTitle, { color: colors.primary, borderBottomColor: colors.border }]}>Kalkulator Pakar</Text>
      
      <Text style={[styles.label, { color: colors.textDim }]}>Komoditas</Text>
      <View style={[styles.pickerBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
        <Picker
          selectedValue={inputKomoditas}
          onValueChange={(v) => { setInputKomoditas(v); setHasilKalkulasi(null); }}
          style={{ color: colors.text }}
          dropdownIconColor={colors.primary}
        >
          <Picker.Item label="Jagung" value="1" />
          <Picker.Item label="Sawit" value="9" />
          {/* ... Item lainnya ... */}
        </Picker>
      </View>

      <Text style={[styles.label, { color: colors.textDim }]}>Umur (HST)</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: colors.background, color: colors.primary, borderColor: colors.border }]} 
        keyboardType="numeric"
        value={inputUmur}
        onChangeText={(t) => { setInputUmur(t); setHasilKalkulasi(null); }}
      />

      <TouchableOpacity style={[styles.btnOutline, { borderColor: colors.primary }]} onPress={handleKalkulasiPakar}>
        <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Kalkulasi Dosis</Text>
      </TouchableOpacity>

      {hasilKalkulasi && (
        <View style={[styles.hasilBox, { backgroundColor: colors.background, borderColor: colors.gold }]}>
          <Text style={[styles.hasilText, { color: colors.gold }]}>Rekomendasi: {hasilKalkulasi}g</Text>
          <TouchableOpacity 
            style={[styles.btnFull, { backgroundColor: colors.blueCustom }]} 
            onPress={handleKirimPakarKeAlat}
          >
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnTextWhite}>Kirim ke Alat</Text>}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 12, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 },
  label: { fontSize: 12, fontWeight: 'bold', marginBottom: 5 },
  pickerBox: { borderWidth: 1, borderRadius: 8, marginBottom: 15 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 15 },
  btnOutline: { padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1 },
  hasilBox: { marginTop: 15, padding: 15, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
  hasilText: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  btnFull: { width: '100%', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnTextWhite: { color: '#fff', fontWeight: 'bold' }
});