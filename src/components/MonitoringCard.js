import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function MonitoringCard({ isMotorRunning, gramasi }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.cardTitle, { color: colors.primary, borderBottomColor: colors.border }]}>Monitoring Alat</Text>
      <View style={styles.badgeContainer}>
        <View style={[styles.badge, { backgroundColor: isMotorRunning ? colors.primary : colors.danger }]}>
          <Text style={[styles.badgeText, { color: isMotorRunning ? '#fff' : '#fff' }]}>
            {isMotorRunning ? 'AKTIF (MEMUPUK)' : 'STANDBY'}
          </Text>
        </View>
      </View>
      <Text style={[styles.label, { color: colors.textDim }]}>Dosis Tersimpan</Text>
      <Text style={[styles.dosisBesar, { color: colors.primary }]}>{gramasi}<Text style={styles.dosisSatuan}>g</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 12, marginBottom: 20, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 15 },
  label: { fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  badgeContainer: { alignItems: 'center', marginBottom: 15 },
  badge: { paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: 'bold' },
  dosisBesar: { fontSize: 48, fontWeight: 'bold', textAlign: 'center' },
  dosisSatuan: { fontSize: 20 },
});