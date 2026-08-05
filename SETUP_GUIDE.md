# Panduan Setup SGBVA Landing Page

## 1. Deploy Google Apps Script

### Langkah-langkah:

1. **Buka Google Apps Script**
   - Kunjungi: https://script.google.com
   - Klik "New Project"

2. **Copy Script**
   - Buka file `google-apps-script.gs`
   - Copy semua isi script
   - Paste ke editor Google Apps Script

3. **Update Spreadsheet ID**
   - Buka Google Sheets yang ingin Anda gunakan: https://docs.google.com/spreadsheets/d/1ZidoqHnd15DSr3iqNVQ8P668PZ1ObPZBAZNhg479YJE/edit
   - Copy ID spreadsheet dari URL (bagian setelah `/d/` dan sebelum `/edit`)
   - Ganti `YOUR_SPREADSHEET_ID` di script dengan ID tersebut

4. **Deploy sebagai Web App**
   - Klik "Deploy" → "New deployment"
   - Pilih type: "Web app"
   - Description: "SGBVA Registration Handler"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Klik "Deploy"
   - Copy Web App URL yang muncul

5. **Update index.html**
   - Buka file `index.html`
   - Cari baris: `window.SGBVA_GAS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';`
   - Ganti `YOUR_GOOGLE_APPS_SCRIPT_URL` dengan URL Web App yang sudah di-copy

## 2. Fitur Free Gift Download

### Cara Kerja:
- Setelah user menyelesaikan assessment, mereka akan melihat free gift
- Klik tombol "Download Free Gift Certificate" untuk mengunduh sertifikat sebagai gambar PNG
- Sertifikat berisi:
  - Nama user
  - Tanggal
  - Daftar free gift yang diterima
  - Branding SGBVA

### Teknologi yang Digunakan:
- html2canvas untuk convert HTML ke gambar
- Download otomatis sebagai PNG

## 3. Testing

### Test Registration Form:
1. Buka `index.html` di browser
2. Isi form pendaftaran
3. Submit form
4. Cek apakah data masuk ke Google Sheets
5. Cek apakah redirect ke `freegift-day1.html` berhasil

### Test Free Gift Download:
1. Login dengan email yang sudah terdaftar
2. Selesaikan assessment
3. Klik tombol "Download Free Gift Certificate"
4. Pastikan gambar ter-download dengan benar

## Troubleshooting

### Form Tidak Mengirim Data ke Google Sheets?
- Pastikan `SGBVA_GAS_URL` sudah diisi dengan benar
- Pastikan Google Apps Script sudah di-deploy sebagai Web App
- Pastikan Spreadsheet ID sudah benar
- Buka browser console (F12) untuk melihat error

### Free Gift Tidak Bisa di-Download?
- Pastikan html2canvas library sudah ter-load
- Coba refresh halaman
- Cek browser console untuk error message

## File Structure

```
LandingPageSGBVA/
├── index.html              # Halaman utama dengan form pendaftaran
├── freegift-day1.html      # Halaman free gift dengan fitur download
├── google-apps-script.gs   # Script untuk Google Apps Script
├── assessment.html         # Halaman assessment (opsional)
├── registration.js         # JavaScript registration logic
├── css/
│   └── main.css           # CSS styles
├── sgbva1.png             # Logo SGBVA
├── DaniH.png              # Foto speaker
└── lusi.png               # Foto host
```

## Support

Jika mengalami masalah, cek:
1. Browser console untuk error messages
2. Google Apps Script execution log
3. Network tab di browser DevTools
