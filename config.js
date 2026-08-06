// =====================================================
// SGBVA CONFIGURATION CENTER
// Edit file ini untuk mengatur semua pengaturan website
// =====================================================

const SGBVA_CONFIG = {

  // =====================================================
  // WEBSITE SETTINGS
  // =====================================================
  site: {
    name: 'SGBVA',
    tagline: 'Virtual Assistant Career Relevance',
    baseUrl: 'https://herdianadani-101010.github.io/SGBVALandingPage'
  },

  // =====================================================
  // GOOGLE APPS SCRIPT URL
  // Deploy GAS Anda dan paste URL-nya di sini
  // =====================================================
  gasUrl: 'https://script.google.com/macros/s/AKfycbz0S-tu7BVrQ3AGG0vjaO5JoAgrsVLYg4X8kGSMpeGwvkYGKH2Ey3GBgItiOIR6AGQM/exec',

  // =====================================================
  // WEBINAR SCHEDULE (Tanggal & Waktu)
  // Format: YYYY-MM-DDTHH:mm:ss+07:00 (WIB)
  // =====================================================
  webinar: {
    day1: {
      date: '2026-08-07',
      time: '19:00',
      timezone: 'Asia/Jakarta',
      title: 'Virtual Assistant: Peluang Karier yang Realistis',
      zoomLink: 'https://zoom.us/j/1234567890'
    },
    day2: {
      date: '2026-08-08',
      time: '19:00',
      timezone: 'Asia/Jakarta',
      title: 'Rahasia Menjadi Virtual Assistant Pilihan Klien Internasional'
    },
    day3: {
      date: '2026-08-09',
      time: '19:00',
      timezone: 'Asia/Jakarta',
      title: 'Bongkar Hiring Gap & Susun 90-Day VA Action Plan'
    }
  },

  // =====================================================
  // FREE GIFT ACCESS CONTROL
  // Set true untuk bypass waktu (untuk testing)
  // Set false untuk mengikuti jadwal webinar
  // =====================================================
  freeGift: {
    bypassTimeRestriction: true,  // true = buka kapan saja, false = ikuti jadwal
    openAfterWebinar: true,        // Buka otomatis setelah webinar selesai
    assessmentRequired: true       // Wajib selesai assessment dulu
  },

  // =====================================================
  // ASSESSMENT ACCESS CONTROL
  // Set true untuk bypass waktu (untuk testing)
  // Set false untuk mengikuti jadwal webinar
  // =====================================================
  assessment: {
    bypassTimeRestriction: true,  // true = buka kapan saja, false = ikuti jadwal
    showInFreeGift: true           // Tampilkan di halaman free gift
  },

  // =====================================================
  // SPEAKER & HOST PHOTO
  // Ganti URL foto sesuai kebutuhan
  // =====================================================
  photos: {
    speaker: {
      main: 'DaniH.png',
      hero: 'DaniH.png',
      name: 'Dani Herdiana',
      title: 'Virtual Assistant & Career Coach',
      bio: 'Praktisi Virtual Assistant yang berpengalaman membantu individu menemukan dan membangun karier di bidang remote work. Dengan pemahaman mendalam tentang kebutuhan klien global, Dani memandu peserta memahami potensi diri dan langkah konkret menuju karier VA yang realistis.'
    },
    host: {
      main: 'lusi.png',
      name: 'Lusi',
      title: 'Host & Moderator'
    },
    logo: 'sgbva1.png'
  },

  // =====================================================
  // SPEAKER CREDENTIALS (Checklist di profil)
  // Edit sesuai kebutuhan
  // =====================================================
  speakerCredentials: [
    'Pengalaman langsung sebagai Virtual Assistant internasional',
    'Memahami kebutuhan dan standar klien global',
    'Membimbing peserta mengenali potensi karier mereka'
  ],

  // =====================================================
  // FREE GIFT ITEMS
  // Daftar free gift yang diberikan
  // =====================================================
  freeGifts: [
    {
      id: 'ai-prompt-pack',
      name: 'AI Prompt Pack',
      description: 'Prompt AI siap pakai untuk membantu pekerjaan VA',
      icon: 'lightning',
      color: 'blue',
      downloadUrl: '#'  // Ganti dengan URL download sebenarnya
    },
    {
      id: 'google-workspace-cheat-sheet',
      name: 'Google Workspace Cheat Sheet',
      description: 'Referensi cepat fitur Google Workspace untuk VA',
      icon: 'database',
      color: 'green',
      downloadUrl: '#'  // Ganti dengan URL download sebenarnya
    }
  ],

  // =====================================================
  // EMAIL TEMPLATE
  // Template email konfirmasi pendaftaran
  // =====================================================
  email: {
    subject: 'Pendaftaran Berhasil! Webinar SGBVA Day 1',
    greeting: 'Halo {{name}}!',
    body: `Selamat! Pendaftaran Anda berhasil.

TANGGAL: {{date}}
WAKTU: {{time}} WIB
PLATFORM: Zoom
LINK ZOOM: {{zoomLink}}

--- TAMBAHKAN KE KALENDER ---
{{calendarUrl}}

--- LINK PENTING ---
Free Gift: {{siteUrl}}/freegift-day1.html
Assessment: {{siteUrl}}/assessment.html

Setelah webinar selesai (jam 21:00 WIB), free gift akan terbuka otomatis.

Sampai jumpa!
Tim SGBVA`
  },

  // =====================================================
  // UI SETTINGS
  // Pengaturan tampilan
  // =====================================================
  ui: {
    theme: {
      brand: {
        50: '#FEF2F2',
        100: '#FFE9EB',
        500: '#980F45',
        900: '#4F071E'
      },
      accent: {
        50: '#FFFDF5',
        500: '#F4B73B'
      }
    },
    showCountdown: true,
    showTestimonials: true
  }
};

// =====================================================
// HELPER FUNCTIONS
// =====================================================

// Get webinar date as Date object
SGBVA_CONFIG.getWebinarDate = function(day) {
  const webinarDay = this.webinar[`day${day}`];
  if (!webinarDay) return null;

  const dateStr = `${webinarDay.date}T${webinarDay.time}:00+07:00`;
  return new Date(dateStr);
};

// Check if free gift should be accessible
SGBVA_CONFIG.isFreeGiftAccessible = function() {
  if (this.freeGift.bypassTimeRestriction) return true;

  const now = new Date();
  const webinarDate = this.getWebinarDate(1);

  if (!webinarDate) return false;

  // Free gift opens after webinar (2 hours after start)
  const openTime = new Date(webinarDate.getTime() + (2 * 60 * 60 * 1000));
  return now >= openTime;
};

// Check if assessment should be accessible
SGBVA_CONFIG.isAssessmentAccessible = function() {
  if (this.assessment.bypassTimeRestriction) return true;

  const now = new Date();
  const webinarDate = this.getWebinarDate(1);

  if (!webinarDate) return false;

  // Assessment opens 1 hour before webinar
  const openTime = new Date(webinarDate.getTime() - (1 * 60 * 60 * 1000));
  return now >= openTime;
};

// Format date for display
SGBVA_CONFIG.formatDate = function(date, format) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  if (format === 'short') {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  return date.toLocaleDateString('id-ID', options);
};

// Get calendar URL
SGBVA_CONFIG.getCalendarUrl = function(day) {
  const webinarDay = this.webinar[`day${day}`];
  if (!webinarDay) return '';

  const startDate = new Date(`${webinarDay.date}T${webinarDay.time}:00+07:00`);
  const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // +2 hours

  const formatDate = (d) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Webinar SGBVA Day ${day}`)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(`Webinar Gratis 3 Hari SGBVA\nHari ${day}: ${webinarDay.title}\n${webinarDay.time} - 21:00 WIB via Zoom`)}&location=${encodeURIComponent('Online via Zoom')}`;
};

// Make it globally available
window.SGBVA_CONFIG = SGBVA_CONFIG;
