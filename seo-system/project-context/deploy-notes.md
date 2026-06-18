# Deploy notes — how hopehospital.com goes live

Operational gotchas learned 2026-06-17. Read this before assuming a pushed fix is live.

## 1. Pushing to `main` ≠ live
The site does **not** auto-deploy on `git push`. A commit on `origin/main` is **not**
on production until a deploy is triggered separately. After pushing SEO fixes, a
**production deploy must be run** (the user handles this — don't run it yourself).

Verified 2026-06-17: all of that day's commits (rating 4.0/430, schema JSON-LD repair,
NAP fixes) sat on `main` while the live site still served the old 3.9/427 version.

## 2. Production serves from the repo ROOT (not `build/`)
Service pages were live (HTTP 200) even though `scripts/build.js` omitted the
`services/` dir from the `build/` output. That means Vercel deploys the **repo root**,
not the `build/` folder. So the `build/` step is effectively a secondary/unused path
right now — but see the landmine below.

## 3. `npm run deploy` deploys `build/`, which is a SUBSET copy
`npm run deploy` = `npm run build && vercel --prod`. `scripts/build.js` copies an
**explicit list** of dirs (`assetsDirs`), not everything. If you ever deploy via this
path, only the listed dirs ship.
- **Landmine (fixed in c293505):** `services/` was missing from `assetsDirs`, so a
  `build/`-based deploy would have 404'd all 9 service landing pages.
- **Rule:** when adding a new top-level page directory, also add it to `assetsDirs`
  in `scripts/build.js`.

## 4. How to verify what's actually live
Don't trust git state — check production directly:
```
curl -s https://www.hopehospital.com/ | grep -oE '"ratingValue":\s*"?[0-9.]+'
```
Compare the specific change (rating, a schema string, etc.) against the local file.
