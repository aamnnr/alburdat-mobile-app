# Alburdat Mobile

Aplikasi mobile React Native (Expo) untuk mengontrol sistem pemupukan otomatis berbasis ESP32.

## 📱 Deskripsi

**Alburdat Mobile** adalah aplikasi mobile yang digunakan untuk memantau dan mengontrol alat pemupukan otomatis. Aplikasi ini terhubung dengan mikrokontroler ESP32 melalui koneksi WiFi dan menyediakan antarmuka pengguna yang intuitif untuk:

- Memantau status alat (aktif/standby)
- Melihat statistik pemupukan
- Menghitung dosis pemupukan menggunakan sistem pakar
- Mengatur dosis manual

## 🛠️ Teknologi yang Digunakan

- **Framework**: Expo SDK 55 (React Native 0.83.2)
- **Bahasa**: JavaScript/React
- **State Management**: React Context API
- **Penyimpanan Lokal**: AsyncStorage
- **Komponen UI**: React Native built-in components
- **Picker**: @react-native-picker/picker

## 📂 Struktur Proyek

```
alburdat-mobile/
├── App.js                    # Entry point aplikasi
├── app.json                  # Konfigurasi Expo
├── package.json              # Dependencies proyek
├── index.js                  # File starting Expo
├── assets/                   # Gambar dan ikon aplikasi
│   ├── icon.png
│   ├── splash-icon.png
│   └── ...
└── src/
    ├── components/           # Komponen UI reusable
    │   ├── CustomModal.js
    │   ├── ManualCard.js
    │   ├── MonitoringCard.js
    │   ├── PakarCard.js
    │   ├── StatistikCard.js
    │   └── ThemeSwitcher.js
    ├── context/              # React Context
    │   └── ThemeContext.js   # Pengelola tema (light/dark)
    ├── screens/              # Halaman aplikasi
    │   └── Dashboard.js     # Halaman utama
    ├── services/             # Layanan/API
    │   └── esp32.js         # Komunikasi dengan ESP32
    └── utils/               # Fungsi utility
        └── pakar.js         # Logika sistem pakar
```

## ✨ Fitur

### 1. Monitoring Alat

- Menampilkan status alat (AKTIF/STANDBY)
- Menampilkan dosis yang tersimpan dalam gram

### 2. Statistik Pemupukan

- Total volume pemupukan
- Rata-rata dosis per sesi
- Total sesi pemupukan
- Tombol reset statistik

### 3. Sistem Pakar (Kalkulator Dosis)

Menghitung dosis pemupukan yang direkomendasikan berdasarkan:

- **Komoditas**: Jagung, Cabai Merah, Kentang, Alpukat, Buah Naga, Durian, Kakao, Karet, Sawit, Kopi, Pala, Pisang, Tebu
- **Umur Tanaman (HST)**: Hari Setelah Tanam

#### Tabel Dosis Sistem Pakar

| Komoditas   | Umur (HST) | Dosis (g) |
| ----------- | ---------- | --------- |
| Jagung      | 0-20       | 3.6       |
| Jagung      | ≥21        | 2.9       |
| Cabai Merah | Semua      | 2.9       |
| Kentang     | 0-20       | 6.0       |
| Kentang     | >20        | 2.4       |
| Alpukat     | 0-90       | 80.0      |
| Alpukat     | 91-180     | 315.0     |
| Alpukat     | >180       | 1325.0    |
| Sawit       | 0-30       | 100.0     |
| Sawit       | 31-240     | 150.0     |
| Sawit       | >240       | 200.0     |
| Kopi        | 0-14       | 106.0     |
| Kopi        | 15-120     | 80.0      |
| Kopi        | 121-210    | 53.0      |
| Kopi        | 211-330    | 26.0      |
| Kopi        | >330       | 20.0      |
| Pisang      | 0-167      | 100.0     |
| Pisang      | ≥168       | 150.0     |

_Lihat kode lengkap untuk dosis komoditas lainnya._

### 4. Pengaturan Manual

- Input dosis manual dalam gram
- Kirim pengaturan ke alat ESP32

## 🚀 Cara Menjalankan

### Prerequisites

- Node.js (versi 18+)
- npm atau yarn
- Expo CLI
- Perangkat Android/iOS atau emulator

### Instalasi

```bash
# Clone repositori
cd alburdat-mobile

# Install dependencies
npm install
```

### Menjalankan Aplikasi

```bash
# Mode development
npm start

# Mode Android
npm run android

# Mode iOS
npm run ios

# Mode Web
npm run web
```

## 🔌 Koneksi ESP32

Aplikasi ini terhubung dengan perangkat ESP32 pada IP default:

```
192.168.4.1
```

### Endpoint API

| Endpoint                     | Method | Deskripsi             |
| ---------------------------- | ------ | --------------------- |
| `/api/setmanual?val={value}` | GET    | Mengatur dosis manual |
| `/api/resetstats`            | GET    | Mereset statistik     |

## 🎨 Tema

### Light Theme

- Primary: `#388E3C` (Hijau)
- Background: `#E8F5E9` (Hijau muda)
- Card: `#FFFFFF`

### Dark Theme

- Primary: `#388E3C` (Hijau)
- Background: `#121212`
- Card: `#1E1E1E`

## 📱 Kompatibilitas

- Android 6.0+ (API 23)
- iOS 13+
- Mendukung tablet

## 📄 Lisensi

Proprietary - All rights reserved

## 👨‍💻 Author

- Nur Amin
