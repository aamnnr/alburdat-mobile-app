import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { hitungSistemPakar } from '../utils/pakar';
import { ESP_IP, setManualDosis, resetStatistikAlat } from '../services/esp32';

import MonitoringCard from '../components/MonitoringCard';
import StatistikCard from '../components/StatistikCard';
import PakarCard from '../components/PakarCard';
import ManualCard from '../components/ManualCard';
import CustomModal from '../components/CustomModal';
import ThemeSwitcher from '../components/ThemeSwitcher';

export default function Dashboard() {
  const { colors } = useTheme();

  const [statusKoneksi, setStatusKoneksi] = useState('Menghubungkan...');
  const [gramasi, setGramasi] = useState('0.00');
  const [isMotorRunning, setIsMotorRunning] = useState(false);
  const [totalVolume, setTotalVolume] = useState('0.00');
  const [totalSesi, setTotalSesi] = useState(0);
  const [rataRata, setRataRata] = useState('0.00');

  const [inputUmur, setInputUmur] = useState('20');
  const [inputKomoditas, setInputKomoditas] = useState('1'); 
  const [inputManual, setInputManual] = useState('');
  const [hasilKalkulasi, setHasilKalkulasi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', message: '', type: 'info', action: null });

  const ws = useRef(null);

  useEffect(() => {
    loadStatistikLokal();
    connectWebSocket();
    return () => { if (ws.current) ws.current.close(); };
  }, []);

  const loadStatistikLokal = async () => {
    try {
      const vol = await AsyncStorage.getItem('@totalVolume');
      const sesi = await AsyncStorage.getItem('@totalSesi');
      if (vol) setTotalVolume(parseFloat(vol).toFixed(2));
      if (sesi) {
        const s = parseInt(sesi);
        setTotalSesi(s);
        const avg = s > 0 ? (parseFloat(vol) / s) : 0;
        setRataRata(avg.toFixed(2));
      }
    } catch (e) { console.log("Load Local Error:", e); }
  };

  const simpanStatistikLokal = async (vol, sesi) => {
    try {
      await AsyncStorage.setItem('@totalVolume', vol.toString());
      await AsyncStorage.setItem('@totalSesi', sesi.toString());
    } catch (e) { console.log("Save Local Error:", e); }
  };

  const connectWebSocket = () => {
    ws.current = new WebSocket(`ws://${ESP_IP}:81/`);

    ws.current.onopen = () => setStatusKoneksi('Terhubung \u25CF');

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setGramasi(parseFloat(data.gramasi).toFixed(2));
        setIsMotorRunning(data.isMotorRunning);
        
        if (data.totalSesi > 0) {
          setTotalVolume(parseFloat(data.totalVolume).toFixed(2));
          setTotalSesi(data.totalSesi);
          setRataRata(parseFloat(data.rataRata).toFixed(2));
          simpanStatistikLokal(data.totalVolume, data.totalSesi);
        }
      } catch (e) { console.log("WS Data Error:", e); }
    };

    ws.current.onclose = () => {
      setStatusKoneksi('Terputus (Menghubungkan...)');
      setTimeout(connectWebSocket, 3000);
    };
  };

  const showModal = (title, message, type = 'info', action = null) => {
    setModalConfig({ title, message, type, action });
    setModalVisible(true);
  };

  const handleSetManual = async () => {
    if (!inputManual || parseFloat(inputManual) <= 0) {
      showModal('Input Tidak Valid', 'Masukkan angka dosis yang benar.', 'warning');
      return;
    }
    setIsLoading(true);
    try {
      await setManualDosis(inputManual);
      showModal('Berhasil', `Dosis manual ${inputManual}g dikirim ke alat.`, 'success');
      setInputManual('');
    } catch (e) { showModal('Gagal', 'Koneksi ke alat terputus.', 'error'); } 
    finally { setIsLoading(false); }
  };

  const handleKalkulasiPakar = () => {
    if (!inputUmur || inputUmur < 0) {
      showModal('Peringatan', 'Masukkan umur tanaman yang valid.', 'warning');
      return;
    }
    const hasil = hitungSistemPakar(inputUmur, inputKomoditas);
    if (hasil > 0) setHasilKalkulasi(hasil);
    else {
      setHasilKalkulasi(null);
      showModal('Tidak Ditemukan', 'Data pakar tidak tersedia untuk input tersebut.', 'error');
    }
  };

  const handleKirimPakarKeAlat = async () => {
    if (!hasilKalkulasi) return;
    setIsLoading(true);
    try {
      await setManualDosis(hasilKalkulasi);
      showModal('Sukses', `Dosis pakar ${hasilKalkulasi}g berhasil diterapkan.`, 'success');
      setHasilKalkulasi(null);
    } catch (e) { showModal('Gagal', 'Gagal mengirim data ke alat.', 'error'); } 
    finally { setIsLoading(false); }
  };

  const konfirmasiReset = () => showModal('Konfirmasi', 'Yakin ingin mereset seluruh statistik?', 'warning', eksekusiReset);
  
  const eksekusiReset = async () => {
    try {
      await resetStatistikAlat();
      await AsyncStorage.multiRemove(['@totalVolume', '@totalSesi']);
      setTotalVolume('0.00'); setTotalSesi(0); setRataRata('0.00');
      showModal('Berhasil', 'Statistik telah direset.', 'success');
    } catch (e) { showModal('Gagal', 'Koneksi terputus.', 'error'); }
  };

  const isConnected = statusKoneksi.includes('Terhubung');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        
        <Text style={[styles.header, { color: colors.primary }]}>ALBURDAT MOBILE</Text>
        <Text style={[styles.subHeader, { color: isConnected ? colors.primary : colors.danger }]}>
          {statusKoneksi}
        </Text>

        <MonitoringCard isMotorRunning={isMotorRunning} gramasi={gramasi} />
        
        <StatistikCard 
          totalVolume={totalVolume} 
          rataRata={rataRata} 
          totalSesi={totalSesi} 
          konfirmasiReset={konfirmasiReset} 
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

      <CustomModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        modalConfig={modalConfig} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginTop: 50 },
  subHeader: { fontSize: 12, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' }
});