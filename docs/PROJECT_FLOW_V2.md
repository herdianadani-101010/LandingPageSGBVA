# SGBVA 3-Day Webinar Landing Page

## Project Documentation & System Flow (V2 - Final)

**Version:** 2.0
**Date:** July 31, 2026
**Status:** Final -- Ready for Architecture & Development
**Changelog**: Revised based on PROJECT_FLOW_REVIEW.md. All contradictions resolved. All open questions answered.

---

## Daftar Isi

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Webinar Schedule](#3-webinar-schedule)
4. [Landing Page Flow](#4-landing-page-flow)
5. [Registration Flow](#5-registration-flow)
6. [Webinar Flow](#6-webinar-flow)
7. [Bonus Unlock Flow](#7-bonus-unlock-flow)
8. [Anti-Cheat & Security](#8-anti-cheat--security)
9. [Day 1 Assessment](#9-day-1-assessment)
10. [Day 2 Assessment](#10-day-2-assessment)
11. [Day 3 Assessment](#11-day-3-assessment)
12. [Scoring System](#12-scoring-system)
13. [Recommendation Engine](#13-recommendation-engine)
14. [Email Automation](#14-email-automation)
15. [Bonus Flow](#15-bonus-flow)
16. [Post-Webinar & End State](#16-post-webinar--end-state)
17. [Admin Dashboard](#17-admin-dashboard)
18. [Landing Page Sitemap](#18-landing-page-sitemap)
19. [UI Components](#19-ui-components)
20. [API Endpoints (Google Apps Script)](#20-api-endpoints-google-apps-script)
21. [Data Model](#21-data-model)
22. [Error Handling & Edge Cases](#22-error-handling--edge-cases)
23. [Future Features](#23-future-features)
24. [Deliverable & Appendix](#24-deliverable--appendix)

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

### Scale Assumption

Proyek ini dirancang untuk **20-100 peserta** (konteks ujian/demo). Infrastruktur (Google Sheets, Apps Script, Gmail) masih sangat memadai untuk skala ini. Migrasi ke services yang lebih robust (Brevo, SendGrid, PostgreSQL) hanya diperlukan jika proyek ini benar-benar dipublikasikan ke publik.

---

## 2. Tech Stack & Architecture

### Frontend (GitHub Pages)

| Komponen | Teknologi |
|---|---|
| Hosting | GitHub Pages (gratis, HTTPS) |
| Framework | Vanilla HTML/CSS/JS |
| CSS Framework | Tailwind CSS via CDN |
| Animasi | CSS Animations + AOS (Animate On Scroll) |
| Charts | Chart.js untuk visualisasi assessment result |
| Icons | Lucide Icons / Heroicons |
| Fonts | Google Fonts (e.g. Plus Jakarta Sans, DM Sans) |

### Backend (Google Apps Script)

| Komponen | Teknologi |
|---|---|
| Runtime | Google Apps Script (V8) |
| Database | Google Sheets |
| Email | GmailApp |
| Deployment | Web App |
| Scheduling | Trigger time-based untuk bonus unlock |
| File Storage | Google Drive untuk file bonus |

### Architecture Diagram

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

---

## 3. Webinar Schedule

### Overview

| Detail | Day 1 | Day 2 | Day 3 |
|---|---|---|---|
| **Tanggal** | 6 August 2026 | 7 August 2026 | 8 August 2026 |
| **Jam Webinar** | 19:30 WIB | 19:30 WIB | 19:30 WIB |
| **Bonus Unlock** | 21:00 WIB | 21:00 WIB | 21:00 WIB |
| **Bonus Lock** | 23:59 WIB | 23:59 WIB | 23:59 WIB |
| **Topik Utama** | VA Career Foundations | Client Readiness | Professional Readiness |
| **Assessment** | Basic Skills Assessment | Client Readiness Assessment | Professional Readiness Assessment |

### Timeline

```
============================== Day 1 ==============================+

  19:30        21:00                     23:59
   |             |                          |
   |<-- LIVE -->|<--- BONUS UNLOCKED --->|<-- ENDED -->|
   |  Webinar   |   Free Gift Available   |  Bonus Closed  |
   |            |                         |  "Join next    |
   |            |                         |   session"     |
===================================================================+

============================== Day 2 ==============================+

  19:30        21:00                     23:59
   |             |                          |
   |<-- LIVE -->|<--- BONUS UNLOCKED --->|<-- ENDED -->|
   |  Webinar   |   Free Gift Available   |  Bonus Closed  |
   |            |                         |  "Join next    |
   |            |                         |   session"     |
===================================================================+

============================== Day 3 ==============================+

  19:30        21:00                     23:59
   |             |                          |
   |<-- LIVE -->|<--- BONUS UNLOCKED --->|<-- ENDED -->|
   |  Webinar   |   Free Gift Available   |  Bonus Closed  |
   |            |                         |  "Webinar      |
   |            |                         |   Complete!"   |
===================================================================+
```

### Bonus Window Rule (DEFINITIVE)

| Phase | Time (WIB) | Behavior |
|---|---|---|
| **Locked** | 00:00 - 20:59 | Bonus terkunci. Tampil pesan: "Bonus ini akan terbuka jam 21:00 WIB." |
| **Unlocked** | 21:00 - 23:59 | Bonus tersedia untuk download. Tampil countdown ke 23:59. |
| **Ended** | 00:00+ (next day) | Bonus ditutup. Tampil pesan: "Bonus Day [X] has ended. Join the next session to unlock the next bonus." |

**Khusus Day 3**: Setelah 00:00 post-webinar, bonus Day 3 juga ditutup dengan pesan: "You have completed the SGBVA 3-Day Webinar! Your final report is ready." (lihat Section 16: Post-Webinar)

**Alasan**: Mekanisme ini menciptakan urgensi dan memberikan alasan kuat agar peserta mengikuti webinar keesokan harinya. "Bonus hari ini sudah ditutup, tapi besok ada bonus baru!"

### Status Webinar

| Status | Kondisi | UX Behavior |
|---|---|---|
| **Upcoming** | Sebelum 19:30 WIB hari H | Countdown timer, badge "Coming Soon", CTA Register |
| **Live** | 19:30 - 21:00 WIB | "LIVE" badge animasi merah, timer berjalan |
| **Finished** | Setelah 21:00 WIB | Badge "Selesai", bonus terbuka, assessment tersedia |

---

## 4. Landing Page Flow

### User Journey Overview

```
Landing Page (/)
  |
  v
+----------------+
|   Hero         | --> Headline, subheadline, CTA Register, countdown
|  (Sticky CTA)  | --> "Register Now" button fixed di bawah (mobile)
+----------------+
  |
  v
+----------------+
|  About         | --> Detail webinar, benefits, format
+----------------+
  |
  v
+----------------+
|  Speaker       | --> Profil pembicara, kredibilitas
+----------------+
  |
  v
+----------------+
|  Agenda        | --> Timeline 3 hari, topik per hari
+----------------+
  |
  v
+----------------+
|  Bonus         | --> Preview bonus per hari (locked/unlocked status)
+----------------+
  |
  v
+----------------+
|  FAQ           | --> Pertanyaan umum, accordion format
+----------------+
  |
  v
+----------------+
|  Register      | --> Form registrasi (3 fields)
+----------------+
  |
  v
+----------------+
|  Footer        | --> Branding, link, copyright, social media
+----------------+
```

### Detail Per Section

#### Hero Section

- **Headline**: Judul webinar yang compelling (e.g. "Jadi Virtual Assistant Profesional dalam 3 Hari")
- **Subheadline**: Benefit statement yang jelas
- **CTA Button**: "Reserve My Free Spot" -> scroll ke form registrasi
- **Countdown Timer**: Countdown real-time ke webinar Day 1 (19:30 WIB, 6 Agustus 2026)
- **Visual**: Background gradient atau ilustrasi yang relevan
- **Social Proof**: Teks statis seperti "Join our free 3-day webinar", "Limited seats", "Interactive learning" (bukan angka yang tidak dapat diverifikasi)

#### Sticky CTA (Mobile)

- **Posisi**: Fixed di bottom layar, hanya muncul di mobile
- **Text**: "Register Now"
- **Behavior**: Scroll otomatis ke form registrasi saat diklik
- **Dismiss**: Bisa ditutup (X button) untuk user yang sudah register
- **Desktop**: Tidak ditampilkan (sudah ada di Hero)

#### About Webinar Section

- **Headline**: "Apa itu SGBVA Webinar?"
- **Key Benefits**: 3-4 bullet points
- **Format**: Online, gratis, 3 hari berturut-turut
- **Duration**: 1.5 jam per sesi

#### Speaker Section

- **Profil Pembicara**: Foto, nama, title, bio singkat
- **Kredibilitas**: Pengalaman, achievements

#### Agenda Section

- **Timeline Layout**: Visual timeline 3 hari
- **Per Hari**: Topik, waktu, durasi
- **Bonus Preview**: Apa yang tersedia per hari

#### Bonus Section

- **Card Layout**: 3 kartu bonus (1 per hari)
- **Status Indicators**: Gembok (locked) / gembok terbuka (unlocked)
- **Availability Badge**: "Unlock 21:00 WIB" atau "Tersedia Sekarang"

#### FAQ Section

- **Accordion Format**: Expand/collapse
- **Minimum 6-8 pertanyaan**

#### Registration Section

- **Headline**: "What You'll Get" summary
  ```
  FREE ACCESS includes:
  - 3-Day Live Webinar
  - VA Career Readiness Assessment
  - AI Prompt Pack
  - Google Workspace Cheat Sheet
  - Client Communication Templates
  - And more...
  ```
- **Form Fields**: 3 fields saja (Nama, Email, WhatsApp)
- **CTA Button**: "Reserve My Free Spot" dengan loading state
- **Privacy Notice**: "Kami tidak akan spam. Unsubscribe kapan saja."
- **What Happens Next**: Urutan langkah setelah registrasi
  ```
  1. Confirmation email (instant)
  2. Reminder 1 hour before webinar
  3. Join live session
  4. Download free bonuses after each day
  5. Take the assessment for personalized recommendations
  ```
- **Already Registered?**: Link ke status check page

#### Footer Section

- **Brand Logo**: SGBVA branding
- **Navigation**: Home | FAQ | Privacy | Contact
- **Social Media**: Instagram, YouTube, LinkedIn
- **WhatsApp Button**: Floating "Chat with us" button

---

## 5. Registration Flow

### Flow Diagram

```
User mengisi form (3 fields)
  |
  v
Frontend Validation
  |-- Nama: required, 2-100 karakter, huruf+spasi+unicode
  |-- Email: required, format valid
  |-- WhatsApp: required, format Indonesia (+62)
  |
  v
Submit ke Google Apps Script API
  |
  v
Backend Validation
  |-- Sanitize input
  |-- Email format regex
  |-- Cek duplikat email di Google Sheets
  |-- Generate unique ID (UUID v4)
  |
  v
Simpan ke Google Sheets (tab "Participants")
  |
  v
Return Success ke Frontend (langsung)
  |
  v
Email Konfirmasi dikirim secara async
  (via time-based trigger, 1-2 detik delay)
  |
  v
Frontend: Tampilkan Success State
  |-- Modal "Registration Confirmed!"
  |-- Detail: Jadwal, instruksi
  |-- CTA: "Add to Google Calendar" (per hari)
  |-- CTA: "Share with friends"
```

### Data yang Diminta

| Field | Type | Required | Validasi |
|---|---|---|---|
| Nama Lengkap | Text | Yes | 2-100 karakter, huruf + spasi + unicode |
| Email | Email | Yes | Format valid, unik |
| No. WhatsApp | Telpon | Yes | Format Indonesia, 10-15 digit |

### Validasi

#### Frontend

- Real-time validation (onBlur)
- Visual feedback: border merah + pesan error
- Prevent double submit: disable button + loading state
- Email check hanya saat submit (bukan onBlur, untuk menghemat API calls)

#### Backend

- Sanitize: trim, remove script tags, length limits
- Email uniqueness check via Google Sheets query
- Rate limit: reject jika ada >3 submit dari email yang sama
- Input length enforcement: nama (100), email (254), whatsapp (15)

### Email Konfirmasi

Dikirim async (tidak block registrasi). Jika email gagal, log error ke tab "Email_Errors" tapi registrasi tetap sukses.

**Subject**: "Registration Confirmed -- SGBVA Webinar, 6 Aug 2026"

**Content**:

```
Hi [Nama],

You're registered for the SGBVA 3-Day Webinar!

Schedule:
- Day 1: 6 Aug 2026, 19:30 WIB -- VA Career Foundations
- Day 2: 7 Aug 2026, 19:30 WIB -- Client Readiness
- Day 3: 8 Aug 2026, 19:30 WIB -- Professional Readiness

What to expect:
- Free bonuses every day (unlock at 21:00 WIB)
- Personalized assessment after each session
- Your personalized VA readiness report

[Button: Add Day 1 to Calendar]
[Button: Add Day 2 to Calendar]
[Button: Add Day 3 to Calendar]

See you there!
Tim SGBVA

---
Unsubscribe | Privacy Policy
```

### Calendar Integration

Per hari, generate Google Calendar URL:

```text
https://calendar.google.com/calendar/render?action=TEMPLATE
&text=SGBVA+Webinar+Day+[X]
&dates=2026080[T]T120000Z/2026080[T]T140000Z
&details=VA+Career+Foundations...
&location=Online
```

---

## 6. Webinar Flow

### Status Transisi

```
+-----------+    19:30 WIB    +--------+    21:00 WIB    +----------+
| Upcoming  | -------------> |  Live  | --------------> | Finished |
+-----------+                 +--------+                 +----------+
     ^                                                        |
     |                                                        |
     +-- (Day berikutnya) ------------------------------------+
```

### Behavior Per Status

#### Upcoming

- Countdown timer aktif
- Badge "Coming Soon"
- CTA: "Register Now"
- Bonus: Locked
- Assessment: Not available

#### Live

- "LIVE" badge animasi merah
- Timer berjalan (elapsed time)
- Badge "Live Now"
- Bonus: Locked
- Assessment: "Available after webinar"

#### Finished

- Badge "Session Complete"
- Bonus: Unlocked (21:00-23:59 WIB)
- Assessment: Available
- CTA: "Download Bonus" / "Take Assessment"

### Timestamp Logic

```text
Semua waktu dalam WIB (UTC+7):
  Upcoming : waktu_sekarang < [tanggal] 19:30 WIB
  Live     : [tanggal] 19:30 WIB <= waktu_sekarang < [tanggal] 21:00 WIB
  Finished : waktu_sekarang >= [tanggal] 21:00 WIB

WIB calculation di Apps Script:
  var now = new Date();
  var wibOffset = 7 * 60 * 60 * 1000; // 7 hours in ms
  var wibNow = new Date(now.getTime() + wibOffset);
  var hours = wibNow.getUTCHours();
  var minutes = wibNow.getUTCMinutes();
```

---

## 7. Bonus Unlock Flow

### Mekanisme Unlock (DEFINITIVE)

```
Time-based Lock System

+------------------+     +------------------+     +------------------+
|  LOCKED          |     |  UNLOCKED        |     |  ENDED           |
|  00:00 - 20:59   | --> |  21:00 - 23:59   | --> |  00:00 next day  |
|  "Opens at 21:00 |     |  "Download Now!"  |     |  "Day [X] bonus  |
|   WIB"           |     |  + countdown to  |     |   has ended.     |
|                  |     |   23:59          |     |   Join next      |
|                  |     |                  |     |   session."      |
+------------------+     +------------------+     +------------------+
```

### UX Detail

#### Locked State

- Kartu bonus dengan overlay semi-transparan
- Ikon gembok besar
- Teks: "Bonus ini akan terbuka jam 21:00 WIB"
- Countdown timer ke waktu unlock
- CTA: Disabled, greyed out
- Shimmer effect subtle

#### Unlocked State

- Kartu bonus dengan warna cerah
- Ikon gembok terbuka
- Teks: "Bonus tersedia! Download sekarang."
- Countdown ke 23:59 WIB
- CTA: "Download [Nama Bonus]" - aktif, warna menonjol
- Unlock animation: fade in + scale up

#### Ended State

- Kartu bonus dengan overlay gelap
- Ikon check mark atau jam
- Teks: "Bonus Day [X] has ended. Join the next session to unlock the next bonus."
- CTA: "See Day [X+1] Schedule" atau "Register for Next Session"

### Download Mechanism

```
User klik Download
  |
  v
Frontend: cek bonus status via API
  |
  +--> Status: unlocked
  |      -> GET request ke Apps Script
  |      -> Apps Script return download URL (Google Drive)
  |      -> Log download ke Google Sheets (tab "Downloads")
  |      -> Browser navigate to download URL
  |
  +--> Status: locked
  |      -> Tampilkan "Bonus belum tersedia"
  |
  +--> Status: ended
         -> Tampilkan "Bonus sudah ditutup"
```

---

## 8. Anti-Cheat & Security

### Browser Time Manipulation

**Threat**: Peserta mengubah waktu komputer untuk membuka bonus atau assessment sebelum waktunya.

**Defense**: Semua time checks dilakukan di BACKEND (Apps Script), bukan frontend.

```
Frontend request: "GET /bonus-status?day=1"
  |
  v
Apps Script: ambil waktu server (bukan waktu user)
  var now = new Date(); // Server time (UTC)
  var wibHour = (now.getUTCHours() + 7) % 24;
  |
  v
Compare dengan schedule config
  |
  v
Return status berdasarkan server time
```

Frontend HANYA menampilkan status yang dikembalikan backend. Tidak ada logic waktu di frontend.

### Direct URL Access

**Threat**: Peserta bookmark `/day1/assessment` atau `/day1/bonus` dan mengakses langsung.

**Defense**:

1. Setiap halaman assessment/bonus melakukan validasi via API saat load
2. API mengecek:
   - Apakah user sudah register? (cek email di Participants tab)
   - Apakah status webinar mengizinkan akses?
   - Apakah user sudah menyelesaikan prerequisite? (Day 1 sebelum Day 2)
3. Jika tidak valid, redirect ke halaman yang sesuai dengan pesan yang jelas

### Bonus File Protection

**Threat**: Direct link ke file Google Drive dibagikan ke orang yang tidak register.

**Acceptance**: Untuk webinar gratis, ini acceptable. Bonus files adalah lead magnets, bukan premium content. Fokus utama adalah lead generation (mendapatkan email), bukan content protection.

**Defense** (opsional, hanya jika diperlukan):

- Google Drive link tidak di-expose langsung ke frontend
- Frontend meminta ke Apps Script, Apps Script generate temporary redirect URL
- URL expired setelah 5 menit

### Assessment Answer Protection

**Threat**: Answers di-intercept via network inspection.

**Defense**:

1. Soal di-fetch dari backend saat assessment dimulai (bukan hardcode di frontend)
2. Urutan soal di-randomize per session
3. Urutan jawaban di-randomize per session
4. Pool soal lebih besar dari jumlah yang ditampilkan (misal: pool 30, tampil 20)
5. Session ID di-generate untuk setiap assessment attempt

### Bookmark Protection (Full Detail)

**Scenario**: User bookmark `/day1.html`, buka seminggu kemudian.

**Behavior**:

| Situation | Result |
|---|---|
| Webinar belum dimulai, user belum register | Tampilkan landing page dengan CTA register |
| Webinar belum dimulai, user sudah register | Tampilkan info: "Webinar dimulai [tanggal]" |
| Webinar sudah selesai, bonus sudah ditutup | Tampilkan "Session ended" + assessment CTA |
| Webinar sudah selesai, bonus masih aktif | Tampilkan bonus download |
| Hari sudah lewat > 3 hari | Tampilkan post-webinar summary |

**Implementation**: Setiap halaman melakukan API call saat load untuk menentukan state. Frontend render berdasarkan response, bukan berdasarkan URL path saja.

### Refresh Recovery (Autosave)

**Scenario**: Internet putus saat mengisi assessment.

**Behavior**:

1. Setiap jawaban otomatis tersimpan di `localStorage` browser
2. Key: `assessment_day{X}_{email_hash}`
3. Value: JSON object `{ answers: {q1:"A", q2:"B",...}, lastSaved: timestamp }`
4. Saat user kembali ke halaman assessment, cek localStorage:
   - Jika ada saved answers dan assessment belum di-submit -> tampilkan "Continue where you left off?"
   - Jika assessment sudah di-submit -> redirect ke results
5. Saat submit berhasil -> hapus localStorage entry
6. Jika user ganti browser/perangkat -> jawaban hilang, mulai dari awal (acceptable trade-off)

**Frontend Flow**:

```
Load assessment page
  |
  v
Check localStorage
  |
  +--> Ada saved answers && belum submit
  |      -> Tampilkan modal: "Continue where you left off?"
  |      -> [Continue] -> Load saved answers ke form
  |      -> [Start Fresh] -> Clear localStorage, load kosong
  |
  +--> Sudah di-submit
  |      -> Redirect ke /result?email=...&day=...
  |
  +--> Tidak ada saved data
         -> Load assessment baru dari API
  |
  v
User menjawab soal
  |
  v
Setiap perubahan jawaban -> simpan ke localStorage (debounce 500ms)
  |
  v
User klik Submit
  |
  v
POST ke backend -> Success -> Hapus localStorage -> Redirect ke results
```

---

## 9. Day 1 Assessment

### Concept: VA Career Readiness Assessment

**Tujuan**: Mengukur fondasi dasar seseorang untuk memulai karir sebagai Virtual Assistant.

### Prerequisites

- User harus sudah register (email ada di Participants tab)
- Tidak ada prerequisite lain (ini assessment pertama)

### Kategori & Penjelasan

#### 1. Work Experience (20 poin)

**Tujuan**: Mengukur pengalaman kerja profesional peserta.

- Apakah pernah bekerja full-time/part-time
- Jenis pekerjaan yang pernah dijalani
- Lama pengalaman kerja
- Jenis industri yang pernah digeluti

**Mengapa penting**: Pengalaman kerja menentukan seberapa cepat seseorang bisa beradaptasi dengan role VA.

#### 2. Admin Skills (20 poin)

**Tujuan**: Mengukur kemampuan administrasi dasar.

- Kemampuan mengelola email dan kalender
- Keahlian spreadsheet (Google Sheets / Excel)
- Kemampuan dokumentasi dan filing
- Organisasi dan time management

**Mengapa penting**: Admin skills adalah backbone dari pekerjaan VA.

#### 3. Communication (20 poin)

**Tujuan**: Mengukur kemampuan komunikasi profesional.

- Kemampuan menulis email profesional
- Kemampuan berkomunikasi via chat (formal/informal)
- Kemampuan menyusun laporan ringkas
- Bahasa Inggris dasar (reading & writing)

**Mengapa penting**: VA adalah role yang heavy on communication.

#### 4. Digital Tools (20 poin)

**Tujuan**: Mengukur kemampuan menggunakan tools digital.

- Familiaritas dengan Google Workspace
- Kemampuan menggunakan tools komunikasi (Slack, Zoom, Teams)
- Familiaritas dengan tools project management
- Kemampuan belajar tools baru dengan cepat

**Mengapa penting**: VA modern harus lancar menggunakan berbagai tools digital.

#### 5. Remote Readiness (20 poin)

**Tujuan**: Mengukur kesiapan bekerja dari jarak jauh.

- Koneksi internet yang stabil
- Peralatan kerja yang memadai
- Lingkungan kerja yang mendukung
- Disiplin diri dan self-management

**Mengapa penting**: Bekerja remote memiliki tantangan tersendiri.

### Assessment Structure

| # | Kategori | Jumlah Soal | Bobot |
|---|---|---|---|
| 1 | Work Experience | 4 | 20 poin |
| 2 | Admin Skills | 4 | 20 poin |
| 3 | Communication | 4 | 20 poin |
| 4 | Digital Tools | 4 | 20 poin |
| 5 | Remote Readiness | 4 | 20 poin |
| **Total** | | **20 soal** | **100 poin** |

### Assessment Rules (DEFINITIVE)

1. **One submission only**: Setelah submit, jawaban terkunci. Tidak bisa diubah.
2. **Pre-submit editing**: Sebelum submit, boleh mengubah jawaban sepuasnya.
3. **Progressive unlock**: Day 2 hanya bisa dibuka jika Day 1 sudah di-submit. Day 3 hanya bisa dibuka jika Day 2 sudah di-submit.
4. **Autosave**: Jawaban otomatis tersimpan di localStorage jika internet terputus.
5. **No time limit**: Tidak ada batasan waktu. Peserta boleh mengerjakan sesuai kecepatan mereka.
6. **Session-based**: Setiap akses ke halaman assessment generate session baru. Jawaban tersimpan per session.
7. **Backend validation**: Semua score dihitung di backend. Frontend tidak menghitung score.

---

## 10. Day 2 Assessment

### Concept: Client Readiness Assessment

**Tujuan**: Mengukur kemampuan peserta dalam memahami dan melayani klien.

### Prerequisites

- User harus sudah register
- Day 1 assessment harus sudah di-submit

### Kategori & Penjelasan

#### 1. Client Understanding (25 poin)

- Identifying client requirements
- Prioritizing client tasks
- Understanding different client types (solopreneur, SME, corporate)

#### 2. Service Delivery (25 poin)

- Attention to detail
- Time management dan deadline adherence
- Quality control
- SOP dan checklist creation

#### 3. Professional Boundaries (25 poin)

- Working hours vs after-hours
- Saying "no" professionally
- Scope creep handling
- Confidentiality awareness

#### 4. Pricing & Value (25 poin)

- Hourly rate vs fixed pricing
- Value assessment
- Market rate awareness

### Assessment Structure

| # | Kategori | Jumlah Soal | Bobot |
|---|---|---|---|
| 1 | Client Understanding | 5 | 25 poin |
| 2 | Service Delivery | 5 | 25 poin |
| 3 | Professional Boundaries | 5 | 25 poin |
| 4 | Pricing & Value | 5 | 25 poin |
| **Total** | | **20 soal** | **100 poin** |

### Catatan: Scenario-based Questions

Day 2 menggunakan skenario realistis. Contoh:

> "Klien kamu minta laporan selesai besok, tapi kamu baru terima datanya jam 8 malam. Kamu sudah janji dinner dengan keluarga. Apa yang kamu lakukan?"

Scoring untuk scenario: 3 poin (terbaik), 2 poin (cukup baik), 1 poin (acceptable), 0 poin (tidak direkomendasikan).

---

## 11. Day 3 Assessment

### Concept: Professional Readiness Assessment

**Tujuan**: Mengukur kesiapan peserta untuk memulai karir VA secara profesional.

### Prerequisites

- User harus sudah register
- Day 2 assessment harus sudah di-submit

### Kategori & Penjelasan

#### 1. Personal Branding (25 poin)

- LinkedIn profile
- Portfolio creation
- Niche and positioning
- Online presence awareness

#### 2. Business Mindset (25 poin)

- VA as business (not just a job)
- Pitching dan negotiation
- Financial literacy (invoice, tax, pricing)
- Goal setting dan business planning

#### 3. Portfolio & Credentials (25 poin)

- Online portfolio
- Work samples
- Testimonials/references
- Relevant certifications

#### 4. Growth & Learning (25 poin)

- Continuous learning orientation
- Industry awareness
- Networking
- Feedback acceptance

### Assessment Structure

| # | Kategori | Jumlah Soal | Bobot |
|---|---|---|---|
| 1 | Personal Branding | 5 | 25 poin |
| 2 | Business Mindset | 5 | 25 poin |
| 3 | Portfolio & Credentials | 5 | 25 poin |
| 4 | Growth & Learning | 5 | 25 poin |
| **Total** | | **20 soal** | **100 poin** |

---

## 12. Scoring System

### Formula (EXPLICIT -- No Ambiguity)

#### Per Assessment

```
Untuk setiap kategori:
  Category Score = (Jawaban Benar / Total Soal) x Bobot Poin

Contoh Day 1:
  Work Experience: 3/4 x 20 = 15.0
  Admin Skills:    2/4 x 20 = 10.0
  Communication:   4/4 x 20 = 20.0
  Digital Tools:   3/4 x 20 = 15.0
  Remote Readiness: 3/4 x 20 = 15.0
  ──────────────────────────────
  TOTAL ASSESSMENT:             75.0 / 100.0
```

#### Total Score (Gabungan 3 Hari)

```
Total Score = (Day 1 Score + Day 2 Score + Day 3 Score) / 3

Contoh:
  Day 1: 75.0
  Day 2: 65.0
  Day 3: 80.0
  ──────────
  Total: (75 + 65 + 80) / 3 = 73.3
```

### Kategori Level

| Level | Score Range | Interpretasi |
|---|---|---|
| **Beginner** | 0 - 49 | Perlu belajar dari awal |
| **Intermediate** | 50 - 74 | Punya dasar, perlu sharpening |
| **Advanced** | 75 - 100 | Sudah siap, perlu strategi |

### Scenario Scoring (Day 2 & Day 3)

| Jawaban | Poin |
|---|---|
| Paling profesional & realistis | 3 |
| Cukup baik, ada improvement area | 2 |
| Acceptable, kurang optimal | 1 |
| Tidak direkomendasikan | 0 |

---

## 13. Recommendation Engine

### Konsep

Personal, contextual, dan non-intrusive. Rekomendasi didasarkan pada level score, bukan hanya score mentah.

### Rekomendasi per Level

#### Beginner (Score 0-49)

**Rekomendasi**: **SGBVA Foundation Program**

> "Berdasarkan assessment, kamu di tahap awal. Ini bukan berarti kamu tidak bisa -- justru kamu punya ruang berkembang pesat! SGBVA Foundation Program dirancang untuk membangun fondasi dari nol: admin skills, Google Workspace, portofolio pertama, dan cara mencari klien."

#### Intermediate (Score 50-74)

**Rekomendasi**: **SGBVA Accelerator Program**

> "Kamu sudah punya fondasi solid! Yang perlu sekarang adalah mengasah kemampuan dan belajar strategi. SGBVA Accelerator Program: advanced client management, portfolio optimization, pricing strategy, dan akses ke komunitas VA aktif."

#### Advanced (Score 75-100)

**Rekomendasi**: **SGBVA Premium Mentorship**

> "Kamu sudah di level lanjutan! Yang kamu butuhkan sekarang adalah strategi scale up dan akses high-value clients. SGBVA Premium Mentorship: 1-on-1 mentoring, direct access ke client network, advanced pricing, dan personalized business development plan."

### Recommendation Display

Di result page:

1. Score summary dengan radar chart
2. Level badge (Beginner/Intermediate/Advanced) dengan warna
3. Personalized recommendation dengan deskripsi program
4. CTA: "Learn More" atau "Register Now"
5. "Download Your Report" (PDF summary)
6. "Share Your Results" (generate shareable image)

---

## 14. Email Automation

### Email Flow

```
Registration
  |
  v
Email 1: Confirmation (instant, async)
  |
  v
Email 2: Reminder (1 hour before webinar)
  |
  v
Webinar Day 1 Live
  |
  v
Email 3: Bonus Unlock (21:00 WIB Day 1)
  |
  v
Email 4: Bonus Ended Reminder ("Bonus ditutup. Join besok!")
  |
  v
Email 5: Assessment Results (after submission)
  |
  v
(Same pattern for Day 2, Day 3)
  |
  v
Email 6: Final Follow-up (2 days after Day 3)
```

### Email Types (Simplified to 6)

#### 1. Registration Confirmation

| Field | Value |
|---|---|
| Trigger | Registration success |
| Delay | Async (1-2 seconds) |
| Subject | "Registration Confirmed -- SGBVA Webinar, 6 Aug 2026" |

#### 2. Webinar Reminder

| Field | Value |
|---|---|
| Trigger | 1 hour before 19:30 WIB |
| Delay | Time-based trigger |
| Subject | "Webinar starts in 1 hour -- join link inside" |

#### 3. Bonus Unlock Notification

| Field | Value |
|---|---|
| Trigger | 21:00 WIB each day |
| Delay | Time-based trigger |
| Subject | "Your Day [X] bonus is ready to download" |

#### 4. Bonus Ended Reminder

| Field | Value |
|---|---|
| Trigger | 00:00 WIB next day |
| Delay | Time-based trigger |
| Subject | "Day [X] bonus has ended -- here's what's next" |

#### 5. Assessment Results

| Field | Value |
|---|---|
| Trigger | Assessment submission |
| Delay | Instant |
| Subject | "Your VA Readiness Score: [Level]" |

#### 6. Final Follow-up

| Field | Value |
|---|---|
| Trigger | 2 days after Day 3 |
| Delay | Time-based trigger |
| Subject | "Your next step: SGBVA Professional Training" |

### Email Best Practices

- Lowercase subject lines
- No excessive exclamation marks
- Value-oriented, not urgency-oriented
- Every email includes unsubscribe link
- Email failures logged, don't block registration

---

## 15. Bonus Flow

### Day 1 Bonus

| # | Bonus | Format | Description |
|---|---|---|---|
| 1 | VA Career Readiness Assessment | PDF | Checklist penilaian diri untuk karir VA |
| 2 | AI Prompt Pack | PDF/Google Doc | 20-30 prompt AI untuk pekerjaan VA |
| 3 | Google Workspace Cheat Sheet | PDF | Tips & tricks Google Workspace satu halaman |

### Day 2 Bonus

| # | Bonus | Format | Description |
|---|---|---|---|
| 1 | Client Onboarding Checklist | Google Sheets | Template checklist onboarding klien baru |
| 2 | Client Communication Templates | Google Doc | 10-15 template email/pesan profesional |
| 3 | Pricing Guide for VAs | PDF | Panduan market rate dan strategi pricing |

### Day 3 Bonus

| # | Bonus | Format | Description |
|---|---|---|---|
| 1 | Starter Portfolio Template | Google Slides/Canva | Template portofolio yang bisa langsung digunakan |
| 2 | VA Business Plan Template | Google Sheets | Business model canvas untuk bisnis VA |
| 3 | 30-Day VA Launch Roadmap | PDF (premium) | Blueprint langkah demi langkah memulai karir VA |

---

## 16. Post-Webinar & End State

### Post-Webinar Flow (Setelah Day 3 Selesai)

```
Day 3 selesai (23:59 WIB, 8 Agustus 2026)
  |
  v
+------------------------------------------+
|         POST-WEBINAR STATE                |
+------------------------------------------+
|                                           |
|  "Congratulations!"                       |
|  "You have completed                     |
|   SGBVA 3-Day Webinar."                  |
|                                           |
|  "Your final report is ready."           |
|  [Download Report]                        |
|                                           |
|  ─────────────────────────────            |
|                                           |
|  "Recommended Next Step"                  |
|  SGBVA Professional Training              |
|  [Learn More]                             |
|                                           |
|  ─────────────────────────────            |
|                                           |
|  "Your Results"                           |
|  Day 1: [Score]/100                       |
|  Day 2: [Score]/100                       |
|  Day 3: [Score]/100                       |
|  Total: [Score]/100                       |
|  Level: [Beginner/Intermediate/Advanced]  |
|                                           |
|  ─────────────────────────────            |
|                                           |
|  "Share Your Achievement"                 |
|  [WhatsApp] [Instagram] [Copy Link]       |
|                                           |
+------------------------------------------+
```

### Post-Webinar States

| Timeframe | Behavior |
|---|---|
| Day 3, 21:00-23:59 | Bonus Day 3 unlocked, assessment available |
| Day 3, 00:00 (Day 4) | Bonus Day 3 ended, post-webinar summary shown |
| Day 4 - Day 10 | Full post-webinar state (all results, report, recommendation) |
| Day 10+ | Static archive page. "Webinar has ended. Want to join next batch?" |

---

## 17. Admin Dashboard

### Purpose

Dashboard sederhana untuk memantau performa webinar secara real-time. Berguna saat demo dan presentasi.

### URL

`/admin` (dilindungi dengan password sederhana yang di-set di localStorage)

### Data Sources

Semua data dibaca langsung dari Google Sheets tabs.

### Dashboard Widgets

#### 1. Registration Overview

```
+----------------------------------+
| Total Registrations    |   87    |
| Today's Registrations  |   12    |
| Day 1 Attended         |   --    |
| Day 2 Attended         |   --    |
| Day 3 Attended         |   --    |
+----------------------------------+
```

- Total registered (from Participants tab)
- Registrations per hari (last 7 days)
- Attendance per day (could be tracked via assessment submission)

#### 2. Assessment Completion

```
+----------------------------------+
| Day 1 Completed   |  65/87 (75%)|
| Day 2 Completed   |  42/87 (48%)|
| Day 3 Completed   |  30/87 (34%)|
| Overall Complete  |  30/87 (34%)|
+----------------------------------+
```

#### 3. Score Distribution

```
+----------------------------------+
| Beginner        |  12  (18%)   |
| Intermediate    |  35  (54%)   |
| Advanced        |  18  (28%)   |
+----------------------------------+
[Bar chart: distribution per level]
```

#### 4. Bonus Downloads

```
+----------------------------------+
| Day 1 Bonus      |  58 downloads|
| Day 2 Bonus      |  40 downloads|
| Day 3 Bonus      |  28 downloads|
+----------------------------------+
```

#### 5. Email Status

```
+----------------------------------+
| Sent            |  245          |
| Failed          |  3            |
| Pending         |  12           |
+----------------------------------+
```

#### 6. Conversion Funnel

```
Registered (87)
    |
    v
Attended Day 1 (??)  -- diukur dari assessment submission
    |
    v
Assessment Done (30)
    |
    v
Recommended (30)
    |
    v
Clicked Training Link (??) -- track via UTM
```

### Implementation

- Dashboard dibaca dari Apps Script API endpoint: `GET /admin/dashboard`
- Endpoint di-password protect (simple token check)
- Auto-refresh setiap 60 detik
- Mobile responsive (bisa diakses dari HP saat presentasi)
- Chart menggunakan Chart.js (sama dengan result page)

---

## 18. Landing Page Sitemap

```
/ (Root - Landing Page utama)
  |
  +-- /register (Success page, atau redirect ke /)
  |
  +-- /assessment (Assessment hub, dynamic berdasarkan day parameter)
  |     |-- /assessment?day=1
  |     |-- /assessment?day=2
  |     |-- /assessment?day=3
  |
  +-- /result (Hasil assessment)
  |     |-- /result?email={email}&token={token}&day={1,2,3}
  |
  +-- /bonus (Bonus hub)
  |     |-- /bonus?day=1
  |     |-- /bonus?day=2
  |     |-- /bonus?day=3
  |
  +-- /status (Check your registration & progress status)
  |
  +-- /faq (FAQ page)
  |
  +-- /privacy (Kebijakan privasi)
  |
  +-- /thank-you (Post-registration success)
  |
  +-- /post-webinar (Post-webinar summary, setelah Day 3)
  |
  +-- /admin (Admin dashboard, password protected)
```

### URL Design Principles

- Single pages, dynamic content via query parameters (bukan multiple HTML files)
- Email tidak pernah muncul di URL (gunakan token)
- Setiap halaman validasi state via backend

---

## 19. UI Components

### Component List

| Component | Description | Priority |
|---|---|---|
| Button (Primary/Secondary/Disabled) | CTA buttons | Must Have |
| Sticky CTA (Mobile) | Fixed bottom button di mobile | Must Have |
| Countdown Timer | Countdown ke waktu (hari:jam:menit:detik) | Must Have |
| Progress Bar | Linear (assessment progress) | Must Have |
| Assessment Form | Question card + option list + navigation | Must Have |
| Radar Chart | Score breakdown di result page | Must Have |
| Bar Chart | Score distribution di admin dashboard | Should Have |
| Accordion | FAQ expand/collapse | Must Have |
| Timeline | Webinar schedule visual | Must Have |
| Toast/Notification | Success/error/warning messages | Must Have |
| Loading State | Skeleton + spinner | Must Have |
| Modal | Confirmation, success, info | Must Have |
| Badge/Status | LIVE, Upcoming, Finished, Locked, Unlocked | Must Have |
| Card | Speaker, Bonus, Agenda | Must Have |
| Header (Sticky) | Logo + nav + CTA button | Must Have |
| Mobile Menu | Hamburger + slide-out | Must Have |
| Footer | Brand + links + social + copyright | Must Have |
| WhatsApp Float Button | Click-to-WhatsApp | Should Have |
| Share Buttons | WhatsApp, Instagram, Copy Link | Should Have |

---

## 20. API Endpoints (Google Apps Script)

### Base URL

```text
https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec
```

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Submit registrasi |
| GET | `/webinar-status?day={1,2,3}` | Status webinar per hari |
| GET | `/bonus-status?day={1,2,3}` | Status bonus per hari |
| GET | `/stats` | Jumlah registran (untuk social proof jika diperlukan) |

### Authenticated Endpoints (email sebagai auth)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/assessment-questions?day={1,2,3}&email={email}` | Fetch soal assessment |
| POST | `/submit-assessment` | Submit jawaban + hitung score |
| GET | `/result?email={email}&day={1,2,3}` | Hasil assessment |
| GET | `/bonus-download?day={1,2,3}&email={email}` | Generate download URL |
| GET | `/user-status?email={email}` | Status lengkap peserta |
| GET | `/check-email?email={email}` | Check apakah email terdaftar |

### Admin Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/dashboard?token={token}` | Data dashboard admin |
| GET | `/admin/participants?token={token}` | List semua peserta |

### Request & Response Format

#### POST /register

```json
// Request
{
  "name": "John Doe",
  "email": "john@example.com",
  "whatsapp": "+6281234567890"
}

// Success Response (200)
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "registrationId": "uuid-v4-format",
    "name": "John Doe"
  }
}

// Error Response (400/409)
{
  "success": false,
  "message": "Email already registered",
  "error": "DUPLICATE_EMAIL"
}
```

#### GET /assessment-questions

```json
// Request
// GET /assessment-questions?day=1&email=john@example.com

// Success Response (200)
{
  "success": true,
  "data": {
    "day": 1,
    "sessionId": "session-uuid",
    "questions": [
      {
        "id": "q1",
        "category": "work_experience",
        "text": "Bagaimana pengalaman kerja kamu?",
        "options": [
          {"key": "A", "text": "Belum pernah bekerja"},
          {"key": "B", "text": "Pernah freelance 1 tahun"},
          {"key": "C", "text": "Full-time 2-3 tahun"},
          {"key": "D", "text": "Lebih dari 3 tahun"}
        ]
      }
    ],
    "alreadySubmitted": false
  }
}

// Already submitted (200)
{
  "success": true,
  "data": {
    "day": 1,
    "alreadySubmitted": true,
    "score": 75,
    "level": "Intermediate"
  }
}
```

#### POST /submit-assessment

```json
// Request
{
  "email": "john@example.com",
  "day": 1,
  "sessionId": "session-uuid",
  "answers": {
    "q1": "C",
    "q2": "B",
    "q3": "A",
    "q4": "D",
    "q5": "C"
  }
}

// Success Response (200)
{
  "success": true,
  "data": {
    "score": 75.0,
    "level": "Intermediate",
    "breakdown": {
      "workExperience": 15.0,
      "adminSkills": 10.0,
      "communication": 20.0,
      "digitalTools": 15.0,
      "remoteReadiness": 15.0
    }
  }
}
```

#### GET /user-status

```json
// Request
// GET /user-status?email=john@example.com

// Response (200)
{
  "success": true,
  "data": {
    "registered": true,
    "registrationDate": "2026-08-01T10:30:00+07:00",
    "assessment": {
      "day1": {"submitted": true, "score": 75.0},
      "day2": {"submitted": false, "score": null},
      "day3": {"submitted": false, "score": null}
    },
    "bonusDownloads": {
      "day1": {"downloaded": true, "count": 2},
      "day2": {"downloaded": false, "count": 0},
      "day3": {"downloaded": false, "count": 0}
    },
    "totalScore": null,
    "level": null
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|---|---|---|
| `INVALID_INPUT` | 400 | Data tidak valid |
| `DUPLICATE_EMAIL` | 409 | Email sudah terdaftar |
| `NOT_REGISTERED` | 401 | Email belum terdaftar |
| `PREREQUISITE_NOT_MET` | 403 | Day sebelumnya belum selesai |
| `ALREADY_SUBMITTED` | 409 | Assessment sudah di-submit |
| `BONUS_NOT_AVAILABLE` | 403 | Bonus belum tersedia atau sudah ditutup |
| `NOT_FOUND` | 404 | Resource tidak ditemukan |
| `SERVER_ERROR` | 500 | Internal error |

---

## 21. Data Model

### Google Sheets Tabs

#### Tab: Participants

| Column | Type | Description |
|---|---|---|
| id | String (UUID) | Unique identifier |
| name | String | Nama lengkap |
| email | String (unique) | Email |
| whatsapp | String | No. WhatsApp |
| registered_at | DateTime | Timestamp registrasi |
| status | String | active / unsubscribed |

#### Tab: Assessments

| Column | Type | Description |
|---|---|---|
| id | String (UUID) | Submission ID |
| email | String | Email peserta |
| day | Number | 1, 2, atau 3 |
| answers | String (JSON) | `{"q1":"A","q2":"B",...}` |
| category_scores | String (JSON) | `{"work_experience":15,...}` |
| total_score | Number | Total skor |
| session_id | String | Assessment session ID |
| submitted_at | DateTime | Timestamp submission |

#### Tab: Results

| Column | Type | Description |
|---|---|---|
| email | String | Email peserta |
| day1_score | Number | Skor Day 1 (null jika belum) |
| day2_score | Number | Skor Day 2 (null jika belum) |
| day3_score | Number | Skor Day 3 (null jika belum) |
| total_score | Number | Rata-rata (null jika belum lengkap) |
| level | String | Beginner / Intermediate / Advanced (null jika belum) |
| recommendation | String | Program yang direkomendasikan (null jika belum) |
| completed_at | DateTime | Timestamp selesai semua |

#### Tab: Downloads

| Column | Type | Description |
|---|---|---|
| id | String (UUID) | Download ID |
| email | String | Email peserta |
| day | Number | Hari bonus |
| bonus_name | String | Nama file |
| downloaded_at | DateTime | Timestamp download |

#### Tab: Email_Log

| Column | Type | Description |
|---|---|---|
| id | String (UUID) | Log ID |
| email | String | Penerima |
| type | String | confirmation / reminder / bonus_unlock / bonus_ended / results / followup |
| day | Number | Hari (null jika tidak applicable) |
| status | String | sent / failed / pending |
| sent_at | DateTime | Timestamp |
| error | String | Error message (null jika sukses) |

#### Tab: Config

| Column | Type | Description |
|---|---|---|
| key | String | Configuration key |
| value | String | Configuration value |

**Config Entries**:

| Key | Value |
|---|---|
| webinar_day1_date | 2026-08-06 |
| webinar_day1_start | 19:30 |
| webinar_day1_end | 21:00 |
| bonus_unlock_day1 | 21:00 |
| bonus_lock_day1 | 23:59 |
| webinar_day2_date | 2026-08-07 |
| ... | (same pattern) |
| webinar_link | (Zoom/YouTube link) |
| speaker_name | (Speaker name) |
| speaker_bio | (Speaker bio) |
| admin_password | (Admin dashboard password) |

---

## 22. Error Handling & Edge Cases

### Frontend Error Handling

| Scenario | Behavior |
|---|---|
| API call gagal | Tampilkan toast error: "Something went wrong. Please try again." |
| API timeout | Auto-retry 1x setelah 3 detik. Jika gagal lagi, tampilkan error. |
| Network offline | Cek `navigator.onLine`. Jika offline, tampilkan "No internet connection" banner. |
| Invalid URL params | Redirect ke halaman utama |
| Assessment load gagal | Tampilkan error + tombol "Try Again" |

### Backend Error Handling

| Scenario | Behavior |
|---|---|
| Google Sheets timeout | Retry 1x. Jika gagal, return 500 error. Log ke error tab. |
| Email sending gagal | Log ke Email_Log tab dengan status "failed". Jangan throw error. |
| Invalid JSON di request | Return 400: "Invalid request format" |
| Missing required fields | Return 400: "Missing field: [field_name]" |
| Apps Script execution timeout | Wrap dalam try-catch. Log error. Return 500. |

### Edge Cases

| Scenario | Handling |
|---|---|
| User register dengan email yang sudah ada | Return 409 DUPLICATE_EMAIL. Tampilkan "This email is already registered. Check your inbox!" |
| User akses assessment tanpa register | Return 401. Redirect ke register page. |
| User coba akses Day 2 tanpa selesaikan Day 1 | Return 403. Tampilkan "Complete Day 1 assessment first." |
| User submit assessment 2x | Cek di backend. Jika sudah submitted, return 409. Redirect ke results. |
| User ganti browser di tengah assessment | Autosave di localStorage tidak tersedia. Mulai dari awal. Tampilkan informasi: "Your previous progress was on a different device. Starting fresh." |
| User tutup browser saat assessment | Autosave di localStorage tetap tersimpan. Saat buka lagi, tawarkan restore. |
| User klik link email reminder untuk hari yang sudah lewat | Tampilkan "This session has ended. Check your results instead." |
| Config tab kosong atau corrupt | Use hardcoded fallback values. Log warning. |

---

## 23. Future Features (v2)

### Prioritized List

| Priority | Feature | Effort | Impact |
|---|---|---|---|
| P1 | Certificate System | Medium | High |
| P1 | Referral System | Medium | High |
| P2 | Leaderboard | Low | Medium |
| P2 | Gamification (badges, points) | Medium | Medium |
| P2 | Progress Tracking Dashboard | Low | Medium |
| P3 | AI-Powered Recommendations | High | High |
| P3 | Payment Integration | High | High |
| P3 | Community Features | High | Medium |
| P3 | Interactive Webinar Features | High | Medium |

### Admin Dashboard Enhancements (v2)

- Export data to CSV
- Email open rate tracking (with third-party service)
- Real-time attendance counter during webinar
- Custom date range filtering
- Comparison between webinar batches

---

## 24. Deliverable & Appendix

### Project Scope

#### In Scope (v1)

- Landing page responsif (mobile-first) dengan sticky CTA
- Registration form (3 fields) dengan validasi
- Status webinar dinamis (Upcoming / Live / Finished)
- Bonus unlock system (21:00-23:59 WIB per hari)
- 3 Assessment (Day 1, 2, 3) dengan progressive unlock
- Scoring system (100 poin per assessment)
- Recommendation engine (Beginner/Intermediate/Advanced)
- Email automation (6 types)
- Autosave assessment (localStorage)
- Post-webinar end state
- Admin dashboard
- Anti-cheat measures (backend time validation)

#### Out of Scope (v1)

- User login / authentication system
- Payment gateway
- Live webinar streaming
- Mobile app
- Multi-language support
- Certificate generation
- WhatsApp integration beyond contact link

### Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | User bisa registrasi (3 fields) | Must Have |
| FR-002 | Validasi frontend + backend | Must Have |
| FR-003 | Email konfirmasi async | Must Have |
| FR-004 | Countdown timer di Hero | Must Have |
| FR-005 | Sticky CTA di mobile | Must Have |
| FR-006 | Status webinar dinamis | Must Have |
| FR-007 | Bonus lock/unlock per jadwal | Must Have |
| FR-008 | Bonus "ended" state dengan pesan | Must Have |
| FR-009 | Assessment 3 hari dengan progressive unlock | Must Have |
| FR-010 | Autosave assessment di localStorage | Must Have |
| FR-011 | One submission per assessment | Must Have |
| FR-012 | Scoring otomatis (backend) | Must Have |
| FR-013 | Result page dengan radar chart | Must Have |
| FR-014 | Recommendation engine | Must Have |
| FR-015 | Post-webinar end state | Must Have |
| FR-016 | Admin dashboard | Must Have |
| FR-017 | Download bonus files | Must Have |
| FR-018 | Email reminder (1 jam sebelum) | Should Have |
| FR-019 | Email bonus unlock notification | Should Have |
| FR-020 | Add to calendar (Google Calendar) | Should Have |
| FR-021 | Bookmark protection (state validation) | Should Have |
| FR-022 | Backend time validation (anti-cheat) | Should Have |
| FR-023 | Email follow-up soft selling | Should Have |
| FR-024 | WhatsApp floating button | Nice to Have |
| FR-025 | Share results functionality | Nice to Have |

### Non-Functional Requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-001 | Performance: Page load < 3 detik | LCP < 3s |
| NFR-002 | Responsiveness: Support 320px - 1920px | Mobile-first |
| NFR-003 | Browser: Chrome, Firefox, Safari, Edge | Latest 2 versions |
| NFR-004 | Security: Input sanitization | XSS prevention |
| NFR-005 | Security: Backend time validation | Anti-cheat |
| NFR-006 | Accessibility: Semantic HTML | ARIA labels |
| NFR-007 | SEO: Meta tags, Open Graph | Basic SEO |
| NFR-008 | Offline: Autosave to localStorage | Assessment recovery |
| NFR-009 | Error: Graceful handling | User-friendly errors |
| NFR-010 | Data: Privacy policy | Data protection |

### Development Roadmap

#### Phase 0: Setup (Day 1)

- [ ] Setup GitHub repo
- [ ] Setup Google Apps Script project
- [ ] Setup Google Sheets database
- [ ] Define design system (colors, fonts, spacing)
- [ ] Deploy Apps Script as Web App (initial)

#### Phase 1: Landing Page (Day 2-3)

- [ ] Hero section with countdown
- [ ] About section
- [ ] Speaker section
- [ ] Agenda section
- [ ] Bonus section
- [ ] FAQ section
- [ ] Registration form
- [ ] Footer
- [ ] Sticky CTA (mobile)
- [ ] WhatsApp floating button
- [ ] Responsive design

#### Phase 2: Registration System (Day 4-5)

- [ ] Registration form UI
- [ ] Frontend validation
- [ ] Backend `/register` endpoint
- [ ] Backend `/check-email` endpoint
- [ ] Email konfirmasi (async)
- [ ] Thank you / success state
- [ ] Google Calendar integration

#### Phase 3: Webinar & Bonus System (Day 6-7)

- [ ] Webinar status logic (backend)
- [ ] Bonus lock/unlock mechanism
- [ ] Bonus download flow
- [ ] Bonus "ended" state
- [ ] Day-specific page states
- [ ] Email reminder (time-based)
- [ ] Email bonus unlock notification

#### Phase 4: Assessment System (Day 8-10)

- [ ] Assessment UI (question cards, progress bar)
- [ ] Backend `/assessment-questions` endpoint
- [ ] Backend `/submit-assessment` endpoint
- [ ] Scoring engine (backend)
- [ ] Progressive unlock logic (Day 2 requires Day 1, etc.)
- [ ] Autosave to localStorage
- [ ] One-submission enforcement
- [ ] Randomize question order (backend)

#### Phase 5: Results & Recommendation (Day 11-12)

- [ ] Result page with radar chart
- [ ] Level badge display
- [ ] Recommendation engine
- [ ] Backend `/result` endpoint
- [ ] Backend `/user-status` endpoint
- [ ] Email assessment results
- [ ] Share results functionality

#### Phase 6: Admin Dashboard (Day 13)

- [ ] Admin page UI
- [ ] Backend `/admin/dashboard` endpoint
- [ ] Registration overview widget
- [ ] Assessment completion widget
- [ ] Score distribution chart
- [ ] Bonus download stats
- [ ] Email status widget
- [ ] Conversion funnel

#### Phase 7: Email Automation & Polish (Day 14-15)

- [ ] All 6 email types
- [ ] Time-based triggers setup
- [ ] Unsubscribe mechanism
- [ ] Email error logging
- [ ] Post-webinar end state
- [ ] Edge case handling
- [ ] Cross-browser testing
- [ ] Performance optimization

#### Phase 8: Testing & Launch (Day 16-17)

- [ ] End-to-end testing (full flow)
- [ ] Mobile testing (real devices)
- [ ] Security review (anti-cheat, backend validation)
- [ ] Load testing (simulate 50 concurrent users)
- [ ] Content review & proofreading
- [ ] Deploy frontend to GitHub Pages
- [ ] Deploy backend to Apps Script (production)
- [ ] Final smoke test
- [ ] LAUNCH

### Milestone

| Milestone | Target | Deliverable |
|---|---|---|
| **M0** | Day 1 | Setup complete, docs finalized |
| **M1** | Day 3 | Responsive landing page |
| **M2** | Day 5 | Registration + email working |
| **M3** | Day 7 | Bonus system working |
| **M4** | Day 10 | Assessment system working |
| **M5** | Day 12 | Results + recommendation working |
| **M6** | Day 13 | Admin dashboard working |
| **M7** | Day 15 | Email automation complete |
| **M8** | Day 17 | Testing complete, deployed |

### Folder Structure

```text
sgbva-webinar/
|
|-- index.html                    # Landing page utama
|-- register.html                 # Registration success page
|-- assessment.html               # Assessment (dynamic, ?day=1,2,3)
|-- result.html                   # Hasil assessment
|-- bonus.html                    # Bonus hub (dynamic, ?day=1,2,3)
|-- status.html                   # Check your status
|-- faq.html                      # FAQ
|-- privacy.html                  # Kebijakan privasi
|-- thank-you.html                # Post-registration
|-- post-webinar.html             # Post-webinar summary
|-- admin.html                    # Admin dashboard
|
|-- css/
|   |-- styles.css                # Main + component styles
|   |-- responsive.css            # Responsive breakpoints
|
|-- js/
|   |-- app.js                    # Main application logic
|   |-- countdown.js              # Countdown timer
|   |-- registration.js           # Registration form
|   |-- assessment.js             # Assessment engine + autosave
|   |-- charts.js                 # Chart.js config
|   |-- admin.js                  # Admin dashboard
|   |-- api.js                    # API client
|   |-- utils.js                  # Shared utilities
|
|-- assets/
|   |-- images/
|   |   |-- logo.svg
|   |   |-- hero-bg.jpg
|   |   |-- speaker/
|   |-- pdf/
|       |-- day1/
|       |-- day2/
|       |-- day3/
|
|-- apps-script/
|   |-- Code.gs                   # Main entry + routing
|   |-- Registration.gs           # Registration handler
|   |-- Assessment.gs             # Assessment + scoring
|   |-- Bonus.gs                  # Bonus status + download
|   |-- Email.gs                  # Email automation
|   |-- Admin.gs                  # Admin dashboard data
|   |-- Utils.gs                  # Shared utilities
|   |-- Config.gs                 # Configuration
|
|-- docs/
|   |-- PROJECT_FLOW.md           # Original flow
|   |-- PROJECT_FLOW_REVIEW.md    # Critical review
|   |-- PROJECT_FLOW_V2.md        # This document (final)
|
|-- README.md
|-- .gitignore
```

### Kesimpulan

PROJECT_FLOW_V2 adalah dokumen final yang menyelesaikan semua kontradiksi dan pertanyaan terbuka dari V1. Setiap keputusan desain sudah dibuat secara eksplisit:

- **Bonus window**: 21:00-23:59 WIB, lalu "ended" dengan pesan yang mengarah ke sesi berikutnya
- **Assessment rules**: One submission, progressive unlock, autosave
- **Score formula**: Eksplisit dengan contoh worked
- **Post-webinar state**: Congratulations + report + recommendation
- **Admin dashboard**: Didefinisikan lengkap untuk demo/presentasi
- **Anti-cheat**: Backend time validation, no frontend time logic
- **Autosave**: localStorage dengan recovery flow
- **Bookmark protection**: State validation via backend

Dokumen ini siap menjadi acuan untuk SYSTEM_ARCHITECTURE.md, DATABASE_SCHEMA.md, dan TASK_BREAKDOWN.md sebelum memulai coding.

---

**Document prepared by**: System Analyst
**Date**: July 31, 2026
**Version**: 2.0 (Final)
**Status**: Ready for Architecture & Development
