# Automation (Phase 4)

Make the SEO system run with less manual effort. Everything here is opt-in — the
scheduling step is environment-specific, so you trigger it, not the system.

## 1. Morning run (audit + GSC in one go)
```
npm run seo:morning
```
Runs `npm run audit` then `npm run gsc`. Reports land in `seo-system/reports/`.

## 2. Schedule it (pick one)

**Claude routine (recommended if you live in Claude Code):**
Use the `/schedule` skill to run `/daily-seo` every morning — the ranked task list
is then waiting for you.

**Windows Task Scheduler (runs the scripts even when Claude is closed):**
```powershell
schtasks /Create /TN "HopeHospital SEO morning" /SC DAILY /ST 08:00 ^
  /TR "cmd /c cd /d C:\Users\hope4\Documents\hopehospital\hopehospital.com && npm run seo:morning"
```
Then each morning the fresh reports are already in `seo-system/reports/`.

## 3. Sitemap (keep it auto-generated, never stale)
```
npm run sitemap -- --check   # preview the diff (does NOT write)
npm run sitemap              # write sitemap.xml from the real page files
```
`<lastmod>` comes from git history. sitemap.xml is a **live deployed file** — run
`--check` first, review, then write, commit, and push.

## 4. Lighthouse (optional, no permanent dependency)
For performance/accessibility/SEO scores on a page, run on demand:
```
npx lighthouse https://www.hopehospital.com --only-categories=seo,accessibility,performance --view
```
A full Playwright crawl is intentionally **not** installed yet — added only if/when
rendered-page checks or screenshots become worth the dependency weight.
