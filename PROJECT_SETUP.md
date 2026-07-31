# Project Setup Guide

Complete guide to set up the SGBVA Webinar project for local development.

---

## Prerequisites

### Required Software

| Software | Version | Purpose | Install |
|---|---|---|---|
| **Git** | 2.30+ | Version control | [git-scm.com](https://git-scm.com) |
| **Node.js** | 18+ (optional) | Local dev server | [nodejs.org](https://nodejs.org) |
| **Google Account** | - | Apps Script, Sheets, Drive, Gmail | [accounts.google.com](https://accounts.google.com) |
| **Text Editor** | - | VS Code recommended | [code.visualstudio.com](https://code.visualstudio.com) |
| **Web Browser** | Latest | Chrome or Firefox for testing | - |

### VS Code Extensions (Recommended)

| Extension | Purpose |
|---|---|
| Live Server | Local dev server with hot reload |
| Tailwind CSS IntelliSense | Tailwind autocomplete |
| Prettier | Code formatting |
| GitLens | Git history visualization |

---

## Repository Setup

### 1. Clone or Initialize

```bash
# Option A: Clone existing repo
git clone https://github.com/your-username/sgbva-webinar.git
cd sgbva-webinar

# Option B: Initialize new repo
mkdir sgbva-webinar && cd sgbva-webinar
git init
```

### 2. Install No Dependencies

This project intentionally uses NO npm packages. Everything runs via CDN:

- Tailwind CSS: `https://cdn.tailwindcss.com`
- Chart.js: `https://cdn.jsdelivr.net/npm/chart.js`
- AOS (Animate On Scroll): `https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css`
- Lucide Icons: `https://unpkg.com/lucide@latest`

No `package.json` needed. No `node_modules`. Just open `index.html` in a browser.

### 3. Local Development Server

```bash
# Option A: VS Code Live Server (recommended)
# Right-click index.html -> "Open with Live Server"

# Option B: Python
python -m http.server 8000

# Option C: Node.js
npx serve .

# Option D: PHP
php -S localhost:8000
```

All options work. The site is pure HTML/CSS/JS with no build step.

---

## Google Apps Script Setup

### 1. Create Google Sheets Database

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create new spreadsheet named: **SGBVA Webinar Database**
3. Create the following tabs (empty for now, schema defined in DATABASE_SCHEMA.md):
   - `Participants`
   - `Assessments`
   - `Results`
   - `Downloads`
   - `Email_Log`
   - `Config`
4. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
   ```

### 2. Create Google Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Click **New Project**
3. Rename project to: **SGBVA Webinar API**
4. Link the spreadsheet:
   - Click **Resources** -> **Linked Google APIs**
   - Or use `SpreadsheetApp.openById('{SPREADSHEET_ID}')` in code

### 3. Deploy as Web App

1. Click **Deploy** -> **New deployment**
2. Select type: **Web app**
3. Description: **SGBVA Webinar API v1**
4. Execute as: **Me** (your Google account)
5. Who has access: **Anyone** (public access)
6. Click **Deploy**
7. Copy the Web App URL:
   ```
   https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec
   ```
8. This URL goes in `js/api.js` as the `API_BASE_URL`

### 4. Set Up Time-Based Triggers

After deploying, set up triggers in Apps Script:

| Trigger | Function | Schedule |
|---|---|---|
| Webinar Reminder Day 1 | `sendReminder(1)` | 6 Aug 2026, 18:30 WIB |
| Webinar Reminder Day 2 | `sendReminder(2)` | 7 Aug 2026, 18:30 WIB |
| Webinar Reminder Day 3 | `sendReminder(3)` | 8 Aug 2026, 18:30 WIB |
| Bonus Unlock Day 1 | `processBonusUnlock(1)` | 6 Aug 2026, 21:00 WIB |
| Bonus Unlock Day 2 | `processBonusUnlock(2)` | 7 Aug 2026, 21:00 WIB |
| Bonus Unlock Day 3 | `processBonusUnlock(3)` | 8 Aug 2026, 21:00 WIB |
| Bonus Ended Day 1 | `processBonusEnded(1)` | 7 Aug 2026, 00:00 WIB |
| Bonus Ended Day 2 | `processBonusEnded(2)` | 8 Aug 2026, 00:00 WIB |
| Bonus Ended Day 3 | `processBonusEnded(3)` | 9 Aug 2026, 00:00 WIB |
| Final Follow-up | `sendFinalFollowup()` | 10 Aug 2026, 10:00 WIB |

---

## GitHub Pages Deployment

### 1. Create GitHub Repository

```bash
# Create repo on GitHub (via web or CLI)
gh repo create sgbva-webinar --public --source=. --push
```

### 2. Enable GitHub Pages

1. Go to repository **Settings** -> **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **(root)**
4. Click **Save**
5. Site will be live at: `https://your-username.github.io/sgbva-webinar/`

### 3. Custom Domain (Optional)

1. Add a `CNAME` file in root with your domain
2. Configure DNS at your domain provider:
   ```
   Type: CNAME
   Name: @
   Value: your-username.github.io
   ```
3. Enable HTTPS in GitHub Pages settings

### 4. Deployment Flow

```
git push origin main
  |
  v
GitHub Actions (auto-deploy)
  |
  v
GitHub Pages updated (1-3 minutes)
  |
  v
Live at https://your-username.github.io/sgbva-webinar/
```

No build step. Push to `main` = deploy.

---

## Configuration

### Frontend Configuration

Create `js/config.js` (not committed to git, listed in .gitignore):

```javascript
const CONFIG = {
  API_BASE_URL: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',
  WEBINAR_DAYS: [
    { day: 1, date: '2026-08-06', startTime: '19:30', endTime: '21:00' },
    { day: 2, date: '2026-08-07', startTime: '19:30', endTime: '21:00' },
    { day: 3, date: '2026-08-08', startTime: '19:30', endTime: '21:00' },
  ],
  BONUS_UNLOCK_TIME: '21:00',
  BONUS_LOCK_TIME: '23:59',
  TIMEZONE: 'Asia/Jakarta',
  ADMIN_PASSWORD: 'your-admin-password-here',
};
```

### Backend Configuration (Config Tab)

In Google Sheets `Config` tab, set these values:

```
webinar_day1_date = 2026-08-06
webinar_day1_start = 19:30
webinar_day1_end = 21:00
bonus_unlock_day1 = 21:00
bonus_lock_day1 = 23:59
webinar_day2_date = 2026-08-07
webinar_day2_start = 19:30
webinar_day2_end = 21:00
bonus_unlock_day2 = 21:00
bonus_lock_day2 = 23:59
webinar_day3_date = 2026-08-08
webinar_day3_start = 19:30
webinar_day3_end = 21:00
bonus_unlock_day3 = 21:00
bonus_lock_day3 = 23:59
webinar_link = https://zoom.us/j/XXXXXXXXX
speaker_name = (Speaker Name)
speaker_bio = (Speaker Bio)
admin_password = (Admin Password)
```

---

## Development Workflow

### Daily Development

```bash
# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/landing-page-hero

# Make changes
# ...

# Test locally
# Open in browser, verify all sections

# Commit and push
git add .
git commit -m "feat: add hero section with countdown timer"
git push origin feature/landing-page-hero

# Create PR on GitHub
# Merge to main after review
```

### Testing Checklist (Per Feature)

- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x812 -- iPhone)
- [ ] Mobile (360x800 -- Android)
- [ ] Chrome latest
- [ ] Firefox latest
- [ ] Safari latest (if Mac available)

---

## Troubleshooting

| Problem | Solution |
|---|---|
| CORS error on API calls | Ensure Apps Script is deployed with "Execute as: Me" and "Who has access: Anyone" |
| Tailwind classes not working | Ensure CDN script is loaded before any Tailwind classes are used |
| Countdown shows wrong time | Verify timezone offset. WIB = UTC+7. Check `Config` tab dates. |
| Email not sending | Check GmailApp daily quota (100 for free, 1500 for Workspace). Check Email_Log tab. |
| Google Sheets timeout | Reduce concurrent writes. Add retry logic in Apps Script. |
| GitHub Pages not updating | Clear browser cache. Check Actions tab for deployment status. Wait 2-3 minutes. |
| Apps Script 6-minute timeout | Split long operations into smaller functions. Use time-based triggers for batch work. |
