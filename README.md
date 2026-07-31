# SGBVA 3-Day Webinar Landing Page

A professional webinar landing page with automated registration, daily bonus unlock system, multi-day assessment engine, scoring & recommendation system, and email automation.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, Tailwind CSS (CDN), Vanilla JavaScript |
| Backend | Google Apps Script (V8 runtime) |
| Database | Google Sheets |
| Email | GmailApp |
| Hosting | GitHub Pages |
| Charts | Chart.js |

## Project Status

| Phase | Status |
|---|---|
| Documentation | Completed |
| Project Setup | In Progress |
| Landing Page | Not Started |
| Registration | Not Started |
| Assessment Engine | Not Started |
| Google Apps Script | Not Started |
| Email Automation | Not Started |
| Recommendation Engine | Not Started |
| Admin Dashboard | Not Started |
| Testing & Deployment | Not Started |

## Documentation

All project documentation lives in the `docs/` folder.

| Document | Purpose |
|---|---|
| [PROJECT_FLOW.md](docs/PROJECT_FLOW.md) | Original system flow (V1) |
| [PROJECT_FLOW_REVIEW.md](docs/PROJECT_FLOW_REVIEW.md) | Critical review of V1 (115 issues identified) |
| [PROJECT_FLOW_V2.md](docs/PROJECT_FLOW_V2.md) | **Source of Truth** -- Final revised flow |
| [PROJECT_SETUP.md](PROJECT_SETUP.md) | Development environment setup |
| [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) | Sprint-based development plan |
| [TECHNICAL_DECISIONS.md](TECHNICAL_DECISIONS.md) | Architecture and technology rationale |
| [GIT_WORKFLOW.md](GIT_WORKFLOW.md) | Git branching and commit conventions |

## Quick Start

```bash
# Clone repository
git clone https://github.com/your-username/sgbva-webinar.git
cd sgbva-webinar

# Open in browser
open index.html

# Or serve locally
npx serve .
```

## Project Structure

```
sgbva-webinar/
├── index.html                 # Landing page
├── register.html              # Registration success
├── assessment.html            # Assessment (dynamic: ?day=1,2,3)
├── result.html                # Assessment results
├── bonus.html                 # Bonus download hub
├── status.html                # Check registration status
├── faq.html                   # FAQ page
├── privacy.html               # Privacy policy
├── post-webinar.html          # Post-webinar summary
├── admin.html                 # Admin dashboard
├── css/
│   ├── styles.css             # Main + component styles
│   └── responsive.css         # Responsive breakpoints
├── js/
│   ├── app.js                 # Main application logic
│   ├── countdown.js           # Countdown timer
│   ├── registration.js        # Registration form handler
│   ├── assessment.js          # Assessment engine + autosave
│   ├── charts.js              # Chart.js configurations
│   ├── admin.js               # Admin dashboard
│   ├── api.js                 # API client (Apps Script)
│   └── utils.js               # Shared utilities
├── assets/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-bg.jpg
│   │   └── speaker/
│   └── pdf/
│       ├── day1/
│       ├── day2/
│       └── day3/
├── apps-script/
│   ├── Code.gs                # Main entry + routing
│   ├── Registration.gs        # Registration handler
│   ├── Assessment.gs          # Assessment + scoring
│   ├── Bonus.gs               # Bonus status + download
│   ├── Email.gs               # Email automation
│   ├── Admin.gs               # Admin dashboard data
│   ├── Utils.gs               # Shared utilities
│   └── Config.gs              # Configuration constants
├── docs/
│   ├── PROJECT_FLOW.md
│   ├── PROJECT_FLOW_REVIEW.md
│   └── PROJECT_FLOW_V2.md
├── README.md
├── PROJECT_SETUP.md
├── IMPLEMENTATION_PLAN.md
├── TECHNICAL_DECISIONS.md
├── GIT_WORKFLOW.md
└── .gitignore
```

## License

Private project -- SGBVA.

## Contact

For questions about this project, reach out via WhatsApp or email.
