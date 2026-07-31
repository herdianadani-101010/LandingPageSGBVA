# Technical Decisions

Rationale for every technology and architectural choice in this project.

---

## 1. Why Vanilla JavaScript (Not React, Vue, or any framework)

### Decision

Pure vanilla JavaScript with no framework.

### Rationale

1. **Zero build step**: No `npm install`, no `webpack`, no `vite`. Push HTML to GitHub Pages and it works immediately. This eliminates an entire category of deployment issues.

2. **Page count is small**: Only ~10 HTML pages. A framework's component reusability benefit is minimal when each page has distinct content.

3. **Performance**: No framework runtime overhead. First Contentful Paint under 1 second on a basic page. For a landing page where speed directly impacts conversion, this matters.

4. **GitHub Pages compatibility**: GitHub Pages serves static files. No server-side rendering needed. A framework would require a build step to generate static output, adding complexity for no benefit.

5. **Maintainability for single developer**: One person maintaining vanilla JS is simpler than maintaining a framework project with its dependency tree, version upgrades, and ecosystem churn.

6. **No node_modules**: The entire project is under 500KB of source code. No need for a package manager.

### Tradeoffs Accepted

- No component system (each page has its own HTML structure)
- No reactive data binding (manual DOM updates)
- No hot module replacement during development (use Live Server instead)

### Mitigations

- Shared CSS classes via Tailwind utilities
- Shared JS modules via ES modules (`type="module"`)
- Consistent UI patterns enforced by documentation (UI Components section in PROJECT_FLOW_V2.md)

---

## 2. Why GitHub Pages (Not Netlify, Vercel, or VPS)

### Decision

GitHub Pages for frontend hosting.

### Rationale

1. **Zero cost**: Free for public repositories. No credit card, no trial period, no usage limits for typical webinar traffic.

2. **Zero configuration**: Push to `main` branch = deployed. No build commands, no deploy scripts, no environment variables.

3. **Integrated with Git**: Deployment is a natural consequence of the development workflow. No separate deploy step to forget.

4. **HTTPS by default**: Automatic SSL certificate. No configuration needed.

5. **Custom domain support**: If needed later, CNAME record is all that's required.

6. **Reliability**: Backed by GitHub's infrastructure. 99.9%+ uptime SLA.

### Tradeoffs Accepted

- No server-side rendering (not needed -- all dynamic logic is in Apps Script)
- No edge functions (not needed)
- Build time: 1-3 minutes after push (acceptable for this project)
- 100GB bandwidth/month limit (more than enough for 20-100 participants)

### When to Migrate

If the project needs:
- Server-side rendering -> Netlify/Vercel
- Forms with server-side processing -> Netlify Forms
- More than 100GB bandwidth -> Cloudflare Pages
- Real-time features -> VPS or Cloudflare Workers

None of these apply to v1.

---

## 3. Why Google Apps Script (Not Node.js, Python, or Firebase)

### Decision

Google Apps Script as the backend.

### Rationale

1. **Zero infrastructure**: No server to provision, no Docker to configure, no database to manage. Apps Script runs inside Google's ecosystem.

2. **Google Sheets as database**: For 20-100 participants, Google Sheets is perfectly adequate. It's a familiar interface, data is visible without tools, and it's free.

3. **Gmail integration**: Email sending is built-in via `GmailApp`. No API keys, no SMTP configuration, no deliverability setup.

4. **Google Drive integration**: Bonus file storage and sharing is native. No upload logic needed.

5. **Time-based triggers**: Built-in scheduler for email reminders and bonus unlock notifications. No cron jobs, no external services.

6. **Deployment**: One-click deploy as Web App. URL is the API endpoint. No Nginx, no reverse proxy.

7. **Familiar to the team**: Google Workspace is already used. No new tools to learn.

### Tradeoffs Accepted

- 6-minute execution timeout per request (mitigated by keeping operations fast)
- ~100ms cold start on first request (mitigated by keeping warm)
- Limited to Google ecosystem (acceptable for this use case)
- No real-time capabilities (not needed)
- Free tier: 90 minutes/day execution time (more than enough for 20-100 users)

### When to Migrate

If the project needs:
- More than 1,000 concurrent users -> Node.js + PostgreSQL
- Real-time features -> Firebase or Supabase
- Complex business logic -> Node.js/Python backend
- Payment processing -> Dedicated backend with Stripe/Midtrans

None of these apply to v1.

---

## 4. Why Google Sheets (Not Firebase, Supabase, or PostgreSQL)

### Decision

Google Sheets as the primary database.

### Rationale

1. **Visual data access**: Open the spreadsheet and see all data immediately. No SQL queries, no admin panels, no database GUI tools needed.

2. **Manual data entry possible**: If someone needs to manually add a participant or fix data, they can edit the spreadsheet directly.

3. **Built into Apps Script**: `SpreadsheetApp` API is native. No external libraries, no connection strings, no authentication setup.

4. **Zero cost**: No database hosting fees. No per-row charges.

5. **Export-friendly**: Data can be exported to CSV, shared, or analyzed in Google Sheets directly.

6. **Sufficient for scale**: 5,000 rows is comfortable. 10,000 rows is manageable. Our target is 100 participants + their assessments = ~400 rows max.

### Tradeoffs Accepted

- No relational queries (use Google Apps Script filtering)
- No ACID transactions (acceptable for this use case)
- Concurrent write limitations (mitigated by low participant count)
- No indexes (acceptable for < 1,000 rows)

### Data Access Patterns

| Operation | Frequency | Method |
|---|---|---|
| Read participant by email | Every registration check | `getRange().getValues()` + filter |
| Write new registration | Per registration | `appendRow()` |
| Read assessment questions | Per assessment start | `getRange().getValues()` |
| Write assessment submission | Per submission | `appendRow()` |
| Read all results | Admin dashboard | `getRange().getValues()` |

All operations complete in < 2 seconds for our data volume.

---

## 5. Why Tailwind CSS (Not Bootstrap, Bulma, or Custom CSS)

### Decision

Tailwind CSS via CDN.

### Rationale

1. **Utility-first approach**: Build any design without writing custom CSS. Every spacing, color, and layout decision is inline.

2. **No build step**: Via CDN (`https://cdn.tailwindcss.com`), no PostCSS, no configuration file needed.

3. **Small output**: Only used classes are included (CDN version includes full library, but gzipped is ~30KB).

4. **Responsive made easy**: `sm:`, `md:`, `lg:` prefixes handle breakpoints without media queries.

5. **Design consistency**: Predefined spacing scale (4px, 8px, 12px...) prevents inconsistent sizing.

6. **Industry standard**: Widely used, well-documented, large community.

### Tradeoffs Accepted

- HTML can look "cluttered" with utility classes (mitigated by using `@apply` in custom CSS when patterns repeat)
- CDN version is not optimized for production (mitigated by small page size)
- No CSS modules or scoping (mitigated by BEM-like naming for custom classes)

### When to Consider Alternatives

If the project grows to 50+ pages with complex component reuse -> consider a CSS framework with component library (e.g., DaisyUI on top of Tailwind).

---

## 6. Why This Folder Structure

### Decision

```
sgbva-webinar/
├── index.html
├── css/
├── js/
├── assets/
├── apps-script/
├── docs/
└── .gitignore
```

### Rationale

1. **Flat HTML files at root**: All pages in root directory. Simple, predictable URLs (`/assessment.html` not `/pages/assessment/index.html`). GitHub Pages serves these directly.

2. **Separate `css/` and `js/`**: Clear separation of concerns. Easy to find files. Standard convention.

3. **Single `app.js` per concern**: Instead of 11 tiny JS files, we have 8 focused modules. Each has a clear responsibility.

4. **`apps-script/` folder**: Backend code lives in the same repository for version control, but is deployed separately. This keeps the full project in one repo.

5. **`docs/` folder**: Documentation is part of the project, not scattered elsewhere. Keeps everything self-contained.

6. **`assets/` folder**: Images, PDFs, and static resources. Separated from code for clarity.

### Why Not a `src/` Folder

A `src/` folder implies a build step. We have no build step. Files are served as-is. Adding `src/` would be misleading.

### Why Not `components/` Folder

No framework = no components. HTML sections are repeated across pages (header, footer), but this is acceptable for ~10 pages. DRY is less important than simplicity at this scale.

---

## 7. Why Single Assessment Page (Not 3 Separate Pages)

### Decision

One `assessment.html` page that loads content dynamically based on `?day=1,2,3` query parameter.

### Rationale

1. **One codebase to maintain**: UI logic, autosave, validation, and submission all live in one file.

2. **Consistent experience**: User sees the same interface regardless of which day they're on.

3. **Smaller codebase**: ~400 lines of JS instead of ~1200 lines across 3 files.

4. **Easier testing**: Test one page, cover all 3 days.

### Tradeoffs Accepted

- Slightly more complex routing logic (check `day` parameter)
- All 3 days' question sets loaded from API (not a problem for 60 questions)

---

## 8. Why localStorage for Autosave (Not Server-Side)

### Decision

Assessment answers autosaved to browser localStorage.

### Rationale

1. **Zero backend load**: No API calls during autosave. Google Sheets isn't designed for high-frequency writes.

2. **Instant save**: localStorage writes in < 1ms. No network latency.

3. **Works offline**: If internet drops mid-assessment, answers are preserved.

4. **Simple implementation**: `localStorage.setItem(key, JSON.stringify(data))` -- 2 lines of code.

5. **Adequate for scope**: User takes assessment on one device. Cross-device sync is not needed for v1.

### Tradeoffs Accepted

- Data lost if user clears browser data
- Data lost if user switches browser/device
- No cross-device sync

### Mitigations

- Display warning: "Your progress is saved on this device only"
- Clear localStorage only after successful submission
- Show recovery modal on page load if saved data exists

---

## 9. Why Token-Based Auth (Not Login System)

### Decision

Email + one-time token for accessing results and sensitive pages. No user accounts, no passwords.

### Rationale

1. **No login friction**: Users don't need to create accounts or remember passwords.

2. **Sufficient security**: Tokens are generated server-side, included in email links, and validated on access.

3. **Simple implementation**: Token = hash of email + secret + timestamp. Validate by re-computing.

4. **Appropriate for free webinar**: Login systems add significant complexity for no benefit when there's no premium content behind a paywall.

### Tradeoffs Accepted

- Tokens can be shared (acceptable for a free webinar)
- No session management (each page load is independent)
- Tokens expire (but that's a feature, not a bug)

---

## 10. Why No CSS Preprocessor (Sass, Less)

### Decision

Plain CSS with Tailwind utilities.

### Rationale

1. **No build step**: Sass requires compilation. We want zero build tools.

2. **Tailwind handles most styling**: Utility classes cover 90% of styling needs. Custom CSS is minimal.

3. **CSS custom properties**: Modern CSS variables (`--primary-color`) serve the same purpose as Sass variables.

4. **Simplicity**: One CSS file, loaded directly. No compilation pipeline.

### When to Reconsider

If custom CSS grows beyond 500 lines, consider Sass for nesting and mixins.

---

## 11. Why Chart.js (Not D3, ApexCharts, or Canvas API)

### Decision

Chart.js for radar chart (results) and bar chart (admin dashboard).

### Rationale

1. **Simple API**: `new Chart(ctx, config)` -- 3 lines to create a chart.

2. **Radar chart support**: Built-in radar/polar area chart type. Perfect for assessment score visualization.

3. **Lightweight**: ~60KB gzipped. Smaller than D3 (240KB) or Highcharts.

4. **No build step**: Load via CDN `<script src="https://cdn.jsdelivr.net/npm/chart.js">`.

5. **Responsive**: Built-in responsive mode, scales to container.

### Tradeoffs Accepted

- Limited customization compared to D3 (acceptable for our 2 chart types)
- No animation customization beyond defaults (acceptable)

---

## 12. Why AOS (Animate On Scroll) Library

### Decision

AOS library for scroll-triggered animations.

### Rationale

1. **Zero JavaScript**: Add `data-aos="fade-up"` to any element. Library handles the rest.

2. **Lightweight**: ~5KB gzipped.

3. **Performant**: Uses IntersectionObserver API (hardware-accelerated).

4. **Professional feel**: Subtle animations make the landing page feel polished without custom animation code.

### Tradeoffs Accepted

- CDN dependency (acceptable for a static site)
- Limited animation types (fade, slide, zoom -- sufficient for landing page)

---

## 13. Why No Build Step At All

### Decision

No webpack, no Vite, no Parcel, no Rollup. Files are served as-is.

### Rationale

1. **Deployment simplicity**: Push HTML/CSS/JS to GitHub Pages. Done. No `npm run build`, no output folder management.

2. **Debugging simplicity**: Source code IS the deployed code. No source maps needed.

3. **Small project**: 10 pages, 8 JS files, 2 CSS files. The complexity of a build system far exceeds the complexity of the source code.

4. **Fast iteration**: Save file -> refresh browser. No rebuild wait time.

### When to Reconsider

If the project grows to 20+ pages with shared components, consider a lightweight build tool (Vite with vanilla TypeScript).

---

## 14. Decision Log

| Decision | Date | Rationale | Review Date |
|---|---|---|---|
| Vanilla JS | 2026-07-31 | Zero build step, small page count, fast iteration | Post-v1 |
| GitHub Pages | 2026-07-31 | Zero cost, integrated with Git, HTTPS by default | If bandwidth > 100GB/month |
| Google Apps Script | 2026-07-31 | Zero infrastructure, Sheets/Gmail integration | If users > 1,000 |
| Google Sheets | 2026-07-31 | Visual access, sufficient for 100 users, free | If data > 10,000 rows |
| Tailwind CSS | 2026-07-31 | Utility-first, no build, responsive | Post-v1 |
| localStorage autosave | 2026-07-31 | Zero backend load, works offline | If cross-device needed |
| No login system | 2026-07-31 | Token-based auth sufficient for free webinar | If premium content added |
| Chart.js | 2026-07-31 | Simple API, radar chart support, lightweight | If more complex viz needed |
| No build step | 2026-07-31 | Push-and-deploy simplicity | If shared components needed |
