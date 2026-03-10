import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function StatistikCard({ totalVolume, rataRata, totalSesi, konfirmasiReset }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.cardTitle, { color: colors.primary, borderBottomColor: colors.border }]}>
        Statistik Pemupukan
      </Text>
      
      <View style={styles.statGrid}>
        <View style={[styles.statBox, { backgroundColor: colors.badgeBg }]}>
          <Text style={[styles.statLabel, { color: colors.textDim }]}>Total Volume</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>{totalVolume}g</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: colors.badgeBg }]}>
          <Text style={[styles.statLabel, { color: colors.textDim }]}>Rata-rata</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>{rataRata}g</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: colors.badgeBg }]}>
          <Text style={[styles.statLabel, { color: colors.textDim }]}>Total Sesi</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>{totalSesi}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[styles.btnRedOutline, { borderColor: colors.danger }]} 
        onPress={konfirmasiReset}
      >
        <Text style={[styles.btnRedOutlineText, { color: colors.danger }]}>Reset Statistik</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 12, marginBottom: 20, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 },
  statGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  statBox: { flex: 1, padding: 10, borderRadius: 8, marginHorizontal: 4, alignItems: 'center' },
  statLabel: { fontSize: 10, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  statValue: { fontSize: 16, fontWeight: 'bold' },
  btnRedOutline: { backgroundColor: 'transparent', padding: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, marginTop: 5 },
  btnRedOutlineText: { fontSize: 14, fontWeight: 'bold' },
});