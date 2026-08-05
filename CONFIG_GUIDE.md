# Panduan Menggunakan config.js

## Ringkasan

File `config.js` adalah file konfigurasi central untuk semua pengaturan website SGBVA. Dengan mengedit satu file ini, Anda bisa mengubah:

1. **Tanggal & waktu webinar** - Otomatis update semua countdown
2. **Akses assessment & free gift** - Bypass waktu untuk testing
3. **Foto speaker & host** - Ganti tanpa edit HTML
4. **Google Apps Script URL** - Setting backend
5. **Item free gift** - Daftar gift yang diberikan
6. **Template email** - Email konfirmasi pendaftaran

---

## Cara Menggunakan

### 1. Ganti Tanggal Webinar

Edit bagian `webinar` di config.js:

```javascript
webinar: {
  day1: {
    date: '2026-08-07',  // ← Ganti tanggal di sini
    time: '19:00',        // ← Ganti waktu di sini
    timezone: 'Asia/Jakarta',
    title: 'Virtual Assistant: Peluang Karier yang Realistis',
    zoomLink: 'https://zoom.us/j/1234567890'
  },
  day2: {
    date: '2026-08-08',
    time: '19:00',
    // ...
  },
  day3: {
    date: '2026-08-09',
    time: '19:00',
    // ...
  }
}
```

**Efek yang terjadi otomatis:**
- Countdown timer di navbar berubah
- Tanggal di hero section berubah
- Akses free gift menyesuaikan (buka 2 jam setelah webinar mulai)
- Calendar URL otomatis diupdate

---

### 2. Bypass Waktu (Untuk Testing)

#### Bypass Free Gift:
```javascript
freeGift: {
  bypassTimeRestriction: true,  // ← Set true untuk buka kapan saja
  openAfterWebinar: true,
  assessmentRequired: true
}
```

#### Bypass Assessment:
```javascript
assessment: {
  bypassTimeRestriction: true,  // ← Set true untuk buka kapan saja
  showInFreeGift: true
}
```

**Kapan menggunakan:**
- **Testing**: Set `true` untuk test tanpa harus tunggu waktu webinar
- **Production**: Set `false` agar mengikuti jadwal sebenarnya

---

### 3. Ganti Foto Speaker

Edit bagian `photos` di config.js:

```javascript
photos: {
  speaker: {
    main: 'speaker-baru.png',     // ← Foto di profil section
    hero: 'speaker-hero-baru.png', // ← Foto di hero section
    name: 'Nama Speaker Baru',
    title: 'Judul Speaker Baru',
    bio: 'Bio speaker baru yang lebih panjang...'
  },
  host: {
    main: 'host-baru.png',
    name: 'Nama Host Baru',
    title: 'Host & Moderator'
  },
  logo: 'logo-baru.png'
}
```

**Tips:**
- Simpan foto di root folder yang sama dengan index.html
- Format: PNG, JPG, atau SVG
- Ukuran optimal: 400x400px untuk foto speaker

---

### 4. Setting Google Apps Script URL

Edit bagian `gasUrl`:

```javascript
gasUrl: 'https://script.google.com/macros/s/AKfycbx.../exec'
```

**Langkah mendapatkan URL:**
1. Deploy Google Apps Script sebagai Web App
2. Copy URL dari deployment
3. Paste di config.js

---

### 5. Mengedit Item Free Gift

Edit bagian `freeGifts`:

```javascript
freeGifts: [
  {
    id: 'ai-prompt-pack',
    name: 'AI Prompt Pack',
    description: 'Prompt AI siap pakai untuk membantu pekerjaan VA',
    icon: 'lightning',
    color: 'blue',
    downloadUrl: 'https://drive.google.com/file/d/xxx/view'  // ← URL download sebenarnya
  },
  {
    id: 'google-workspace-cheat-sheet',
    name: 'Google Workspace Cheat Sheet',
    description: 'Referensi cepat fitur Google Workspace untuk VA',
    icon: 'database',
    color: 'green',
    downloadUrl: 'https://drive.google.com/file/d/yyy/view'  // ← URL download sebenarnya
  },
  // Tambah gift baru di sini
  {
    id: 'gift-baru',
    name: 'Nama Gift Baru',
    description: 'Deskripsi gift baru',
    icon: 'star',
    color: 'purple',
    downloadUrl: 'https://...'
  }
]
```

---

### 6. Mengedit Template Email

Edit bagian `email`:

```javascript
email: {
  subject: 'Judul Email Baru',
  greeting: 'Halo {{name}}!',
  body: `Isi email baru.

TANGGAL: {{date}}
WAKTU: {{time}} WIB
LINK ZOOM: {{zoomLink}}

--- LINK PENTING ---
Free Gift: {{siteUrl}}/freegift-day1.html

Pesan penutup.
Tim SGBVA`
}
```

**Template variables yang tersedia:**
- `{{name}}` - Nama pendaftar
- `{{date}}` - Tanggal webinar
- `{{time}}` - Waktu webinar
- `{{zoomLink}}` - Link Zoom
- `{{calendarUrl}}` - URL Google Calendar
- `{{siteUrl}}` - Base URL website

---

### 7. Mengedit Speaker Credentials

Edit bagian `speakerCredentials`:

```javascript
speakerCredentials: [
  'Poin credential 1',
  'Poin credential 2',
  'Poin credential 3',
  'Poin credential 4'  // ← Tambah poin baru di sini
]
```

---

## Contoh Penggunaan

### Contoh 1: Ganti Tanggal Webinar

**Sebelum:**
```javascript
webinar: {
  day1: {
    date: '2026-08-07',
    time: '19:00',
    // ...
  }
}
```

**Sesudah:**
```javascript
webinar: {
  day1: {
    date: '2026-08-15',  // ← Tanggal baru
    time: '20:00',        // ← Waktu baru
    // ...
  }
}
```

**Efek otomatis:**
- ✅ Countdown timer berubah ke 15 Agustus 2026, 20:00 WIB
- ✅ Tanggal di hero section berubah
- ✅ Free gift membuka otomatis jam 22:00 WIB (2 jam setelah webinar)
- ✅ Calendar URL otomatis diupdate

---

### Contoh 2: Testing Free Gift

**Sebelum (production):**
```javascript
freeGift: {
  bypassTimeRestriction: false,
  // ...
}
```

**Sesudah (testing):**
```javascript
freeGift: {
  bypassTimeRestriction: true,  // ← Aktifkan bypass
  // ...
}
```

**Efek:**
- ✅ Free gift bisa diakses kapan saja tanpa harus tunggu webinar
- ✅ Berguna untuk testing sebelum webinar dimulai

**Setelah testing:**
```javascript
freeGift: {
  bypassTimeRestriction: false,  // ← Kembalikan ke false
  // ...
}
```

---

### Contoh 3: Ganti Foto Speaker

**Sebelum:**
```javascript
photos: {
  speaker: {
    main: 'DaniH.png',
    hero: 'DaniH.png',
    name: 'Dani Herdiana',
    // ...
  }
}
```

**Sesudah:**
```javascript
photos: {
  speaker: {
    main: 'speaker-baru.jpg',      // ← Foto baru
    hero: 'speaker-hero-baru.jpg', // ← Foto hero baru
    name: 'John Doe',               // ← Nama baru
    title: 'Senior VA Expert',      // ← Title baru
    bio: 'Bio baru yang lebih detail tentang speaker baru...'
  }
}
```

**Efek:**
- ✅ Foto speaker berubah di semua halaman
- ✅ Nama, title, dan bio berubah otomatis
- ✅ Tidak perlu edit HTML

---

## File yang Terpengaruh

Ketika Anda mengedit `config.js`, perubahan akan otomatis terjadi di:

1. **index.html**
   - Countdown timer
   - Tanggal & waktu di hero section
   - Foto & profil speaker
   - Semua link & URL

2. **freegift-day1.html**
   - Countdown timer free gift
   - Akses free gift (bypass atau ikuti jadwal)
   - Informasi free gift

3. **assessment.html**
   - Akses assessment (bypass atau ikuti jadwal)
   - Gas URL untuk tracking

4. **registration.js**
   - Gas URL untuk mengirim data

---

## Troubleshooting

### Perubahan tidak muncul?

1. **Clear browser cache:**
   - Tekan `Ctrl + Shift + R` (Windows/Linux) atau `Cmd + Shift + R` (Mac)

2. **Pastikan config.js di-load:**
   - Buka Developer Tools (F12)
   - Cek tab Console untuk error
   - Pastikan tidak ada error "SGBVA_CONFIG is not defined"

3. **Cek urutan script:**
   - `config.js` harus di-load SEBELUM `registration.js`
   - Contoh urutan yang benar:
     ```html
     <script src="config.js"></script>
     <script src="registration.js"></script>
     ```

### Countdown tidak berubah?

1. **Cek format tanggal:**
   - Harus format: `YYYY-MM-DD`
   - Contoh: `'2026-08-07'` (benar), `'07-08-2026'` (salah)

2. **Cek format waktu:**
   - Harus format: `HH:mm`
   - Contoh: `'19:00'` (benar), `'7:00 PM'` (salah)

### Foto tidak berubah?

1. **Cek nama file:**
   - Pastikan file foto ada di root folder
   - Case-sensitive: `'Speaker.png'` ≠ `'speaker.png'`

2. **Cek path:**
   - Gunakan nama file saja, bukan path lengkap
   - Contoh: `'speaker.png'` (benar), `'/images/speaker.png'` (salah)

---

## Quick Reference

| Pengaturan | Lokasi di config.js | Default |
|---|---|---|
| Tanggal webinar day 1 | `webinar.day1.date` | `'2026-08-07'` |
| Waktu webinar day 1 | `webinar.day1.time` | `'19:00'` |
| Bypass free gift | `freeGift.bypassTimeRestriction` | `false` |
| Bypass assessment | `assessment.bypassTimeRestriction` | `false` |
| Foto speaker | `photos.speaker.main` | `'DaniH.png'` |
| Gas URL | `gasUrl` | `'YOUR_GOOGLE_APPS_SCRIPT_URL'` |

---

## Support

Jika mengalami masalah:
1. Cek browser console untuk error messages
2. Pastikan config.js di-load dengan benar
3. Clear browser cache
4. Restart development server
