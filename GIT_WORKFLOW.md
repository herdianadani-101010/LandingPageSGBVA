# Git Workflow

Git branching strategy, commit conventions, and release process for the SGBVA Webinar project.

---

## Branch Strategy

### Branch Types

| Branch | Purpose | Lifetime |
|---|---|---|
| `main` | Production-ready code. Always deployable. | Permanent |
| `feature/*` | New features or enhancements | Temporary (deleted after merge) |
| `fix/*` | Bug fixes | Temporary (deleted after merge) |
| `docs/*` | Documentation changes | Temporary (deleted after merge) |

### Branch Naming Convention

```
feature/{short-description}
fix/{short-description}
docs/{short-description}
```

**Rules**:
- Lowercase only
- Hyphens as separators (no underscores, no spaces)
- Maximum 50 characters
- No ticket numbers (no Jira/Linear integration for this project)

**Examples**:

```
feature/landing-page-hero
feature/registration-form
feature/assessment-engine
feature/countdown-timer
feature/admin-dashboard
fix/countdown-wrong-timezone
fix/email-not-sending
docs/update-project-flow
```

### Flow

```
main
  |
  +-- feature/landing-page-hero
  |     |
  |     +-- (work, commit, push)
  |     |
  |     +-- Create PR -> Review -> Merge to main
  |     |
  |     +-- Delete branch
  |
  +-- feature/registration-form
        |
        +-- (work, commit, push)
        |
        +-- Create PR -> Review -> Merge to main
        |
        +-- Delete branch
```

---

## Commit Convention

### Format

```
<type>: <description>
```

### Types

| Type | When to Use | Example |
|---|---|---|
| `feat` | New feature | `feat: add hero section with countdown` |
| `fix` | Bug fix | `fix: correct timezone calculation for WIB` |
| `docs` | Documentation only | `docs: update IMPLEMENTATION_PLAN.md` |
| `style` | CSS/visual changes only | `style: adjust button hover states` |
| `refactor` | Code restructure (no behavior change) | `refactor: extract API client to api.js` |
| `test` | Adding or updating tests | `test: add registration validation tests` |
| `chore` | Build, config, or tooling | `chore: update .gitignore` |
| `perf` | Performance improvement | `perf: lazy load images below fold` |
| `revert` | Revert a previous commit | `revert: undo assessment scoring change` |

### Rules

1. **Lowercase type**: Always lowercase (`feat` not `Feat`)
2. **Imperative mood**: "add feature" not "added feature" or "adds feature"
3. **No period at end**: `feat: add hero` not `feat: add hero.`
4. **50 characters max** for subject line
5. **No reference to files**: Don't say "update index.html" -- say what the change does

### Examples

```
feat: add registration form with validation
feat: implement assessment autosave to localStorage
feat: build admin dashboard with 6 widgets
fix: correct bonus unlock time from 23:00 to 23:59
fix: prevent duplicate assessment submissions
docs: add DATABASE_SCHEMA.md
style: make sticky CTA visible only on mobile
refactor: consolidate assessment tabs into single tab
chore: add .gitignore for config.js
```

### Multi-line Commits

For complex changes, add a body:

```
feat: implement assessment scoring engine

- Add calculateScore() function for Day 1 (5 categories x 20 points)
- Add calculateScore() function for Day 2-3 (4 categories x 25 points)
- Implement total score calculation: average of all days
- Add level classification: Beginner (<50), Intermediate (50-74), Advanced (75+)
```

---

## Pull Request Process

### Creating a PR

1. Push feature branch to GitHub
2. Create PR from feature branch to `main`
3. PR title follows commit convention: `feat: add hero section with countdown`
4. PR description includes:
   - What was changed
   - Why it was changed
   - How to test it
   - Screenshot (for UI changes)

### PR Template

```markdown
## What
Brief description of changes.

## Why
Reason for the change.

## How to Test
1. Step 1
2. Step 2
3. Step 3

## Screenshots
(if applicable)

## Checklist
- [ ] Works on mobile (375px)
- [ ] Works on desktop (1920px)
- [ ] No JavaScript errors in console
- [ ] All existing features still work
```

### Review & Merge

1. Self-review: Check all changes in GitHub diff view
2. Test locally: Open changed files in browser, verify functionality
3. Merge: **Squash and merge** (clean history)
4. Delete branch after merge

---

## Versioning

### Format

```
v{major}.{minor}.{patch}
```

### Rules

| Change Type | Version Bump | Example |
|---|---|---|
| New sprint complete | Minor bump | v1.0 -> v1.1 |
| Bug fix after release | Patch bump | v1.1 -> v1.1.1 |
| Major redesign | Major bump | v1.x -> v2.0 |

### Initial Version

Start at `v0.1.0` (pre-release, during development).

### Release Tags

Tag each sprint completion:

```bash
git tag -a v0.1.0 -m "Sprint 0: Project setup"
git tag -a v0.2.0 -m "Sprint 1: Landing page complete"
git tag -a v0.3.0 -m "Sprint 2: Registration system"
git tag -a v0.4.0 -m "Sprint 3: Assessment engine"
git tag -a v0.5.0 -m "Sprint 4: Google Apps Script backend"
git tag -a v0.6.0 -m "Sprint 5: Email automation"
git tag -a v0.7.0 -m "Sprint 6: Results, recommendation, bonus"
git tag -a v0.8.0 -m "Sprint 7: Admin dashboard"
git tag -a v1.0.0 -m "Sprint 8: Testing complete, production release"
```

---

## Gitignore Rules

### Files to NEVER Commit

```
# Configuration with secrets
js/config.js

# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/settings.json
.idea/

# Dependencies (none in this project, but safety net)
node_modules/

# Build output (none in this project, but safety net)
dist/
build/
```

### Files to ALWAYS Commit

```
# All HTML files
# All CSS files
# All JS files EXCEPT config.js
# All documentation
# apps-script/ folder (deployed separately)
# assets/ folder
# .gitignore
# README.md
```

---

## Daily Workflow

### Before Starting Work

```bash
# Pull latest changes
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name
```

### During Work

```bash
# Commit frequently (every 30-60 minutes or per logical unit)
git add .
git commit -m "feat: add progress bar to assessment form"

# Push to GitHub (backup)
git push origin feature/your-feature-name
```

### After Completing Feature

```bash
# Final commit
git add .
git commit -m "feat: complete assessment form with navigation"

# Push
git push origin feature/your-feature-name

# Create PR on GitHub (via web interface)
# Review, test, merge
# Delete branch
```

### End of Day

```bash
# Always end day on main with clean state
git checkout main
git pull origin main

# Verify no uncommitted changes
git status
```

---

## Tagging Strategy

### Sprint Tags

| Tag | Milestone |
|---|---|
| `v0.1.0` | Project setup complete |
| `v0.2.0` | Landing page complete |
| `v0.3.0` | Registration system complete |
| `v0.4.0` | Assessment engine complete |
| `v0.5.0` | Backend complete |
| `v0.6.0` | Email automation complete |
| `v0.7.0` | Results & bonus complete |
| `v0.8.0` | Admin dashboard complete |
| `v1.0.0` | Production release |

### Creating Tags

```bash
# Annotated tag (preferred -- includes message)
git tag -a v0.2.0 -m "Sprint 1: Landing page complete"

# Push tags
git push origin v0.2.0
```

---

## Emergency Fixes

If a critical bug is found in production (`main`):

```bash
# Create hotfix branch from main
git checkout main
git checkout -b fix/critical-bug-description

# Make the fix
# ...

# Commit
git commit -m "fix: correct critical timezone calculation"

# Push and create PR
git push origin fix/critical-bug-description

# Merge immediately (skip full review for critical fixes)
# Tag if needed
git tag -a v1.0.1 -m "Hotfix: correct timezone calculation"
git push origin v1.0.1
```

---

## Commit History Examples

A clean commit history for this project would look like:

```
v1.0.0  (tag: Sprint 8 complete)
  |
  fix: correct email subject line formatting
  feat: implement post-webinar summary page
  feat: add archive state for Day 3 + 10
  test: complete end-to-end flow testing
  |
v0.8.0  (tag: Sprint 7 complete)
  |
  feat: build admin dashboard with auto-refresh
  feat: add score distribution bar chart
  feat: implement conversion funnel widget
  |
v0.7.0  (tag: Sprint 6 complete)
  |
  feat: build result page with radar chart
  feat: implement recommendation engine
  feat: build bonus download system
  feat: add bonus ended state UI
  |
  ... (earlier sprints)
  |
v0.1.0  (tag: Sprint 0 complete)
  |
  chore: initialize project structure
  docs: add all project documentation
```
