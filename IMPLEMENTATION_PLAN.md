# Implementation Plan

Sprint-based development plan for the SGBVA Webinar Landing Page project.

**Source of Truth**: `docs/PROJECT_FLOW_V2.md`
**Estimated Total Effort**: 17 working days (3.5 weeks)
**Methodology**: Sprint-based, one feature at a time, fully tested before moving on.

---

## Sprint Overview

| Sprint | Name | Days | Dependencies |
|---|---|---|---|
| 0 | Project Setup & Infrastructure | 1 | None |
| 1 | Landing Page Core | 3 | Sprint 0 |
| 2 | Registration System | 2 | Sprint 1 |
| 3 | Assessment Engine | 3 | Sprint 2 |
| 4 | Google Apps Script Backend | 2 | Sprint 2 |
| 5 | Email Automation | 1 | Sprint 4 |
| 6 | Results, Recommendation & Bonus | 2 | Sprint 3, 4, 5 |
| 7 | Admin Dashboard | 1 | Sprint 4 |
| 8 | Post-Webinar, Polish & Testing | 2 | All |

---

## Sprint 0: Project Setup & Infrastructure

**Goal**: Repository initialized, folder structure created, documentation complete, Git workflow active.

**Duration**: 1 day

### Tasks

| # | Task | Detail |
|---|---|---|
| 0.1 | Initialize Git repository | `git init`, `.gitignore`, initial commit |
| 0.2 | Create folder structure | All directories per PROJECT_FLOW_V2.md |
| 0.3 | Create `index.html` boilerplate | HTML5 doctype, meta tags, Tailwind CDN, basic layout |
| 0.4 | Create `css/styles.css` | CSS variables, base styles, font imports |
| 0.5 | Create `css/responsive.css` | Responsive breakpoints (320, 375, 768, 1024, 1280, 1920) |
| 0.6 | Create `js/utils.js` | Shared utilities (time formatting, WIB conversion, debounce, sanitize) |
| 0.7 | Create `js/api.js` | API client skeleton (fetch wrapper, error handling, base URL config) |
| 0.8 | Set up local dev server | Verify Live Server or alternative works |
| 0.9 | Verify Tailwind CSS loads | Ensure utility classes work in browser |
| 0.10 | Push to GitHub | Create repo, push initial commit, enable GitHub Pages |

### Deliverables

- Working Git repository with clean initial commit
- All folders and files created (empty or boilerplate)
- Local development server working
- GitHub Pages enabled (showing empty page)

### Dependencies

None.

### Estimated Effort

1 day (4-6 hours)

---

## Sprint 1: Landing Page Core

**Goal**: Complete responsive landing page with all sections from PROJECT_FLOW_V2.md Section 4.

**Duration**: 3 days

### Day 1: Structure & Hero

| # | Task | Detail |
|---|---|---|
| 1.1 | Build Header/Navigation | Sticky header, logo, nav links, CTA button, mobile hamburger menu |
| 1.2 | Build Hero Section | Headline, subheadline, CTA button, background, social proof text |
| 1.3 | Build Countdown Timer | `countdown.js` -- countdown to Day 1 (19:30 WIB, 6 Aug 2026). Days, hours, minutes, seconds |
| 1.4 | Build Sticky CTA (Mobile) | Fixed bottom button "Register Now", only visible < 768px, scroll to form |
| 1.5 | Build About Section | Headline, benefits, format info, icons |
| 1.6 | Build Speaker Section | Speaker card(s), photo, name, title, bio, social links |

### Day 2: Content Sections

| # | Task | Detail |
|---|---|---|
| 1.7 | Build Agenda Section | Timeline visual for 3 days, topics, duration, bonus preview |
| 1.8 | Build Bonus Section | 3 bonus cards with locked state (shimmer effect, lock icon) |
| 1.9 | Build FAQ Section | Accordion component, 6-8 questions with answers |
| 1.10 | Build Registration Form Section | "What You'll Get" summary, form (3 fields), privacy notice, "What Happens Next", "Already Registered?" link |
| 1.11 | Build Footer | Brand logo, nav links, social media, WhatsApp button, copyright |

### Day 3: Responsive & Polish

| # | Task | Detail |
|---|---|---|
| 1.12 | Mobile responsive pass | Test all sections at 375px, 768px, fix layout issues |
| 1.13 | Tablet responsive pass | Test at 768px-1024px |
| 1.14 | Animation setup | AOS (Animate On Scroll) integration for section reveals |
| 1.15 | WhatsApp floating button | Fixed bottom-right, click-to-WhatsApp |
| 1.16 | Cross-browser testing | Chrome, Firefox, Safari (if available) |
| 1.17 | Performance check | Ensure page loads < 3s, images optimized |

### Deliverables

- Complete responsive landing page (HTML + CSS + JS)
- All 9 sections working on mobile, tablet, desktop
- Countdown timer functional
- Sticky CTA working on mobile
- No JavaScript errors in console

### Dependencies

Sprint 0 (infrastructure, Tailwind, base files)

### Estimated Effort

3 days (12-18 hours)

---

## Sprint 2: Registration System

**Goal**: Working registration form with frontend validation and backend API integration.

**Duration**: 2 days

### Day 1: Frontend

| # | Task | Detail |
|---|---|---|
| 2.1 | Frontend validation | Real-time validation for name (2-100 chars, unicode), email (format), WhatsApp (Indonesia format, 10-15 digits) |
| 2.2 | Visual feedback | Border color change, error messages below fields |
| 2.3 | Submit button states | Default, loading (spinner), disabled, success |
| 2.4 | Prevent double submit | Disable button after click, re-enable on error |
| 2.5 | Success modal | "Registration Confirmed!" with schedule, Add to Calendar buttons, Share button |
| 2.6 | Google Calendar integration | Generate Google Calendar URL for each day |

### Day 2: Backend Integration

| # | Task | Detail |
|---|---|---|
| 2.7 | Build `/register` endpoint in Apps Script | Validate, sanitize, write to Participants tab, return success |
| 2.8 | Build `/check-email` endpoint | Check if email exists in Participants tab |
| 2.9 | Connect frontend to backend | `registration.js` calls `api.js` which calls Apps Script |
| 2.10 | Error handling | Duplicate email (409), network error, timeout |
| 2.11 | Build `/user-status` endpoint | Return registration status, assessment status, bonus downloads |
| 2.12 | Build `status.html` page | Simple form: enter email -> show your status |

### Deliverables

- Registration form with full validation
- Backend registration endpoint working
- Email uniqueness check
- Success modal with calendar integration
- Status check page

### Dependencies

Sprint 1 (landing page with form section), Sprint 4 can run in parallel for basic Apps Script setup

### Estimated Effort

2 days (8-12 hours)

---

## Sprint 3: Assessment Engine

**Goal**: Complete 3-day assessment system with autosave, progressive unlock, and scoring.

**Duration**: 3 days

### Day 1: Assessment UI

| # | Task | Detail |
|---|---|---|
| 3.1 | Build `assessment.html` page | Dynamic page that loads based on `?day=1,2,3` parameter |
| 3.2 | Build question card component | Question number, text, 4 option cards (A/B/C/D) |
| 3.3 | Build progress bar | Linear progress: "Question 3 of 20" |
| 3.4 | Build navigation | Previous/Next buttons, disabled states |
| 3.5 | Build prerequisite check | If Day 2 requested but Day 1 not done, redirect with message |
| 3.6 | Build "already submitted" state | If assessment already done, show score + redirect to results |

### Day 2: Autosave & Submission

| # | Task | Detail |
|---|---|---|
| 3.7 | Implement localStorage autosave | Save answers on every change (debounce 500ms). Key: `assessment_day{X}_{email_hash}` |
| 3.8 | Implement recovery flow | On page load, check localStorage. If saved + not submitted: "Continue where you left off?" modal |
| 3.9 | Implement "Start Fresh" option | Clear localStorage entry, load blank assessment |
| 3.10 | Build submit flow | Validate all questions answered, POST to backend, clear localStorage on success |
| 3.11 | Build confirmation modal | "Are you sure? You can't change answers after submitting." |
| 3.12 | Build loading state during submission | Spinner + "Calculating your results..." |

### Day 3: Scoring Engine

| # | Task | Detail |
|---|---|---|
| 3.13 | Build `/assessment-questions` endpoint | Fetch questions from backend, randomize order, return with session ID |
| 3.14 | Build `/submit-assessment` endpoint | Validate answers, calculate score per category, save to Assessments tab, update Results tab |
| 3.15 | Implement score formula | `(correct/total) * category_weight_points`. Day 1: 5 categories x 20pts. Day 2-3: 4 categories x 25pts |
| 3.16 | Implement progressive unlock logic | Day 2 blocked until Day 1 submitted. Day 3 blocked until Day 2 submitted. |
| 3.17 | Implement one-submission enforcement | Check Results tab before allowing submission. Return 409 if already submitted. |
| 3.18 | Test full assessment flow | Complete Day 1 -> verify Day 2 unlocks -> complete Day 2 -> verify Day 3 unlocks |

### Deliverables

- Assessment page working for all 3 days
- Autosave to localStorage with recovery
- One-submission enforcement
- Progressive unlock working
- Scoring engine calculating correctly
- All 60 questions (20 per day) with correct scoring

### Dependencies

Sprint 2 (registration, user identification), Sprint 4 (Apps Script endpoints)

### Estimated Effort

3 days (12-18 hours)

---

## Sprint 4: Google Apps Script Backend

**Goal**: All Apps Script endpoints fully functional, tested, and deployed.

**Duration**: 2 days

### Day 1: Core Endpoints

| # | Task | Detail |
|---|---|---|
| 4.1 | Set up `Code.gs` routing | Main entry point, route requests by `action` parameter |
| 4.2 | Set up `Config.gs` | All configuration constants, spreadsheet ID |
| 4.3 | Set up `Utils.gs` | WIB time conversion, UUID generation, input sanitization, error response helpers |
| 4.4 | Build `Registration.gs` | `doRegister()`, `doCheckEmail()`, `doGetUserStatus()` |
| 4.5 | Build `Assessment.gs` | `doGetQuestions()`, `doSubmitAssessment()`, `doGetResult()` |
| 4.6 | Build `Bonus.gs` | `doGetBonusStatus()`, `doGetBonusDownload()` |
| 4.7 | Deploy and test | Deploy as Web App, test all endpoints with curl or Postman |

### Day 2: Advanced Endpoints & Anti-Cheat

| # | Task | Detail |
|---|---|---|
| 4.8 | Build `Admin.gs` | `doGetDashboard()`, `doGetParticipants()` |
| 4.9 | Implement backend time validation | All bonus/status checks use server time (UTC+7), not user-provided time |
| 4.10 | Implement session ID validation | Assessment sessions validated server-side |
| 4.11 | Implement rate limiting | Basic: reject >3 requests from same email within 60 seconds |
| 4.12 | Implement input length enforcement | Backend max lengths: name(100), email(254), whatsapp(15) |
| 4.13 | Error logging | All errors logged to a debug tab or console for troubleshooting |
| 4.14 | Set up time-based triggers | Webinar reminders, bonus unlock notifications, follow-up emails |

### Deliverables

- All API endpoints functional
- Backend time validation working (anti-cheat)
- Rate limiting active
- Time-based triggers configured
- Deployed and tested via Postman/curl

### Dependencies

Sprint 2 (registration flow defines what backend needs)

### Estimated Effort

2 days (8-12 hours)

---

## Sprint 5: Email Automation

**Goal**: All 6 email types sent correctly with proper content and timing.

**Duration**: 1 day

### Tasks

| # | Task | Detail |
|---|---|---|
| 5.1 | Build `Email.gs` | Email sending functions for all 6 types |
| 5.2 | Email 1: Registration Confirmation | Subject, body, calendar buttons, unsubscribe link |
| 5.3 | Email 2: Webinar Reminder | Subject, body, join link, "1 hour until we start" |
| 5.4 | Email 3: Bonus Unlock | Subject, body, download link, "expires at 23:59" |
| 5.5 | Email 4: Bonus Ended | Subject, body, "Join next session" message |
| 5.6 | Email 5: Assessment Results | Subject, score, level, recommendation, download links |
| 5.7 | Email 6: Final Follow-up | Subject, results summary, program recommendation, CTA |
| 5.8 | Implement unsubscribe | Token-based link, sets status to "unsubscribed" in Participants |
| 5.9 | Implement async email sending | Emails sent via time-based triggers, not inline with registration |
| 5.10 | Email error logging | Failed emails logged to Email_Log tab with status "failed" |
| 5.11 | Test all emails | Send test emails, verify formatting, links, unsubscribe |

### Deliverables

- All 6 email types working
- Unsubscribe mechanism functional
- Async email sending (no blocking registration)
- Error logging for failed emails
- Email templates tested

### Dependencies

Sprint 4 (Apps Script infrastructure)

### Estimated Effort

1 day (4-6 hours)

---

## Sprint 6: Results, Recommendation & Bonus

**Goal**: Result page with charts, recommendation engine, and bonus download system.

**Duration**: 2 days

### Day 1: Result Page & Recommendation

| # | Task | Detail |
|---|---|---|
| 6.1 | Build `result.html` page | Dynamic page with `?email=&token=&day=` parameters |
| 6.2 | Build radar chart | Chart.js radar chart showing score breakdown per category |
| 6.3 | Build level badge | Visual badge: Beginner (orange), Intermediate (blue), Advanced (green) |
| 6.4 | Build recommendation section | Personalized text based on level, program name, CTA |
| 6.5 | Build "Download Report" button | Generate simple PDF-like summary (or styled printable page) |
| 6.6 | Build "Share Results" button | Pre-filled WhatsApp message, Instagram story template |
| 6.7 | Implement total score calculation | Average of all completed assessments |
| 6.8 | Implement recommendation logic | Beginner -> Foundation, Intermediate -> Accelerator, Advanced -> Premium |

### Day 2: Bonus System

| # | Task | Detail |
|---|---|---|
| 6.9 | Build `bonus.html` page | Dynamic page with `?day=` parameter |
| 6.10 | Build bonus card component | Locked, Unlocked, Ended states with correct visuals |
| 6.11 | Build bonus countdown | Countdown to 21:00 (unlock) or 23:59 (lock) |
| 6.12 | Implement download flow | Click -> API call -> Google Drive URL -> log download -> navigate |
| 6.13 | Build "ended" state UI | "Bonus Day [X] has ended. Join the next session to unlock the next bonus." |
| 6.14 | Connect bonus status to backend | Real-time status check via `/bonus-status` endpoint |
| 6.15 | Build `post-webinar.html` | Congratulations page, final report, recommendation, share buttons |

### Deliverables

- Result page with radar chart, badge, recommendation
- Bonus page with 3 states (locked/unlocked/ended)
- Bonus download working
- Post-webinar summary page
- Share functionality

### Dependencies

Sprint 3 (assessment scoring), Sprint 4 (backend endpoints), Sprint 5 (result emails)

### Estimated Effort

2 days (8-12 hours)

---

## Sprint 7: Admin Dashboard

**Goal**: Admin dashboard showing real-time webinar statistics.

**Duration**: 1 day

### Tasks

| # | Task | Detail |
|---|---|---|
| 7.1 | Build `admin.html` page | Password-protected page (simple localStorage check) |
| 7.2 | Build registration overview widget | Total registered, today's count, trend |
| 7.3 | Build assessment completion widget | Per-day completion rates |
| 7.4 | Build score distribution chart | Bar chart: Beginner / Intermediate / Advanced |
| 7.5 | Build bonus download stats | Per-day download counts |
| 7.6 | Build email status widget | Sent / Failed / Pending counts |
| 7.7 | Build conversion funnel | Registered -> Assessed -> Recommended |
| 7.8 | Implement auto-refresh | Data refreshes every 60 seconds |
| 7.9 | Mobile responsive | Dashboard works on phone (for presenting) |
| 7.10 | Build `/admin/dashboard` endpoint | Aggregate data from all sheets tabs |

### Deliverables

- Password-protected admin dashboard
- 6 widgets displaying real-time data
- Auto-refresh working
- Mobile responsive

### Dependencies

Sprint 4 (all backend data)

### Estimated Effort

1 day (4-6 hours)

---

## Sprint 8: Post-Webinar, Polish & Testing

**Goal**: Edge cases handled, cross-browser tested, performance optimized, deployment verified.

**Duration**: 2 days

### Day 1: Edge Cases & Polish

| # | Task | Detail |
|---|---|---|
| 8.1 | Bookmark protection | Every page validates state via backend on load |
| 8.2 | Post-webinar state | Day 3 + 1 to Day 3 + 10: full post-webinar experience |
| 8.3 | Archive state | Day 3 + 10+: static archive page |
| 8.4 | Error pages | 404 page, network error page |
| 8.5 | Offline detection | Banner when network is down |
| 8.6 | Loading states | Skeleton loaders for all async data |
| 8.7 | Form input sanitization | XSS prevention, length limits |
| 8.8 | Email link validation | Unsubscribe tokens, result page tokens |

### Day 2: Testing & Deployment

| # | Task | Detail |
|---|---|---|
| 8.9 | End-to-end flow test | Register -> Webinar -> Assessment -> Results -> Bonus -> Post-webinar |
| 8.10 | Mobile testing | iPhone (375px), Android (360px), iPad (768px) |
| 8.11 | Cross-browser test | Chrome, Firefox, Safari, Edge |
| 8.12 | Performance audit | Lighthouse score check, optimize if needed |
| 8.13 | Security review | Anti-cheat validation, input sanitization, backend time checks |
| 8.14 | Content review | Proofread all text, verify all links work |
| 8.15 | Final deployment | Push to main, verify GitHub Pages, verify Apps Script |
| 8.16 | Smoke test production | Full flow test on live URL |

### Deliverables

- All edge cases handled
- Cross-browser compatible
- Performance optimized (< 3s load)
- Security reviewed
- Production deployment verified
- Full end-to-end test passed

### Dependencies

All previous sprints complete

### Estimated Effort

2 days (8-12 hours)

---

## Effort Summary

| Sprint | Name | Days | Hours (est.) |
|---|---|---|---|
| 0 | Project Setup | 1 | 4-6 |
| 1 | Landing Page Core | 3 | 12-18 |
| 2 | Registration System | 2 | 8-12 |
| 3 | Assessment Engine | 3 | 12-18 |
| 4 | Google Apps Script | 2 | 8-12 |
| 5 | Email Automation | 1 | 4-6 |
| 6 | Results & Bonus | 2 | 8-12 |
| 7 | Admin Dashboard | 1 | 4-6 |
| 8 | Testing & Polish | 2 | 8-12 |
| **Total** | | **17 days** | **68-102 hours** |

## Critical Path

```
Sprint 0 (Setup)
  |
  v
Sprint 1 (Landing Page)
  |
  v
Sprint 2 (Registration) ---+--- Sprint 4 (Apps Script)
  |                         |         |
  v                         v         v
Sprint 3 (Assessment)    Sprint 5 (Email)
  |                         |
  +-------------------------+
  |
  v
Sprint 6 (Results & Bonus)
  |
  v
Sprint 7 (Admin Dashboard)
  |
  v
Sprint 8 (Testing & Launch)
```

Sprint 4 (Apps Script) can run in parallel with Sprint 2 (Registration) since they can be developed independently and integrated later. Sprint 5 (Email) depends on Sprint 4.
