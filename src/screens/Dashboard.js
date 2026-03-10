import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { hitungSistemPakar } from '../utils/pakar';
import { ESP_IP, setManualDosis, resetStatistikAlat } from '../services/esp32';

// Komponen
import MonitoringCard from '../components/MonitoringCard';
import StatistikCard from '../components/StatistikCard'; // Pastikan sudah diupdate temanya
import PakarCard from '../components/PakarCard';
import ManualCard from '../components/ManualCard';   // Pastikan sudah diupdate temanya
import CustomModal from '../components/CustomModal'; // Pastikan sudah diupdate temanya
import ThemeSwitcher from '../components/ThemeSwitcher';

export default function Dashboard() {
  const { colors, isDark } = useTheme();
  // ... (Gunakan State yang sama seperti sebelumnya) ...

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <Text style={[styles.header, { color: colors.primary }]}>ALBURDAT MOBILE</Text>
        <Text style={[styles.subHeader, { color: colors.textDim }]}>{statusKoneksi}</Text>

        <MonitoringCard isMotorRunning={isMotorRunning} gramasi={gramasi} />
        
        <StatistikCard 
          totalVolume={totalVolume} rataRata={rataRata} 
          totalSesi={totalSesi} konfirmasiReset={konfirmasiReset} 
        />
        
        <PakarCard 
          inputKomoditas={inputKomoditas} setInputKomoditas={setInputKomoditas}
          inputUmur={inputUmur} setInputUmur={setInputUmur}
          handleKalkulasiPakar={handleKalkulasiPakar}
          hasilKalkulasi={hasilKalkulasi} setHasilKalkulasi={setHasilKalkulasi}
          handleKirimPakarKeAlat={handleKirimPakarKeAlat}
          isLoading={isLoading}
        />

        <ManualCard 
          inputManual={inputManual} setInputManual={setInputManual}
          handleSetManual={handleSetManual} isLoading={isLoading}
        />

        <ThemeSwitcher />
      </ScrollView>

      <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} modalConfig={modalConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginTop: 50 },
  subHeader: { fontSize: 12, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' }
});