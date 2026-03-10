export const hitungSistemPakar = (umurInput, komoditasIdxInput) => {
  let dosisPakar = 0.0;
  let ruleTerpenuhi = false;

  // Pastikan input berupa angka integer
  const umur = parseInt(umurInput, 10);
  const komoditasIdx = parseInt(komoditasIdxInput, 10);

  if (isNaN(umur) || isNaN(komoditasIdx)) return 0.0;

  if (komoditasIdx == 1) { // Jagung 
    if (umur >= 0 && umur <= 20) { dosisPakar = 3.6; ruleTerpenuhi = true; } 
    else if (umur >= 21) { dosisPakar = 2.9; ruleTerpenuhi = true; } 
  }
  else if (komoditasIdx == 2) { // Cabai Merah 
    if ((umur >= 0 && umur <= 21) || (umur >= 22 && umur <= 42) || (umur >= 43)) { dosisPakar = 2.9; ruleTerpenuhi = true; } 
  }
  else if (komoditasIdx == 3) { // Kentang 
    if (umur >= 0 && umur <= 20) { dosisPakar = 6.0; ruleTerpenuhi = true; } 
    else if (umur > 20) { dosisPakar = 2.4; ruleTerpenuhi = true; } 
  }
  else if (komoditasIdx == 4) { // Alpukat 
    if (umur >= 0 && umur <= 90) { dosisPakar = 80.0; ruleTerpenuhi = true; } 
    else if (umur > 90 && umur <= 180) { dosisPakar = 315.0; ruleTerpenuhi = true; } 
    else if (umur > 180) { dosisPakar = 1325.0; ruleTerpenuhi = true; } 
  }
  else if (komoditasIdx == 5) { // Buah Naga 
    if (umur >= 0) { dosisPakar = 15.0; ruleTerpenuhi = true; } 
  }
  else if (komoditasIdx == 6) { // Durian 
    if (umur >= 0 && umur <= 720) { dosisPakar = 200.0; ruleTerpenuhi = true; } 
    else if (umur > 720 && umur <= 1440) { dosisPakar = 400.0; ruleTerpenuhi = true; } 
    else if (umur >= 1800 && umur <= 2880) { dosisPakar = 600.0; ruleTerpenuhi = true; } 
    else if (umur > 2880) { dosisPakar = 850.0; ruleTerpenuhi = true; } 
  }
  else if (komoditasIdx == 7) { // Kakao 
    if (umur >= 0 && umur <= 360) { dosisPakar = 25.0; ruleTerpenuhi = true; } 
    else if (umur > 360 && umur <= 720) { dosisPakar = 45.0; ruleTerpenuhi = true; } 
    else if (umur > 720 && umur <= 1080) { dosisPakar = 90.0; ruleTerpenuhi = true; } 
    else if (umur > 1080 && umur <= 1440) { dosisPakar = 180.0; ruleTerpenuhi = true; } 
    else if (umur > 1440) { dosisPakar = 220.0; ruleTerpenuhi = true; } 
  }
  else if (komoditasIdx == 8) { // Karet 
    if (umur >= 0 && umur <= 1080) { dosisPakar = 250.0; ruleTerpenuhi = true; } 
    else if (umur > 1080 && umur <= 1440) { dosisPakar = 300.0; ruleTerpenuhi = true; } 
    else if (umur > 1440 && umur <= 1800) { dosisPakar = 350.0; ruleTerpenuhi = true; } 
    else if (umur > 1800) { dosisPakar = 200.0; ruleTerpenuhi = true; } 
  }
  else if (komoditasIdx == 9) { // Sawit 
    if (umur >= 0 && umur <= 30) { dosisPakar = 100.0; ruleTerpenuhi = true; } 
    else if (umur > 30 && umur <= 240) { dosisPakar = 150.0; ruleTerpenuhi = true; } 
    else if (umur > 240) { dosisPakar = 200.0; ruleTerpenuhi = true; } 
  }
  else if (komoditasIdx == 10) { // Kopi 
    if (umur >= 0 && umur <= 14) { dosisPakar = 106.0; ruleTerpenuhi = true; } 
    else if (umur > 14 && umur <= 120) { dosisPakar = 80.0; ruleTerpenuhi = true; } 
    else if (umur > 120 && umur <= 210) { dosisPakar = 53.0; ruleTerpenuhi = true; } 
    else if (umur > 210 && umur <= 330) { dosisPakar = 26.0; ruleTerpenuhi = true; } 
    else if (umur > 330) { dosisPakar = 20.0; ruleTerpenuhi = true; } 
  }
  else if (komoditasIdx == 11) { // Pala 
    if (umur >= 0 && umur <= 720) { dosisPakar = 20.0; ruleTerpenuhi = true; } 
    else if (umur > 720 && umur <= 1440) { dosisPakar = 40.0; ruleTerpenuhi = true; } 
    else if (umur > 1440 && umur <= 2520) { dosisPakar = 80.0; ruleTerpenuhi = true; } 
    else if (umur > 2520 && umur <= 5400) { dosisPakar = 100.0; ruleTerpenuhi = true; }
    else if (umur > 5400) { dosisPakar = 120.0; ruleTerpenuhi = true; } 
  }
  else if (komoditasIdx == 12) { // Pisang 
    if (umur >= 0 && umur < 168) { dosisPakar = 100.0; ruleTerpenuhi = true; } 
    else if (umur >= 168) { dosisPakar = 150.0; ruleTerpenuhi = true; } 
  }
  else if (komoditasIdx == 13) { // Tebu 
    if (umur >= 0) { dosisPakar = 3.75; ruleTerpenuhi = true; } 
  }

  if (!ruleTerpenuhi) return 0.0;
  return dosisPakar;
};