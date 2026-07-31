# SGBVA 3-Day Webinar Landing Page

## Project Documentation & System Flow

**Version:** 1.0  
**Date:** July 31, 2026  
**Status:** Planning / System Analysis  

---

## Daftar Isi

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Webinar Schedule](#3-webinar-schedule)
4. [Landing Page Flow](#4-landing-page-flow)
5. [Registration Flow](#5-registration-flow)
6. [Webinar Flow](#6-webinar-flow)
7. [Bonus Unlock Flow](#7-bonus-unlock-flow)
8. [Day 1 Assessment](#8-day-1-assessment)
9. [Day 2 Assessment](#9-day-2-assessment)
10. [Day 3 Assessment](#10-day-3-assessment)
11. [Scoring System](#11-scoring-system)
12. [Recommendation Engine](#12-recommendation-engine)
13. [Email Automation](#13-email-automation)
14. [Bonus Flow](#14-bonus-flow)
15. [Landing Page Sitemap](#15-landing-page-sitemap)
16. [UI Components](#16-ui-components)
17. [API Endpoints (Google Apps Script)](#17-api-endpoints-google-apps-script)
18. [Data Model](#18-data-model)
19. [Future Features](#19-future-features)
20. [Deliverable & Appendix](#20-deliverable--appendix)

---

## 1. Project Overview

### Nama Project

**SGBVA 3-Day Webinar Landing Page**

### Tujuan

Membuat landing page webinar profesional yang mampu:

- **Meningkatkan engagement peserta** melalui konten interaktif, countdown timer, dan bonus harian yang terkunci/terbuka secara terjadwal
- **Memberikan free gift setiap hari** sebagai insentif partisipasi aktif, dengan mekanisme unlock yang menciptakan urgensi
- **Melakukan assessment otomatis** yang mengukur kesiapan peserta di 3 dimensi: fondasi, kesiapan klien, dan profesionalitas
- **Memberikan rekomendasi personal** berdasarkan hasil assessment, mengarahkan peserta ke program SGBVA yang paling sesuai
- **Melakukan soft selling** menuju program training SGBVA melalui rekomendasi yang relevan dan personal, bukan hard selling

### Context

SGBVA (Smart Generalist Virtual Assistant) adalah program training yang membantu individu menjadi Virtual Assistant profesional. Landing page ini berfungsi sebagai funnel utama: dari awareness (webinar gratis) -> consideration (assessment + rekomendasi) -> conversion (program training).

---

## 2. Tech Stack & Architecture

### Frontend (GitHub Pages)

| Komponen | Teknologi |
|---|---|
| Hosting | GitHub Pages (gratis, HTTPS, custom domain opsional) |
| Framework | Vanilla HTML/CSS/JS atau Astro (static site generator) |
| CSS Framework | Tailwind CSS via CDN |
| Animasi | CSS Animations + AOS (Animate On Scroll) |
| Charts | Chart.js untuk visualisasi assessment result |
| Icons | Lucide Icons / Heroicons |
| Fonts | Google Fonts (e.g. Plus Jakarta Sans, DM Sans) |

### Backend (Google Apps Script)

| Komponen | Teknologi |
|---|---|
| Runtime | Google Apps Script (V8) |
| Database | Google Sheets (sebagai database) |
| Email | GmailApp / Google Apps Script Mail API |
| Deployment | Web App (deploy sebagai web app, aksesibel via URL) |
| Scheduling | Trigger time-based untuk auto-lock/unlock bonus |
| File Storage | Google Drive untuk file bonus (PDF, spreadsheet, dll.) |

### Architecture Diagram (Conceptual)

```
+-------------------------------------+
|          USER (Browser)              |
+-------------------------------------+
         |              ^
         v              |
  +----------------+  HTTP/JSON  +-------------------+
  |  GitHub Pages  |  <------->  | Google Apps Script |
  |  (Frontend)    |             |   (Backend API)    |
  +----------------+             +-------------------+
                                         |
                                 +-------+--------+
                                 |                |
                                 v                v
                          +----------+    +-----------+
                          | Google   |    | Gmail     |
                          | Sheets   |    | (Email)   |
                          | (DB)     |    +-----------+
                          +----------+
                                 |
                                 v
                          +----------+
                          | Google   |
                          | Drive    |
                          | (Files)  |
                          +----------+
```

### Deployment Strategy

1. **Frontend**: Push ke GitHub repo -> auto-deploy ke GitHub Pages
2. **Backend**: Deploy Google Apps Script sebagai Web App -> URL digunakan sebagai API endpoint di frontend
3. **CORS**: Google Apps Script Web App support CORS secara default saat di-deploy dengan "Execute as: Me" dan "Who has access: Anyone"

---

## 3. Webinar Schedule

### Overview

| Detail | Day 1 | Day 2 | Day 3 |
|---|---|---|---|
| **Tanggal** | 6 August 2026 | 7 August 2026 | 8 August 2026 |
| **Jam Webinar** | 19:30 WIB | 19:30 WIB | 19:30 WIB |
| **Bonus Unlock** | 21:00 WIB | 21:00 WIB | 21:00 WIB |
| **Bonus Lock** | 00:00 WIB | 00:00 WIB | 00:00 WIB |
| **Topik Utama** | VA Career Foundations | Client Readiness | Professional Readiness |
| **Assessment** | Basic Skills Assessment | Client Readiness Assessment | Professional Readiness Assessment |

### Timeline Detail

```
============================== Day 1 ==============================+

  19:30        21:00                     00:00 (Day 2)
   |             |                          |
   |<-- LIVE -->|<--- BONUS UNLOCKED --->|<-- BONUS LOCKED -->+
   |  Webinar   |   Free Gift Available   |  Not Available     |
   |            |                         |                    |
===================================================================+

============================== Day 2 ==============================+

  19:30        21:00                     00:00 (Day 3)
   |             |                          |
   |<-- LIVE -->|<--- BONUS UNLOCKED --->|<--- BONUS LOCKED -->|
   |  Webinar   |   Free Gift Available   |   Not Available     |
   |            |                         |                     |
===================================================================+

============================== Day 3 ==============================+

  19:30        21:00                     00:00 (Post)
   |             |                          |
   |<-- LIVE -->|<--- BONUS UNLOCKED --->|<--- FINAL STATE --->|
   |  Webinar   |   Free Gift Available   |   Assessment +      |
   |            |                         |   Results Ready     |
===================================================================+
```

### Status Webinar

| Status | Kondisi | UX Behavior |
|---|---|---|
| **Upcoming** | Sebelum 19:30 WIB hari H | Countdown timer, "Belum dimulai" badge, CTA Register |
| **Live** | 19:30 - 21:00 WIB | "LIVE" badge animasi merah, timer berjalan, konten webinar aktif |
| **Finished** | Setelah 21:00 WIB | "Selesai" badge, akses bonus terbuka (jika sesuai jadwal), assessment tersedia |

---

## 4. Landing Page Flow

### User Journey Overview

```
Landing Page (/)
  |
  v
+------------+
|   Hero     | --> Headline kuat, CTA Register, countdown ke webinar
+------------+
  |
  v
+------------+
|  About     | --> Detail webinar: topik, manfaat, apa yang dipelajari
+------------+
  |
  v
+------------+
|  Speaker   | --> Profil pembicara, kredibilitas, foto
+------------+
  |
  v
+------------+
|  Agenda    | --> Timeline 3 hari, topik per hari, durasi
+------------+
  |
  v
+------------+
|  Bonus     | --> Preview bonus per hari, "terkunci" / "terbuka"
+------------+
  |
  v
+------------+
|  FAQ       | --> Pertanyaan umum, accordion format
+------------+
  |
  v
+------------+
|  Register  | --> Form registrasi, validasi, submit
+------------+
  |
  v
+------------+
|  Countdown | --> Timer countdown ke waktu webinar berikutnya
+------------+
  |
  v
+------------+
|  Footer    | --> Branding, link, copyright, social media
+------------+
```

### Detail Per Section

#### Hero Section

- **Headline**: Judul webinar yang compelling (e.g. "Jadi Virtual Assistant Profesional dalam 3 Hari")
- **Subheadline**: Benefit statement yang jelas
- **CTA Button**: "Daftar Sekarang" -> scroll ke form registrasi
- **Countdown Timer**: Countdown real-time ke webinar Day 1 (19:30 WIB, 6 Agustus 2026)
- **Visual**: Background gradient atau ilustrasi yang relevan
- **Social proof**: Jumlah registran (e.g. "2,500+ sudah mendaftar")

#### About Webinar Section

- **Headline**: "Apa itu SGBVA Webinar?"
- **Deskripsi**: Penjelasan singkat tentang webinar 3 hari
- **Key Benefits**: 3-4 bullet points benefit utama
- **Format**: Online, gratis, 3 hari berturut-turut
- **Duration**: 1.5 jam per sesi
- **Visual**: Ikon atau ilustrasi per benefit

#### Speaker Section

- **Profil Pembicara**: Foto, nama, title, bio singkat
- **Kredibilitas**: Pengalaman, portofolio, achievements
- **Social Media Links**: LinkedIn, Instagram, dll.
- **Carousel/Grid**: Jika ada lebih dari 1 speaker

#### Agenda Section

- **Timeline Layout**: Visual timeline 3 hari
- **Per Hari**:
  - Day 1: VA Career Foundations (topik detail)
  - Day 2: Client Readiness (topik detail)
  - Day 3: Professional Readiness (topik detail)
- **Duration Info**: Jam mulai, durasi, waktu break
- **Bonus Preview**: Singgungan bonus yang tersedia per hari

#### Bonus Section

- **Card Layout**: 3 kartu bonus (1 per hari)
- **Status Indicators**: Ikon gembok (locked) / gembok terbuka (unlocked)
- **Hover/Click Effect**: Preview ringkas bonus saat di-hover
- **Availability Badge**: "Unlock 21:00 WIB" atau "Tersedia Sekarang"

#### FAQ Section

- **Accordion Format**: Expandable/collapsible
- **Minimum 6-8 pertanyaan**: Covering topik umum
- **Contoh pertanyaan**:
  - Apakah webinar ini gratis?
  - Bagaimana cara mendapatkan bonus?
  - Apakah ada replay?
  - Siapa yang cocok mengikuti webinar ini?
  - Bagaimana cara mengikuti assessment?
  - Apakah sertifikat tersedia?

#### Registration Section

- **Form Fields**: Nama, Email, WhatsApp, Pilihan Hari
- **Validation**: Real-time validation
- **CTA Button**: "Daftar Sekarang" dengan loading state
- **Privacy Notice**: "Kami tidak akan spam"
- **Success State**: Redirect atau modal sukses

#### Countdown Section

- **Countdown Timer**: Countdown ke waktu webinar berikutnya
- **Dynamic**: Berubah berdasarkan status webinar (upcoming/live/finished)
- **Visual**: Large numbers dengan label (hari, jam, menit, detik)

#### Footer Section

- **Brand Logo**: SGBVA branding
- **Navigation Links**: Link ke section lain
- **Social Media**: Instagram, YouTube, LinkedIn
- **Copyright**: Tahun dan hak cipta
- **Contact**: Email support

---

## 5. Registration Flow

### Flow Diagram

```
User mengisi form
  |
  v
Frontend Validation
  |-- Nama: required, min 2 karakter
  |-- Email: required, format valid
  |-- WhatsApp: required, format Indonesia (+62)
  |-- Hari: required, pilihan checkbox (Day 1, 2, 3 atau All)
  |
  v
Submit ke Google Apps Script API
  |
  v
Backend Validation
  |-- Cek duplikat email di Google Sheets
  |-- Bersihkan input (sanitize)
  |-- Generate unique ID registrasi
  |
  v
Simpan ke Google Sheets (tab "Registrations")
  |
  v
Kirim Email Konfirmasi
  |-- Subject: "Selamat! Kamu Terdaftar di SGBVA Webinar"
  |-- Isi: Detail jadwal, link webinar, bonus info
  |
  v
Frontend: Tampilkan Success State
  |-- Modal "Berhasil Mendaftar!"
  |-- Detail: Jadwal, link, instruksi
  |-- CTA: "Add to Calendar" (Google Calendar / iCal)
```

### Data yang Diminta

| Field | Type | Required | Validasi |
|---|---|---|---|
| Nama Lengkap | Text | Yes | Min 2 karakter, max 100, hanya huruf dan spasi |
| Email | Email | Yes | Format valid, unik (tidak ada duplikat) |
| No. WhatsApp | Telpon | Yes | Format Indonesia, 10-13 digit |
| Hari yang diikuti | Checkbox | Yes | Minimal 1 dipilih: Day 1 / Day 2 / Day 3 |
| Referral Code | Text | No | Opsional, untuk tracking dari mana user datang |

### Validasi

#### Frontend Validation

- **Real-time**: Setiap field di-validasi saat user mengisi (onBlur) dan saat submit
- **Visual Feedback**: Border merah + pesan error di bawah field
- **Email Duplikat Check**: Async check ke backend saat user leave email field
- **Prevent Double Submit**: Disable button setelah diklik, loading state

#### Backend Validation

- **Sanitize Input**: Remove XSS characters, trim whitespace
- **Email Format**: Regex validation
- **Email Uniqueness**: Query Google Sheets, cek apakah email sudah ada
- **Rate Limiting**: Maks 3 registrasi per IP per menit

### Penggunaan Email

1. **Email Konfirmasi**: Dikirim setelah registrasi berhasil
2. **Email Pengingat**: Dikirim 1 jam sebelum webinar dimulai
3. **Email Bonus Unlock**: Dikirim saat bonus terbuka (21:00 WIB)
4. **Email Assessment**: Dikirim setelah webinar selesai, mengajak isi assessment
5. **Email Hasil Assessment**: Dikirim setelah assessment di-submit
6. **Email Follow-up**: Dikirim 1-2 hari setelah webinar untuk soft selling

---

## 6. Webinar Flow

### Status Transisi

```
+-----------+    19:30 WIB    +--------+    21:00 WIB    +----------+
| Upcoming  | -------------> |  Live  | --------------> | Finished |
+-----------+                 +--------+                 +----------+
     ^                                                        |
     |                                                        |
     +-- (reset jika webinar belum dimulai di hari lain) -----+
```

### Behavior Per Status

#### Upcoming

**Kondisi**: Waktu sekarang < 19:30 WIB hari H

**UI Behavior**:

- Countdown timer aktif menunggu waktu mulai
- Badge "Coming Soon" atau "Upcoming"
- CTA: "Daftar Sekarang" atau "Add to Calendar"
- Section assessment: Tersembunyi atau disabled
- Section bonus: Terkunci (semua)

**Backend Behavior**:

- Endpoint `/status` mengembalikan `status: "upcoming"`
- Bonus status: `locked`
- Assessment status: `not_available`

#### Live

**Kondisi**: 19:30 WIB <= Waktu sekarang < 21:00 WIB

**UI Behavior**:

- "LIVE" badge dengan animasi pulse/blink merah
- Timer berjalan (elapsed time sejak mulai)
- Embed player YouTube/Zoom (opsional)
- CTA: "Tonton Sekarang"
- Section bonus: Masih terkunci
- Section assessment: Menampilkan persiapan ("Assessment akan tersedia setelah webinar")

**Backend Behavior**:

- Endpoint `/status` mengembalikan `status: "live"`
- Bonus status: `locked`
- Assessment status: `preparing`

#### Finished

**Kondisi**: Waktu sekarang >= 21:00 WIB

**UI Behavior**:

- Badge "Selesai" atau "Recording Available"
- Bonus section: Terbuka (jika masih dalam window 21:00-00:00)
- Assessment: Tersedia untuk diisi
- CTA: "Download Bonus" / "Isi Assessment Sekarang"
- Replay link (opsional): Tersedia

**Backend Behavior**:

- Endpoint `/status` mengembalikan `status: "finished"`
- Bonus status: `unlocked` (jika dalam window)
- Assessment status: `available`

### Timestamp Logic

```text
Untuk Day 1 (6 Agustus 2026):
  Upcoming : waktu sekarang < "2026-08-06 19:30 WIB"
  Live     : "2026-08-06 19:30 WIB" <= waktu sekarang < "2026-08-06 21:00 WIB"
  Finished : waktu sekarang >= "2026-08-06 21:00 WIB"

Untuk Day 2 (7 Agustus 2026):
  Upcoming : waktu sekarang < "2026-08-07 19:30 WIB"
  Live     : "2026-08-07 19:30 WIB" <= waktu sekarang < "2026-08-07 21:00 WIB"
  Finished : waktu sekarang >= "2026-08-07 21:00 WIB"

Untuk Day 3 (8 Agustus 2026):
  Upcoming : waktu sekarang < "2026-08-08 19:30 WIB"
  Live     : "2026-08-08 19:30 WIB" <= waktu sekarang < "2026-08-08 21:00 WIB"
  Finished : waktu sekarang >= "2026-08-08 21:00 WIB"
```

---

## 7. Bonus Unlock Flow

### Mekanisme Unlock

```
Time-based Lock System

+------------------+     +------------------+     +------------------+
|  LOCKED          |     |  UNLOCKED        |     |  LOCKED          |
|  00:00 - 20:59   | --> |  21:00 - 23:59   | --> |  00:00 - 20:59   |
|  Bonus TIDAK     |     |  Bonus TERSEDIA  |     |  Bonus TIDAK     |
|  bisa didownload |     |  bisa didownload |     |  bisa didownload |
+------------------+     +------------------+     +------------------+

Khusus untuk Day 3:
  Setelah 00:00 post-webinar -> bonus tetap unlocked (permanent, karena ini hari terakhir)
```

### UX Design

#### Saat Terkunci

- **Visual**: Kartu bonus dengan overlay gelap/gelap transparan
- **Ikon**: Gembok besar di tengah kartu
- **Teks**: "Bonus ini akan terbuka pada 21:00 WIB"
- **Countdown**: Timer ke waktu unlock (opsional, di kartu bonus)
- **CTA**: Disabled/greyed out
- **Hover**: Tampilkan preview bonus (nama file, deskripsi singkat) tapi tombol tetap disabled
- **Shimmer Effect**: Efek shimmer subtle untuk menunjukkan ada konten di baliknya

#### Saat Terbuka

- **Visual**: Kartu bonus dengan warna cerah/branding
- **Ikon**: Gembok terbuka atau ikon download
- **Teks**: "Bonus tersedia! Klik untuk download"
- **CTA**: "Download [Nama Bonus]" - button aktif, warna menonjol
- **Animation**: Unlock animation (fade in, scale up, confetti kecil)
- **Hover**: Highlight card, tooltip info

#### Progressive Reveal

- Bonus Day 1 terbuka setelah Day 1 finished (21:00 WIB Day 1)
- Bonus Day 2 terbuka setelah Day 2 finished (21:00 WIB Day 2)
- Bonus Day 3 terbuka setelah Day 3 finished (21:00 WIB Day 3)
- Setelah terbuka, bonus tetap bisa diakses selama 3 hari ke depan

### UX Best Practices

1. **Never leave user guessing**: Selalu tampilkan kapan bonus akan terbuka
2. **Create anticipation**: Gunakan countdown dan visual locked yang menarik
3. **Celebrate unlock**: Animasi kecil saat bonus terbuka untuk dopamine hit
4. **Easy download**: Satu klik untuk download, tidak perlu registrasi ulang
5. **Download tracking**: Track siapa yang sudah download (untuk engagement analytics)
6. **Reminder**: Kirim email/push saat bonus baru saja terbuka

---

## 8. Day 1 Assessment

### Concept: VA Career Readiness Assessment

**Tujuan**: Mengukur fondasi dasar seseorang untuk memulai karir sebagai Virtual Assistant.

### Kategori & Penjelasan

#### 1. Work Experience

**Tujuan**: Mengukur pengalaman kerja profesional peserta.

- Apakah pernah bekerja full-time/part-time
- Jenis pekerjaan yang pernah dijalani
- Lama pengalaman kerja
- Jenis industri yang pernah digeluti

**Mengapa penting**: Pengalaman kerja menentukan seberapa cepat seseorang bisa beradaptasi dengan role VA. Seseorang dengan pengalaman administrasi akan lebih mudah bertransisi ke VA role dibanding yang belum pernah bekerja sama sekali. Namun, pengalaman bukan syarat mutlak.

#### 2. Admin Skills

**Tujuan**: Mengukur kemampuan administrasi dasar.

- Kemampuan mengelola email dan kalender
- Keahlian spreadsheet (Google Sheets / Excel)
- Kemampuan dokumentasi dan filing
- Organisasi dan time management

**Mengapa penting**: Admin skills adalah backbone dari pekerjaan VA. Seorang VA yang tidak bisa mengelola email atau membuat spreadsheet yang rapi akan kesulitan melayani klien dengan baik.

#### 3. Communication

**Tujuan**: Mengukur kemampuan komunikasi profesional.

- Kemampuan menulis email profesional
- Kemampuan berkomunikasi via chat (formal/informal)
- Kemampuan menyusun laporan ringkas
- Bahasa Inggris dasar (reading & writing)

**Mengapa penting**: VA adalah role yang heavy on communication. Komunikasi dengan klien harus jelas, profesional, dan efektif. Kemampuan bahasa Inggris menjadi nilai tambah untuk klien internasional.

#### 4. Digital Tools

**Tujuan**: Mengukur kemampuan menggunakan tools digital.

- Familiaritas dengan Google Workspace (Docs, Sheets, Drive)
- Kemampuan menggunakan tools komunikasi (Slack, Zoom, Teams)
- Familiaritas dengan tools project management (Trello, Asana, Notion)
- Kemampuan belajar tools baru dengan cepat

**Mengapa penting**: VA modern harus lancar menggunakan berbagai tools digital. Klien tidak akan menunggu VA belajar tools saat sudah mulai bekerja.

#### 5. Remote Readiness

**Tujuan**: Mengukur kesiapan bekerja dari jarak jauh.

- Koneksi internet yang stabil
- Peralatan kerja yang memadai (laptop, headset, dll.)
- Lingkungan kerja yang mendukung (workspace di rumah)
- Disiplin diri dan kemampuan self-management

**Mengapa penting**: Bekerja remote memiliki tantangan tersendiri. Tanpa kesiapan ini, bahkan VA yang skilled sekalipun akan kesulitan deliver pekerjaan secara konsisten.

### Assessment Structure

| # | Kategori | Jumlah Soal | Tipe Soal | Bobot |
|---|---|---|---|---|
| 1 | Work Experience | 4 | Pilihan Ganda | 20% |
| 2 | Admin Skills | 4 | Pilihan Ganda | 20% |
| 3 | Communication | 4 | Pilihan Ganda | 20% |
| 4 | Digital Tools | 4 | Pilihan Ganda | 20% |
| 5 | Remote Readiness | 4 | Pilihan Ganda | 20% |
| **Total** | | **20** | | **100%** |

---

## 9. Day 2 Assessment

### Concept: Client Readiness Assessment

**Tujuan**: Mengukur kemampuan peserta dalam memahami dan melayani klien.

### Kategori & Penjelasan

#### 1. Client Understanding

**Tujuan**: Mengukur kemampuan memahami kebutuhan klien.

- Ability to identify client requirements
- Skill in prioritizing client tasks
- Understanding of different client types (solopreneur, SME, corporate)

**Mengapa penting**: Seorang VA harus bisa "membaca" klien. Memahami apa yang klien butuhkan, bahkan sebelum klien sendiri menyadarinya, adalah soft skill kritis.

#### 2. Service Delivery

**Tujuan**: Mengukur kemampuan menghasilkan deliverables berkualitas.

- Attention to detail dalam pekerjaan
- Kemampuan menyelesaikan tugas tepat waktu
- Quality control atas pekerjaan sendiri
- Kemampuan membuat SOP dan checklists

**Mengapa penting**: Klien membayar untuk hasil. VA yang konsisten deliver pekerjaan berkualitas akan mempertahankan klien jangka panjang.

#### 3. Professional Boundaries

**Tujuan**: Mengukur pemahaman tentang etika profesional dalam konteks VA.

- Memahami working hours vs after-hours
- Kemampuan mengatakan "tidak" dengan sopan
- Memahami scope creep dan bagaimana menanganinya
- Confidentiality dan data protection awareness

**Mengapa penting**: Tanpa boundaries yang jelas, VA akan burnout. Klien juga perlu diedukasi tentang batasan pekerjaan.

#### 4. Pricing & Value

**Tujuan**: Mengukur pemahaman tentang value proposition dan pricing.

- Memahami perbedaan hourly rate vs fixed pricing
- Kemampuan menilai value dari pekerjaan yang dilakukan
- Awareness tentang market rate untuk layanan VA

**Mengapa penting**: Banyak VA undercharge karena tidak paham value mereka. Memahami pricing membantu VA menawarkan harga yang fair dan sustainable.

### Assessment Structure

| # | Kategori | Jumlah Soal | Tipe Soal | Bobot |
|---|---|---|---|---|
| 1 | Client Understanding | 5 | Pilihan Ganda + Scenario | 25% |
| 2 | Service Delivery | 5 | Pilihan Ganda + Scenario | 25% |
| 3 | Professional Boundaries | 5 | Pilihan Ganda + Scenario | 25% |
| 4 | Pricing & Value | 5 | Pilihan Ganda + Scenario | 25% |
| **Total** | | **20** | | **100%** |

### Catatan: Scenario-based Questions

Day 2 assessment menggunakan skenario yang lebih realistis. Contoh:

> "Klien kamu minta laporan selesai besok, tapi kamu baru terima datanya jam 8 malam. Kamu sudah janji dinner dengan keluarga. Apa yang kamu lakukan?"

Pilihan jawaban mencerminkan berbagai approach, dan scoring didasarkan pada pendekatan yang paling profesional dan realistis.

---

## 10. Day 3 Assessment

### Concept: Professional Readiness Assessment

**Tujuan**: Mengukur kesiapan peserta untuk memulai karir VA secara profesional, termasuk aspek branding, mindset, dan bisnis.

### Kategori & Penjelasan

#### 1. Personal Branding

**Tujuan**: Mengukur pemahaman tentang membangun personal brand sebagai VA.

- Memiliki profil LinkedIn yang profesional
- Kemampuan membuat portofolio sederhana
- Pemahaman tentang niche dan positioning
- Awareness tentang online presence

**Mengapa penting**: Di era digital, personal brand adalah aset. Klien mencari VA melalui LinkedIn, portofolio, atau rekomendasi. Tanpa branding yang baik, talent terbaik pun akan tersembunyi.

#### 2. Business Mindset

**Tujuan**: Mengukur pola pikir entrepreneurship.

- Memahami VA sebagai bisnis, bukan hanya pekerjaan
- Kemampuan melakukan pitching dan negotiation
- Financial literacy sederhana (invoice, pajak, pricing)
- Goal setting dan business planning

**Mengapa penting**: Banyak VA yang skilled tapi tidak bisa "menjual" diri mereka. Business mindset membantu VA bukan hanya mengerjakan tugas, tapi juga mengembangkan karir/bisnis mereka.

#### 3. Portfolio & Credentials

**Tujuan**: Mengukur kesiapan materi untuk mencari klien.

- Memiliki portfolio online
- Memiliki minimal 2-3 contoh pekerjaan
- Memiliki testonomials atau references
- Sertifikasi atau training yang relevan

**Mengapa penting**: Portfolio adalah "kartu nama" digital. Klien ingin melihat bukti kemampuan sebelum mempekerjakan VA.

#### 4. Growth & Learning

**Tujuan**: Mengukur orientasi terhadap continuous learning.

- Kesediaan belajar tools dan skills baru
- Awareness tentang perkembangan industri VA
- Komunitas dan networking
- Feedback acceptance dan improvement

**Mengapa penting**: Industri VA berkembang pesat. VA yang stop belajar akan tertinggal. Growth mindset adalah prediktor kesuksesan jangka panjang.

### Assessment Structure

| # | Kategori | Jumlah Soal | Tipe Soal | Bobot |
|---|---|---|---|---|
| 1 | Personal Branding | 5 | Pilihan Ganda + Self-Assessment | 25% |
| 2 | Business Mindset | 5 | Pilihan Ganda + Scenario | 25% |
| 3 | Portfolio & Credentials | 5 | Pilihan Ganda + Self-Assessment | 25% |
| 4 | Growth & Learning | 5 | Pilihan Ganda + Self-Assessment | 25% |
| **Total** | | **20** | | **100%** |

---

## 11. Scoring System

### Konsep Scoring

Scoring system menghitung total skor dari ketiga assessment (Day 1, Day 2, Day 3) dan mengkategorikan peserta ke level kemampuan.

### Perhitungan Skor

#### Per Assessment

```
Skor per kategori = (Jawaban benar / Total soal) x Bobot kategori
Skor assessment = Sum semua skor kategori x 100
```

Contoh Day 1:

| Kategori | Benar | Total Soal | Bobot | Skor |
|---|---|---|---|---|
| Work Experience | 3 | 4 | 20% | 15.0 |
| Admin Skills | 2 | 4 | 20% | 10.0 |
| Communication | 4 | 4 | 20% | 20.0 |
| Digital Tools | 3 | 4 | 20% | 15.0 |
| Remote Readiness | 3 | 4 | 20% | 15.0 |
| **Total** | | | | **75.0** |

#### Total Score (Gabungan 3 Hari)

```
Total Score = (Skor Day 1 + Skor Day 2 + Skor Day 3) / 3
```

Pembagian 3 karena setiap assessment bernilai 0-100 dan kita ingin rata-rata.

### Kategori Level

| Level | Score Range | Persentase | Interpretasi |
|---|---|---|---|
| **Beginner** | 0 - 49 | 0% - 49% | Belum memiliki fondasi yang cukup. Perlu belajar dari awal. |
| **Intermediate** | 50 - 74 | 50% - 74% | Memiliki dasar yang baik, tapi perlu sharpening dan practical experience. |
| **Advanced** | 75 - 100 | 75% - 100% | Sudah siap. Perlu fine-tuning dan strategi untuk landing klien pertama. |

### Scoring untuk Scenario-based Questions (Day 2 & Day 3)

Tidak semua jawaban "benar" atau "salah" secara absolut. Beberapa skenario memiliki skor berbeda:

| Jawaban | Skor |
|---|---|
| Paling profesional & realistis | 3 poin |
| Cukup baik tapi ada improvement area | 2 poin |
| Acceptable tapi kurang optimal | 1 poin |
| Tidak direkomendasikan | 0 poin |

---

## 12. Recommendation Engine

### Konsep

Recommendation engine menghubungkan skor assessment dengan program SGBVA yang paling relevan. Pendekatan: **personal, contextual, dan non-intrusive**.

### Rekomendasi per Level

#### Beginner (Score 0-49)

**Profile**: Seseorang yang baru memulai atau belum memiliki pengalaman signifikan dalam dunia VA.

**Rekomendasi Program**: **SGBVA Foundation Program**

**Messaging Approach**:

> "Berdasarkan hasil assessment kamu, kamu berada di tahap awal perjalanan menjadi Virtual Assistant. Ini bukan berarti kamu tidak bisa -- justru ini berarti kamu punya ruang untuk berkembang dengan pesat!
>
> **SGBVA Foundation Program** dirancang khusus untuk:
> - Membangun fondasi admin skills dari nol
> - Mengenal Google Workspace secara mendalam
> - Membuat portofolio pertama kamu
> - Mencari klien pertama dengan panduan step-by-step
>
> Banyak alumni kami mulai dari level yang sama dan sekarang sudah earning dari rumah sebagai VA profesional."

**Soft Selling Tactic**:

- Highlight transformation stories dari alumni yang mulai dari beginner
- Tawarkan early bird pricing atau free consultation call
- Buat urgency: "Kuota terbatas untuk batch berikutnya"

#### Intermediate (Score 50-74)

**Profile**: Sudah punya dasar, mungkin sudah pernah bekerja atau punya skill dasar, tapi belum optimal.

**Rekomendasi Program**: **SGBVA Accelerator Program**

**Messaging Approach**:

> "Kamu sudah memiliki fondasi yang solid! Dari assessment, terlihat kamu sudah punya beberapa skills yang dibutuhkan. Yang perlu kamu lakukan sekarang adalah mengasah kemampuan dan belajar strategi yang tepat.
>
> **SGBVA Accelerator Program** cocok untuk kamu karena:
> - Advanced client management techniques
> - Portfolio optimization & personal branding
> - Pricing strategy untuk maximize earning
> - Access ke komunitas VA aktif untuk networking
>
> Kamu sudah setengah jalan. Accelerator Program akan membantu kamu menyelesaikan perjalanan."

**Soft Selling Tactic**:

- Bandingkan skill mereka sekarang vs setelah program
- Tawarkan assessment follow-up setelah program
- Highlight networking value (komunitas alumni)

#### Advanced (Score 75-100)

**Profile**: Sudah siap secara teknis, tapi mungkin perlu strategi bisnis atau akses ke klien.

**Rekomendasi Program**: **SGBVA Premium Mentorship**

**Messaging Approach**:

> "Wow, kamu sudah di level lanjutan! Dari assessment, terlihat kamu punya skill dan pengalaman yang kuat. Yang mungkin kamu butuhkan sekarang adalah strategi untuk scale up dan akses ke high-value clients.
>
> **SGBVA Premium Mentorship** menawarkan:
> - 1-on-1 mentoring dengan senior VA
> - Direct access ke SGBVA client network
> - Advanced pricing & contract negotiation
> - Personalized business development plan
>
> Untuk VA di level kamu, investasi kecil ini bisa menghasilkan return yang jauh lebih besar dalam hitungan bulan."

**Soft Selling Tactic**:

- Frame sebagai investment, bukan cost
- Highlight ROI: "Bayangkan earning 2-3x lipat dalam 3 bulan"
- Tawarkan guarantee atau money-back policy
- Urgency: "Kami hanya menerima 10 mentee per batch"

### Recommendation Display

Di landing page, hasil rekomendasi ditampilkan setelah assessment:

1. **Score summary** dengan chart visual
2. **Level badge** (Beginner/Intermediate/Advanced)
3. **Personalized recommendation** dengan deskripsi program
4. **CTA**: "Pelajari Lebih Lanjut" atau "Daftar Sekarang"
5. **Download hasil assessment** sebagai PDF (opsional)

---

## 13. Email Automation

### Email Flow Overview

```
User Submit Registration
  |
  v
Email 1: Konfirmasi Registrasi (langsung)
  |
  v
Email 2: Pengingat Webinar (1 jam sebelum)
  |
  v
Webinar Berlangsung
  |
  v
Email 3: Bonus Unlock Notification (21:00 WIB)
  |
  v
Email 4: Assessment Invitation (post-webinar)
  |
  v
User Submit Assessment
  |
  v
Email 5: Assessment Results (langsung)
  |     - Score
  |     - Level (Beginner/Intermediate/Advanced)
  |     - Recommendation
  |     - Bonus Download Links
  |
  v
Email 6: Follow-up / Soft Sell (1-2 hari setelah)
  |     - Reminder tentang program yang direkomendasikan
  |     - Testimonial dari alumni
  |     - Limited-time offer
  |
  v
Email 7: Last Chance (3-4 hari setelah)
       - Final reminder
       - Urgency message
       - CTA: "Daftar Sekarang"
```

### Detail Email

#### Email 1: Konfirmasi Registrasi

| Komponen | Detail |
|---|---|
| **Trigger** | User berhasil submit form registrasi |
| **Delay** | Instant (0-30 detik) |
| **Subject** | "Selamat! Kamu Terdaftar di SGBVA 3-Day Webinar" |
| **Content** | Greeting personal (nama), jadwal webinar, link joining, preview bonus, CTA Add to Calendar |

**Struktur Email**:

```
Header: SGBVA Logo

Halo [Nama]!

Kamu sudah terdaftar di SGBVA 3-Day Webinar. Yeay!

Berikut jadwalnya:
- Day 1: 6 Agustus 2026, 19:30 WIB - [Topik]
- Day 2: 7 Agustus 2026, 19:30 WIB - [Topik]
- Day 3: 8 Agustus 2026, 19:30 WIB - [Topik]

[Button: Tambahkan ke Google Calendar]
[Button: Tambahkan ke Apple Calendar]

Tips:
1. Siapkan koneksi internet yang stabil
2. Siapkan catatan untuk mencatat poin penting
3. Jangan lupa isi assessment setelah webinar untuk mendapatkan rekomendasi personal!

Sampai ketemu!
Tim SGBVA

Footer: Unsubscribe | Privacy Policy
```

#### Email 2: Pengingat Webinar

| Komponen | Detail |
|---|---|
| **Trigger** | 1 jam sebelum webinar dimulai (time-based trigger di Apps Script) |
| **Delay** | 1 jam sebelum 19:30 WIB |
| **Subject** | "1 Jam Lagi! SGBVA Webinar Hari [X] Segera Dimulai" |
| **Content** | Reminder singkat, link joining, motivasi singkat |

#### Email 3: Bonus Unlock Notification

| Komponen | Detail |
|---|---|
| **Trigger** | Saat bonus terbuka (21:00 WIB) |
| **Delay** | On-time (21:00 WIB) |
| **Subject** | "Bonus Hari [X] Sudah Terbuka! Download Sekarang" |
| **Content** | Nama bonus, deskripsi singkat, download button, expiry reminder (sebelum 00:00 WIB) |

#### Email 4: Assessment Invitation

| Komponen | Detail |
|---|---|
| **Trigger** | Setelah webinar selesai |
| **Delay** | 30 menit setelah webinar |
| **Subject** | "Udah Selesai! Yuk Isi Assessment dan Dapatkan Rekomendasi Personal" |
| **Content** | Ringkasan topik webinar, CTA ke assessment page, benefit (rekomendasi personal + bonus) |

#### Email 5: Assessment Results

| Komponen | Detail |
|---|---|
| **Trigger** | User submit assessment |
| **Delay** | Instant (0-30 detik) |
| **Subject** | "Hasil Assessment Kamu: [Level] - [Rekomendasi]" |
| **Content** | Score breakdown, level badge, recommendation, CTA ke program |

**Struktur Email**:

```
Header: SGBVA Logo

Halo [Nama]!

Kamu sudah menyelesaikan assessment. Berikut hasilnya:

===== SCORE SUMMARY =====

Day 1 (VA Foundations): [Skor]/100
Day 2 (Client Readiness): [Skor]/100
Day 3 (Professional Readiness): [Skor]/100

Total Score: [Total]/100
Level: [BEGINNER / INTERMEDIATE / ADVANCED]

===== RECOMMENDATION =====

Berdasarkan hasil assessment, program yang paling cocok
untuk kamu adalah:

[Nama Program]

[Deskripsi program, 2-3 kalimat]

[Button: Pelajari Lebih Lanjut]

===== BONUS DOWNLOAD =====

Bonus dari webinar kemarin masih bisa kamu download:

[Download Bonus Day 1]
[Download Bonus Day 2]
[Download Bonus Day 3]

(Bonus akan tersedia selama 3 hari ke depan)

===== NEXT STEPS =====

Jika kamu tertarik untuk mengembangkan skill VA kamu,
jangan ragu untuk menghubungi kami:

[Button: Hubungi via WhatsApp]
[Button: Booking Konsultasi Gratis]

Tim SGBVA
Footer: Unsubscribe | Privacy Policy
```

#### Email 6 & 7: Follow-up

Email follow-up dikirim 1-3 hari setelah assessment, berisi:

- Reminder tentang program yang direkomendasikan
- Testimonial dari alumni yang berhasil
- Success stories
- Limited-time offer atau bonus khusus
- CTA: "Daftar Sekarang" atau "Booking Konsultasi"

---

## 14. Bonus Flow

### Day 1 Bonus

#### 1. VA Career Readiness Assessment (PDF/Interactive)

- **Deskripsi**: Assessment mandiri berupa PDF interaktif atau halaman web yang bisa di-print
- **Konten**: Checklist dan penilaian diri untuk mengukur kesiapan karir VA
- **Value**: Membantu peserta memahami posisi mereka saat ini

#### 2. AI Prompt Pack

- **Deskripsi**: Kumpulan prompt AI yang bisa digunakan untuk pekerjaan VA sehari-hari
- **Konten**: 20-30 prompt untuk berbagai situasi (email drafting, content creation, data analysis, dll.)
- **Format**: PDF atau Google Doc yang bisa di-copy-paste
- **Value**: Menghemat waktu dalam mengerjakan tugas-tugas VA dengan bantuan AI

#### 3. Google Workspace Cheat Sheet

- **Deskripsi**: Panduan ringkas Google Workspace untuk VA
- **Konten**: Tips & tricks Google Docs, Sheets, Drive, Calendar, Gmail
- **Format**: PDF satu halaman (double-sided)
- **Value**: Quick reference saat bekerja, meningkatkan efisiensi

### Day 2 Bonus

#### 1. Client Onboarding Checklist Template

- **Deskripsi**: Template checklist untuk onboarding klien baru
- **Konten**: Step-by-step checklist dari kontrak pertama hingga klien puas
- **Format**: Google Sheets / Notion Template
- **Value**: Memastikan tidak ada langkah yang terlewat saat mulai dengan klien baru

#### 2. Client Communication Templates

- **Deskripsi**: Template email dan pesan untuk berbagai situasi klien
- **Konten**: Welcome email, progress update, deadline management, feedback request, dll. (10-15 template)
- **Format**: Google Doc
- **Value**: Menghemat waktu dan memastikan komunikasi tetap profesional

#### 3. Pricing Guide for Virtual Assistants

- **Deskripsi**: Panduan pricing untuk layanan VA
- **Konten**: Rata-rata market rate, strategi pricing, tips negotiation
- **Format**: PDF
- **Value**: Membantu peserta menentukan harga yang fair dan competitive

### Day 3 Bonus

#### 1. SGBVA Starter Portfolio Template

- **Deskripsi**: Template portofolio yang bisa langsung digunakan
- **Konten**: Layout portofolio, contoh project descriptions, structure yang menarik
- **Format**: Google Slides / Canva Template
- **Value**: Mempercepat pembuatan portofolio pertama

#### 2. Virtual Assistant Business Plan Template

- **Deskripsi**: Template business plan untuk memulai bisnis VA
- **Konten**: Business model canvas, financial projection sederhana, goal setting framework
- **Format**: Google Sheets
- **Value**: Membantu peserta melihat VA sebagai bisnis yang serius, bukan side hustle

#### 3. SGBVA Exclusive: 30-Day VA Launch Roadmap

- **Deskripsi**: Panduan langkah demi langkah untuk memulai karir VA dalam 30 hari
- **Konten**: Action items per hari, milestones, tools yang dibutuhkan, tips dari alumni
- **Format**: PDF premium (15-20 halaman)
- **Value**: Blueprint yang bisa langsung diikuti. Ini adalah bonus premium yang menunjukkan value program SGBVA dan menjadi soft selling terkuat ke program training

### Bonus Delivery Mechanism

```
User mengakses halaman bonus
  |
  v
Frontend mengecek status bonus via API
  |
  +--> Bonus Locked (sebelum 21:00 WIB)
  |      -> Tampilkan locked state
  |      -> Tampilkan countdown ke unlock
  |
  +--> Bonus Unlocked (21:00 - 00:00 WIB)
  |      -> Tampilkan bonus cards
  |      -> User klik download
  |      -> GET request ke Apps Script API
  |      -> Apps Script return download URL (Google Drive direct link)
  |      -> Browser download file
  |      -> Log download ke Google Sheets
  |
  +--> Bonus Expired (> 3 hari setelah webinar)
         -> Tampilkan "Bonus sudah tidak tersedia"
         -> CTA: "Daftar program untuk akses materials"
```

---

## 15. Landing Page Sitemap

### Sitemap

```text
Landing Page Sitemap
===================

/ (Root - Landing Page utama)
  |
  +-- /day1 (Halaman Webinar Day 1)
  |     |-- /day1/assessment (Assessment Day 1)
  |     |-- /day1/bonus (Bonus Day 1)
  |
  +-- /day2 (Halaman Webinar Day 2)
  |     |-- /day2/assessment (Assessment Day 2)
  |     |-- /day2/bonus (Bonus Day 2)
  |
  +-- /day3 (Halaman Webinar Day 3)
  |     |-- /day3/assessment (Assessment Day 3)
  |     |-- /day3/bonus (Bonus Day 3)
  |
  +-- /register (Halaman Registrasi)
  |
  +-- /assessment (Assessment Hub - Semua 3 Hari)
  |
  +-- /result (Halaman Hasil Assessment)
  |     |-- /result/share (Shareable result page)
  |
  +-- /bonus (Bonus Hub - Semua Bonus)
  |
  +-- /faq (FAQ Page)
  |
  +-- /privacy (Kebijakan Privasi)
  |
  +-- /terms (Syarat & Ketentuan)
  |
  +-- /thank-you (Halaman Terima Kasih - post registrasi)
  |
  +-- /webinar (Halaman akses webinar, redirect ke Zoom/YouTube)
```

### URL Structure

| Halaman | URL Path | Deskripsi |
|---|---|---|
| Landing Page | `/` | Homepage dengan semua section utama |
| Day 1 | `/day1` | Info spesifik Day 1 + countdown + bonus status |
| Day 1 Assessment | `/day1/assessment` | Form assessment Day 1 |
| Day 1 Bonus | `/day1/bonus` | Download bonus Day 1 |
| Day 2 | `/day2` | Info spesifik Day 2 + countdown + bonus status |
| Day 2 Assessment | `/day2/assessment` | Form assessment Day 2 |
| Day 2 Bonus | `/day2/bonus` | Download bonus Day 2 |
| Day 3 | `/day3` | Info spesifik Day 3 + countdown + bonus status |
| Day 3 Assessment | `/day3/assessment` | Form assessment Day 3 |
| Day 3 Bonus | `/day3/bonus` | Download bonus Day 3 |
| Register | `/register` | Form registrasi |
| Assessment Hub | `/assessment` | Halaman utama assessment, redirect ke hari yang sesuai |
| Result | `/result` | Hasil assessment setelah submit |
| Bonus Hub | `/bonus` | Semua bonus dalam satu halaman |
| FAQ | `/faq` | Pertanyaan umum |
| Privacy | `/privacy` | Kebijakan privasi |
| Terms | `/terms` | Syarat & ketentuan |
| Thank You | `/thank-you` | Halaman terima kasih setelah registrasi |
| Webinar | `/webinar` | Akses ke platform webinar |

### Navigation Structure

**Header Nav**: Home | Day 1 | Day 2 | Day 3 | FAQ | Register (CTA button)

**Footer Nav**: Home | FAQ | Privacy | Terms | Contact | Social Media Links

**Mobile Nav**: Hamburger menu dengan slide-out panel

---

## 16. UI Components

### Component Library

#### 1. Button

| Variant | Use Case | Style |
|---|---|---|
| Primary | CTA utama (Register, Download) | Solid color, rounded, bold text |
| Secondary | Link aksi sekunder | Outline, subtle color |
| Ghost | Teks link di dalam konten | No background, underline on hover |
| Disabled | Aksi yang belum tersedia | Grey, cursor not-allowed |
| Loading | Saat proses berlangsung | Dengan spinner |
| Icon | Tombol aksi dengan ikon | Ikon + teks atau hanya ikon |

#### 2. Modal

| Type | Use Case |
|---|---|
| Confirmation | "Apakah kamu yakin ingin submit?" |
| Success | "Registrasi berhasil!" dengan detail |
| Info | Detail bonus, info tambahan |
| Assessment | Instruksi sebelum mulai assessment |

#### 3. Countdown Timer

| Variant | Use Case |
|---|---|
| Hero Countdown | Countdown ke webinar berikutnya (hari:jam:menit:detik) |
| Bonus Countdown | Countdown ke waktu bonus unlock |
| Section Mini | Countdown kecil di dalam section |

**Props**: `targetDate`, `timezone: "Asia/Jakarta"`, `onComplete` callback

#### 4. Progress Bar

| Variant | Use Case |
|---|---|
| Linear | Progress assessment (Soal 3/20) |
| Circular | Score visualization di result page |
| Stepper | Progress registrasi (Step 1 of 3) |

#### 5. Assessment Form

| Element | Description |
|---|---|
| Question Card | Single question dengan number |
| Option List | Radio button / clickable cards untuk jawaban |
| Navigation | Previous / Next buttons |
| Timer | (Optional) countdown untuk assessment |
| Submit Button | Submit assessment |
| Progress Indicator | "Soal X dari Y" |

#### 6. Charts (Chart.js)

| Chart Type | Use Case |
|---|---|
| Radar Chart | Score breakdown per kategori di result page |
| Doughnut Chart | Total score vs remaining |
| Bar Chart | Perbandingan skor per kategori |

#### 7. Accordion

| Use Case |
|---|
| FAQ section - expand/collapse jawaban |
| Bonus detail - expand untuk melihat deskripsi lengkap |
| Assessment instructions - expand untuk detail |

#### 8. Timeline

| Use Case |
|---|
| Webinar schedule - visual timeline 3 hari |
| Assessment flow - step-by-step assessment process |
| Bonus unlock schedule - kapan bonus terbuka |

#### 9. Toast / Notification

| Type | Use Case |
|---|---|
| Success | "Registrasi berhasil!" |
| Error | "Email sudah terdaftar" |
| Warning | "Bonus akan terkunci dalam 1 jam" |
| Info | "Assessment Day 2 sekarang tersedia!" |

**Position**: Top-right, auto-dismiss 3-5 detik

#### 10. Loading States

| Type | Use Case |
|---|---|
| Skeleton | Saat data sedang dimuat |
| Spinner | Saat form sedang diproses |
| Progress | Saat download file |
| Page Load | Initial page load animation |

#### 11. Badge / Status Indicator

| Type | Use Case |
|---|---|
| LIVE | Animasi merah berkedip saat webinar berlangsung |
| Upcoming | Badge biru sebelum webinar dimulai |
| Finished | Badge abu-abu setelah webinar selesai |
| Locked | Ikon gembok untuk bonus terkunci |
| Unlocked | Ikon gembok terbuka untuk bonus tersedia |
| Score Level | Badge warna untuk Beginner/Intermediate/Advanced |

#### 12. Card

| Variant | Use Case |
|---|---|
| Speaker Card | Profil pembicara |
| Bonus Card | Info bonus dengan status (locked/unlocked) |
| Agenda Card | Detail topik per hari |
| FAQ Card | Pertanyaan dalam accordion |
| Testimonial Card | Quote dari alumni (future feature) |

#### 13. Email Success Component

| Element | Description |
|---|---|
| Success Icon | Animasi centang/celebration |
| Heading | "Email Terkirim!" |
| Message | Deskripsi singkat |
| Check Email CTA | "Cek inbox kamu" button |
| Resend Option | "Belum menerima? Kirim ulang" |

#### 14. Navigation

| Component | Description |
|---|---|
| Header | Sticky header dengan logo + nav links + CTA button |
| Mobile Menu | Slide-out menu untuk mobile |
| Breadcrumb | Navigasi hierarki (Day 1 > Assessment) |
| Back Button | Kembali ke halaman sebelumnya |

#### 15. Footer

| Section | Content |
|---|---|
| Brand | Logo + tagline |
| Quick Links | Navigation links |
| Contact | Email, WhatsApp |
| Social Media | Instagram, YouTube, LinkedIn, TikTok |
| Legal | Privacy Policy, Terms of Service |
| Copyright | Year + attribution |

---

## 17. API Endpoints (Google Apps Script)

### Base URL

```text
https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec
```

### Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/register` | Submit registrasi baru | Public |
| GET | `/check-email?email={email}` | Check apakah email sudah terdaftar | Public |
| GET | `/webinar-status?day={1,2,3}` | Get status webinar (upcoming/live/finished) | Public |
| GET | `/bonus-status?day={1,2,3}` | Get status bonus (locked/unlocked) | Public |
| POST | `/submit-assessment` | Submit jawaban assessment | Public |
| GET | `/result?email={email}&day={1,2,3}` | Get hasil assessment | Authenticated* |
| GET | `/bonus-download?day={1,2,3}&email={email}` | Generate download link | Authenticated* |
| POST | `/send-email` | Trigger email sending | Internal |
| GET | `/stats` | Get statistics (registrasi count, dll.) | Admin |

\* Authenticated = menggunakan email sebagai identifier (tidak ada login, tapi email harus match dengan registrasi)

### Request & Response Format

#### POST /register

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "whatsapp": "+6281234567890",
  "days": [1, 2, 3],
  "referral": "instagram_bio"
}
```

**Success Response (200)**:

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "registrationId": "REG-20260806-ABC123",
    "name": "John Doe",
    "days": [1, 2, 3]
  }
}
```

**Error Response (400)**:

```json
{
  "success": false,
  "message": "Email already registered",
  "error": "DUPLICATE_EMAIL"
}
```

#### GET /webinar-status

**Query Parameter**: `day=1`

**Response**:

```json
{
  "success": true,
  "data": {
    "day": 1,
    "date": "2026-08-06",
    "status": "upcoming",
    "startTime": "2026-08-06T19:30:00+07:00",
    "endTime": "2026-08-06T21:00:00+07:00",
    "nextEvent": "live",
    "nextEventTime": "2026-08-06T19:30:00+07:00"
  }
}
```

#### POST /submit-assessment

**Request Body**:

```json
{
  "email": "john@example.com",
  "day": 1,
  "answers": {
    "q1": "B",
    "q2": "A",
    "q3": "C",
    "q4": "A",
    "q5": "B"
  }
}
```

**Success Response**:

```json
{
  "success": true,
  "data": {
    "score": 75,
    "level": "Intermediate",
    "breakdown": {
      "workExperience": 15,
      "adminSkills": 10,
      "communication": 20,
      "digitalTools": 15,
      "remoteReadiness": 15
    }
  }
}
```

### Error Handling

| Error Code | HTTP Status | Description |
|---|---|---|
| `INVALID_INPUT` | 400 | Data yang dikirim tidak valid |
| `DUPLICATE_EMAIL` | 409 | Email sudah terdaftar |
| `NOT_FOUND` | 404 | Resource tidak ditemukan |
| `UNAUTHORIZED` | 401 | Akses tidak diizinkan |
| `SERVER_ERROR` | 500 | Error di server (Apps Script) |
| `RATE_LIMITED` | 429 | Terlalu banyak request |

---

## 18. Data Model

### Google Sheets Structure

#### Tab: Registrations

| Column | Type | Description |
|---|---|---|
| registration_id | String | Unique ID (auto-generated) |
| name | String | Nama lengkap |
| email | String | Email (unique) |
| whatsapp | String | No. WhatsApp |
| days | String | Array of days [1,2,3] (stored as JSON string) |
| referral | String | Referral source |
| registered_at | DateTime | Timestamp registrasi |
| status | String | active / inactive |

#### Tab: Day1_Assessment

| Column | Type | Description |
|---|---|---|
| submission_id | String | Unique ID |
| email | String | Email peserta |
| q1_q20 | String | Jawaban per soal |
| score_work_experience | Number | Skor kategori |
| score_admin_skills | Number | Skor kategori |
| score_communication | Number | Skor kategori |
| score_digital_tools | Number | Skor kategori |
| score_remote_readiness | Number | Skor kategori |
| total_score | Number | Total skor |
| submitted_at | DateTime | Timestamp submission |

#### Tab: Day2_Assessment

| Column | Type | Description |
|---|---|---|
| submission_id | String | Unique ID |
| email | String | Email peserta |
| q1_q20 | String | Jawaban per soal |
| score_client_understanding | Number | Skor kategori |
| score_service_delivery | Number | Skor kategori |
| score_professional_boundaries | Number | Skor kategori |
| score_pricing_value | Number | Skor kategori |
| total_score | Number | Total skor |
| submitted_at | DateTime | Timestamp submission |

#### Tab: Day3_Assessment

| Column | Type | Description |
|---|---|---|
| submission_id | String | Unique ID |
| email | String | Email peserta |
| q1_q20 | String | Jawaban per soal |
| score_personal_branding | Number | Skor kategori |
| score_business_mindset | Number | Skor kategori |
| score_portfolio_credentials | Number | Skor kategori |
| score_growth_learning | Number | Skor kategori |
| total_score | Number | Total skor |
| submitted_at | DateTime | Timestamp submission |

#### Tab: Results

| Column | Type | Description |
|---|---|---|
| email | String | Email peserta |
| day1_score | Number | Skor Day 1 |
| day2_score | Number | Skor Day 2 |
| day3_score | Number | Skor Day 3 |
| total_score | Number | Rata-rata |
| level | String | Beginner / Intermediate / Advanced |
| recommendation | String | Program yang direkomendasikan |
| completed_at | DateTime | Timestamp selesai |

#### Tab: Downloads

| Column | Type | Description |
|---|---|---|
| email | String | Email peserta |
| day | Number | Hari bonus |
| bonus_name | String | Nama file |
| downloaded_at | DateTime | Timestamp download |

#### Tab: Config

| Column | Type | Description |
|---|---|---|
| key | String | Configuration key |
| value | String | Configuration value |

**Contoh Config Entries**:

| Key | Value |
|---|---|
| webinar_day1_date | 2026-08-06 |
| webinar_day1_start | 19:30 |
| webinar_day1_end | 21:00 |
| bonus_unlock_day1 | 21:00 |
| bonus_lock_day1 | 00:00 |
| ... | ... |

---

## 19. Future Features (v2)

### Phase 2 Enhancements

#### 1. Certificate System

- **Deskripsi**: Sertifikat digital untuk peserta yang menyelesaikan seluruh webinar
- **Fitur**: Auto-generate PDF sertifikat dengan nama peserta, tanggal, dan QR code
  - QR code untuk verifikasi keaslian
  - Template sertifikat branded SGBVA
  - Download langsung atau kirim via email
- **Integrasi**: Google Apps Script untuk generate PDF + Google Drive storage

#### 2. Leaderboard

- **Deskripsi**: Peringkat peserta berdasarkan skor assessment
- **Fitur**: Leaderboard global dan per hari
  - Top 10 per kategori
  - Top 10 overall
  - Filterable by day
  - Anonymous option (hanya tampilkan inisial)
- **Engagement**: Membuat peserta competitive dan lebih serius mengisi assessment

#### 3. Referral System

- **Deskripsi**: Sistem referral untuk memperluas jangkauan
- **Fitur**: Setiap peserta mendapat unique referral link
  - Track jumlah referral
  - Reward untuk top referrers (bonus exclusive, discount program SGBVA)
  - Leaderboard referrer
  - Social sharing buttons dengan referral link
- **Viral Loop**: Referral -> Registrasi -> Webinar -> Assessment -> Referral

#### 4. Gamification

- **Deskripsi**: Sistem gamification untuk meningkatkan engagement
- **Fitur**:
  - **Badge**: Achievement badges untuk berbagai aksi (registrasi, assessment, referral, attendance)
  - **Points**: Point system untuk setiap aksi (100 pts registrasi, 50 pts per assessment, 20 pts per referral)
  - **Level**: User level berdasarkan accumulated points
  - **Challenges**: Daily/weekly challenges selama webinar

#### 5. Progress Tracking

- **Deskripsi**: Dashboard personal untuk track progress peserta
- **Fitur**:
  - Checklist: Webinar dihadiri, assessment diisi, bonus didownload
  - Timeline visual perjalanan peserta
  - "Completion percentage" untuk motivasi
  - Milestone celebrations (animasi saat 100% complete)

#### 6. AI-Powered Recommendation

- **Deskripsi**: Enhanced recommendation engine menggunakan AI
- **Fitur**:
  - Natural language analysis dari jawaban assessment
  - Personalized recommendation berdasarkan combination of scores
  - AI-generated learning path
  - Chatbot interaktif untuk Q&A tentang program
- **Tech**: Integrate dengan OpenAI API atau Google AI

#### 7. Interactive Webinar Features

- **Deskripsi**: Fitur interaktif selama webinar berlangsung
- **Fitur**:
  - Live quiz/polling
  - Q&A session (live)
  - Reaction buttons (emoji reactions)
  - Attendance tracking dengan check-in system
  - Breakout rooms (jika menggunakan Zoom)

#### 8. Community Features

- **Deskripsi**: Fitur komunitas untuk peserta
- **Fitur**:
  - Discussion forum (integrasikan dengan Discord/Slack)
  - Study groups
  - Accountability partners
  - Success stories sharing

#### 9. Payment Integration

- **Deskripsi**: Integrasi payment untuk program SGBVA
- **Fitur**:
  - Checkout page untuk program training
  - Payment gateway (Midtrans/Xendit)
  - Invoice generation
  - Installment options
  - Promo code / discount system

#### 10. Analytics Dashboard

- **Deskripsi**: Dashboard admin untuk monitoring
- **Fitur**:
  - Real-time registration count
  - Assessment completion rate
  - Average scores per category
  - Bonus download rate
  - Email open rate (integrate dengan email tracking)
  - Conversion funnel visualization
  - Export to CSV/Google Sheets

### Roadmap Prioritization

| Priority | Feature | Effort | Impact |
|---|---|---|---|
| P1 (High) | Certificate System | Medium | High |
| P1 (High) | Referral System | Medium | High |
| P2 (Medium) | Leaderboard | Low | Medium |
| P2 (Medium) | Gamification | Medium | Medium |
| P2 (Medium) | Progress Tracking | Low | Medium |
| P3 (Low) | AI Recommendation | High | High |
| P3 (Low) | Payment Integration | High | High |
| P3 (Low) | Analytics Dashboard | Medium | Medium |
| P3 (Low) | Community Features | High | Medium |
| P3 (Low) | Interactive Webinar | High | Medium |

---

## 20. Deliverable & Appendix

### Project Scope

#### In Scope (v1)

- Landing page responsif (mobile-first) dengan 9 section utama
- Form registrasi dengan validasi frontend & backend
- Status webinar dinamis (Upcoming / Live / Finished)
- Bonus unlock system berbasis waktu (21:00 - 00:00 WIB)
- 3 Assessment (Day 1, 2, 3) dengan 20 soal masing-masing
- Scoring system dengan 3 level (Beginner, Intermediate, Advanced)
- Recommendation engine berbasis skor
- Email automation (konfirmasi, pengingat, bonus, hasil assessment)
- Google Sheets sebagai database
- Google Apps Script sebagai backend API
- GitHub Pages sebagai hosting frontend
- Landing page untuk Day 1, Day 2, Day 3

#### Out of Scope (v1)

- User login / authentication system
- Payment gateway
- Live webinar streaming (menggunakan YouTube/Zoom)
- Mobile app
- Multi-language support
- AI-powered features
- Gamification system
- Certificate generation

### Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | User bisa mengisi form registrasi | Must Have |
| FR-002 | System menvalidasi data registrasi (frontend + backend) | Must Have |
| FR-003 | System mengirim email konfirmasi setelah registrasi | Must Have |
| FR-004 | Landing page menampilkan countdown timer ke webinar | Must Have |
| FR-005 | Status webinar berubah otomatis (Upcoming -> Live -> Finished) | Must Have |
| FR-006 | Bonus terkunci sebelum 21:00 WIB | Must Have |
| FR-007 | Bonus terbuka pada 21:00 WIB | Must Have |
| FR-008 | User bisa mengisi assessment (Day 1, 2, 3) | Must Have |
| FR-009 | System menghitung skor assessment otomatis | Must Have |
| FR-010 | System menampilkan hasil skor + level + rekomendasi | Must Have |
| FR-011 | System mengirim email hasil assessment | Must Have |
| FR-012 | User bisa download bonus (PDF, sheets, templates) | Must Have |
| FR-013 | Landing page responsif (mobile, tablet, desktop) | Must Have |
| FR-014 | Email pengingat dikirim 1 jam sebelum webinar | Should Have |
| FR-015 | Email follow-up soft selling dikirim 1-3 hari setelah | Should Have |
| FR-016 | User bisa add webinar ke calendar | Should Have |
| FR-017 | Download tracking (siapa yang sudah download bonus) | Should Have |
| FR-018 | Email duplikat check secara real-time | Should Have |
| FR-019 | Admin bisa lihat statistik (registrasi, assessment) | Nice to Have |
| FR-020 | Error handling yang graceful (tidak crash, user-friendly) | Must Have |

### Non-Functional Requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-001 | **Performance**: Halaman harus load dalam < 3 detik | LCP < 3s |
| NFR-002 | **Performance**: API response < 2 detik | RTT < 2s |
| NFR-003 | **Responsiveness**: Support semua ukuran layar | 320px - 1920px |
| NFR-004 | **Browser Support**: Chrome, Firefox, Safari, Edge | Latest 2 versions |
| NFR-005 | **Availability**: Uptime > 99.5% | GitHub Pages SLA |
| NFR-006 | **Security**: Input sanitization untuk semua form | XSS prevention |
| NFR-007 | **Security**: Rate limiting pada API endpoints | 3 req/min/IP |
| NFR-008 | **Scalability**: Support hingga 5,000 registrasi | Google Sheets limit |
| NFR-009 | **Accessibility**: WCAG 2.1 AA compliance | Semantic HTML, alt text |
| NFR-010 | **SEO**: Proper meta tags, Open Graph, structured data | Search engine friendly |
| NFR-011 | **Analytics**: Track page views dan user interactions | Google Analytics |
| NFR-012 | **Email Delivery**: Email sampai di inbox (bukan spam) | SPF/DKIM setup |
| NFR-013 | **Data Privacy**: Compliance dengan kebijakan privasi | GDPR-like practices |
| NFR-014 | **Maintainability**: Codebase documented dan clean | README, comments |
| NFR-015 | **Deployment**: Auto-deploy via GitHub Actions | CI/CD pipeline |

### User Journey

#### Journey 1: Registrasi -> Webinar -> Assessment -> Rekomendasi

```text
1. Peserta melihat link webinar di Instagram/WhatsApp
     |
2. Membuka landing page (/)
     |
3. Scroll melalui section: Hero -> About -> Speaker -> Agenda -> Bonus -> FAQ
     |
4. Klik "Daftar Sekarang" -> Scroll ke form registrasi
     |
5. Mengisi form: Nama, Email, WhatsApp, Hari yang diikuti
     |
6. Submit -> Email konfirmasi diterima
     |
7. Menambahkan ke calendar
     |
8. (Sebelum webinar) Menerima email pengingat
     |
9. Mengikuti webinar Day 1
     |
10. (21:00 WIB) Menerima email bonus unlock -> Download bonus
     |
11. Mengisi assessment Day 1
     |
12. Menerima email hasil: Score + Level + Recommendation
     |
13. Mengikuti Day 2 dan Day 3 dengan flow yang sama
     |
14. (Setelah Day 3) Menerima email follow-up dengan rekomendasi program SGBVA
     |
15. Memutuskan untuk daftar program training (conversion!)
```

#### Journey 2: Returning User

```text
1. Peserta sudah registrasi, kembali ke website
     |
2. Cek status bonus (locked/unlocked)
     |
3. Download bonus yang terbuka
     |
4. Mengisi assessment jika belum
     |
5. Melihat hasil dan rekomendasi
```

#### Journey 3: Mobile User

```text
1. Peserta mengakses via mobile (70%+ traffic expected)
     |
2. Experience mobile-first design
     |
3. Form registrasi yang mudah diisi di mobile
     |
4. Assessment yang comfortable di mobile
     |
5. Download bonus langsung ke device
```

### Risk Analysis

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| **Google Sheets limit** (5M cells) | Low | High | Monitor usage, archive old data, upgrade to BigQuery jika diperlukan |
| **Apps Script timeout** (6 menit execution) | Medium | Medium | Optimalkan kode, gunakan batch processing, split operasi besar |
| **GitHub Pages downtime** | Very Low | Medium | GitHub Pages sangat reliable; alternative: Netlify/Vercel |
| **Email masuk spam** | Medium | High | Setup SPF/DKIM, gunakan email professional domain, avoid spam trigger words |
| **Duplicate registration** | Medium | Low | Email uniqueness check di backend |
| **High traffic spike** (webinar malam) | Medium | Medium | Apps Script auto-scales; Google Sheets bisa jadi bottleneck -> cache di frontend |
| **CORS issues** | Low | Medium | Google Apps Script Web App mendukung CORS by default |
| **Bonus file link expired** | Low | Medium | Gunakan Google Drive direct links, monitor status regularly |
| **Timezone issues** | Medium | Medium | Semua waktu di-hardcode ke WIB (UTC+7), gunakan library timezone |
| **Mobile rendering issues** | Medium | Medium | Test di berbagai device, gunakan responsive breakpoints yang tepat |
| **Assessment soal bocor** | Low | Low | Soal di-store di backend, bukan di frontend |
| **Data privacy concern** | Low | High | Buat kebijakan privasi yang jelas, data hanya untuk keperluan webinar |

### Development Roadmap

#### Phase 0: Setup & Planning (Week 1)

- [ ] Setup repository GitHub
- [ ] Setup Google Apps Script project
- [ ] Setup Google Sheets database
- [ ] Buat desain system flow (dokumen ini)
- [ ] Setup deployment pipeline
- [ ] Define design system (warna, font, spacing)

#### Phase 1: Core Landing Page (Week 2)

- [ ] Implement Hero section
- [ ] Implement About section
- [ ] Implement Speaker section
- [ ] Implement Agenda section
- [ ] Implement Bonus section (dengan locked/unlocked states)
- [ ] Implement FAQ section
- [ ] Implement Footer
- [ ] Implement Countdown timer
- [ ] Responsive design testing

#### Phase 2: Registration System (Week 3)

- [ ] Build registration form UI
- [ ] Implement frontend validation
- [ ] Build backend API `/register`
- [ ] Build backend API `/check-email`
- [ ] Implement email konfirmasi
- [ ] Implement "Add to Calendar" feature
- [ ] Thank you page

#### Phase 3: Webinar & Bonus System (Week 4)

- [ ] Implement webinar status logic
- [ ] Implement bonus lock/unlock mechanism
- [ ] Build bonus download flow
- [ ] Implement email pengingat (time-based trigger)
- [ ] Implement email bonus unlock
- [ ] Build Day 1, 2, 3 specific pages

#### Phase 4: Assessment System (Week 5)

- [ ] Design assessment UI (form, progress bar)
- [ ] Implement assessment forms (Day 1, 2, 3)
- [ ] Build scoring engine
- [ ] Build result page (with charts)
- [ ] Build recommendation engine
- [ ] Implement email hasil assessment

#### Phase 5: Email Automation & Polish (Week 6)

- [ ] Implement complete email flow
- [ ] Email follow-up automation
- [ ] QA testing seluruh flow
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Cross-browser testing
- [ ] Content review & copywriting

#### Phase 6: Launch (Week 7)

- [ ] Final testing end-to-end
- [ ] Deploy ke production
- [ ] Monitor performance
- [ ] Monitor registration flow
- [ ] Backup plan ready
- [ ] LAUNCH!

### Milestone

| Milestone | Target Date | Deliverable |
|---|---|---|
| **M0**: Planning Complete | Week 1, Day 3 | System flow document (this file), design system |
| **M1**: Landing Page Ready | Week 2, End | Responsive landing page dengan semua sections |
| **M2**: Registration System | Week 3, End | Form registrasi + email konfirmasi |
| **M3**: Bonus System | Week 4, End | Bonus lock/unlock + download |
| **M4**: Assessment System | Week 5, End | 3 assessment + scoring + results |
| **M5**: Email Automation | Week 6, Mid | Complete email flow |
| **M6**: QA Complete | Week 6, End | All tests passed |
| **M7**: Launch | Week 7 | Production deployment |

### Folder Structure (Konseptual)

```text
sgbva-webinar/
|
|-- index.html                    # Landing page utama
|-- day1.html                     # Halaman Day 1
|-- day2.html                     # Halaman Day 2
|-- day3.html                     # Halaman Day 3
|-- register.html                 # Halaman registrasi
|-- assessment.html               # Assessment hub
|-- day1-assessment.html          # Assessment Day 1
|-- day2-assessment.html          # Assessment Day 2
|-- day3-assessment.html          # Assessment Day 3
|-- result.html                   # Halaman hasil
|-- bonus.html                    # Bonus hub
|-- faq.html                      # FAQ
|-- privacy.html                  # Kebijakan privasi
|-- terms.html                    # Syarat & ketentuan
|-- thank-you.html                # Halaman terima kasih
|
|-- css/
|   |-- styles.css                # Main stylesheet
|   |-- components.css            # Component styles
|   |-- responsive.css            # Responsive breakpoints
|   |-- animations.css            # Animation definitions
|   |-- assessment.css            # Assessment-specific styles
|
|-- js/
|   |-- main.js                   # Main script
|   |-- countdown.js              # Countdown timer logic
|   |-- registration.js           # Registration form logic
|   |-- assessment.js             # Assessment engine
|   |-- scoring.js                # Scoring calculation
|   |-- recommendation.js         # Recommendation engine
|   |-- email.js                  # Email-related functions
|   |-- bonus.js                  # Bonus unlock logic
|   |-- api.js                    # API client (fetch to Apps Script)
|   |-- charts.js                 # Chart.js configurations
|   |-- utils.js                  # Utility functions
|   |-- animations.js             # Animation triggers
|
|-- assets/
|   |-- images/
|   |   |-- logo.svg              # SGBVA logo
|   |   |-- hero-bg.jpg           # Hero background
|   |   |-- speaker/              # Speaker photos
|   |   |-- icons/                # Custom icons
|   |
|   |-- fonts/                    # Custom fonts (if any)
|   |-- pdf/                      # Bonus files (PDF)
|       |-- day1/                 # Day 1 bonus files
|       |-- day2/                 # Day 2 bonus files
|       |-- day3/                 # Day 3 bonus files
|
|-- apps-script/
|   |-- Code.gs                   # Main Apps Script file
|   |-- Registration.gs           # Registration handler
|   |-- Assessment.gs             # Assessment handler
|   |-- Email.gs                  # Email automation
|   |-- Bonus.gs                  # Bonus management
|   |-- Utils.gs                  # Utility functions
|   |-- Config.gs                 # Configuration constants
|
|-- docs/
|   |-- PROJECT_FLOW.md           # This document
|   |-- API.md                    # API documentation
|   |-- DESIGN.md                 # Design system documentation
|
|-- .github/
|   |-- workflows/
|       |-- deploy.yml            # GitHub Actions deployment
|
|-- README.md                     # Project readme
|-- .gitignore                    # Git ignore file
```

### Kesimpulan

Dokumentasi ini mendefinisikan seluruh alur sistem untuk **SGBVA 3-Day Webinar Landing Page**. Proyek ini dirancang sebagai funnel marketing yang efektif:

1. **Awareness**: Landing page yang menarik dengan konten webinar yang compelling
2. **Engagement**: Bonus harian yang terkunci/unlocked menciptakan urgensi dan repeat visits
3. **Assessment**: 3 assessment bertahap memberikan value sekaligus mengumpulkan data peserta
4. **Personalization**: Scoring system dan recommendation engine memberikan pengalaman personal
5. **Conversion**: Soft selling yang natural melalui rekomendasi program yang relevan

Arsitektur teknis (GitHub Pages + Google Apps Script) dipilih karena:

- **Zero cost**: Tidak ada biaya hosting atau server
- **Low maintenance**: Tidak perlu manage server atau database
- **Fast deployment**: Push to GitHub = auto deploy
- **Scalable**: Google Apps Script auto-scales untuk traffic normal
- **Familiar**: Menggunakan tools Google yang sudah dikenal

Dengan dokumentasi ini, pengembangan dapat dimulai secara metodis, mengikuti roadmap dan milestone yang telah didefinisikan. Setiap komponen sudah didefinisikan dengan jelas, dari user interface hingga data flow, sehingga tim development dapat bekerja dengan efektif tanpa ambiguity.

---

**Document prepared by**: System Analyst
**Date**: July 31, 2026
**Version**: 1.0
**Status**: Ready for Development
