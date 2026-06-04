#!/usr/bin/env node
/**
 * Morning SEO Audit — Hope Hospital (Layer 1: the deterministic engine)
 * -------------------------------------------------------------
 * Scans every public HTML page and writes a dated Markdown issue report to
 * seo-system/reports/seo-audit-<YYYY-MM-DD>.md.  Zero dependencies.
 *
 * Run:  npm run audit
 *
 * Replaces the manual page-by-page checking done by hand each day.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---- Config (edit as the site changes) -------------------------------------
const ROOT = path.join(__dirname, '..', '..');          // repo root (site)
const OUT_DIR = path.join(__dirname, '..', 'reports');  // seo-system/reports
const EXPECTED_RATING = '3.9';
const EXPECTED_REVIEWS = '415';
const STALE_MONTHS = 6;
const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESC_MAX = 160;

const SKIP_DIRS = new Set(['node_modules', 'build', '.git', 'scripts', 'seo-system', '.vercel']);
const SKIP_FILES = [
  /^seo-audit-report\.html$/i,
  /^himanshuhopehospt\..*\.html$/i,
  /^gbp-posts.*\.html$/i,
  /^review-card\.html$/i,
];

// ---- Helpers ---------------------------------------------------------------
const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];
const today = new Date();
const rel = (f) => path.relative(ROOT, f).replace(/\\/g, '/');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), out);
    } else if (e.name.toLowerCase().endsWith('.html') && !SKIP_FILES.some((re) => re.test(e.name))) {
      out.push(path.join(dir, e.name));
    }
  }
  return out;
}
const read = (f) => fs.readFileSync(f, 'utf8').replace(/^﻿/, '');
const monthsAgo = (d) => (today.getFullYear() - d.getFullYear()) * 12 + (today.getMonth() - d.getMonth());

// ---- Build the set of valid link targets (files + redirect sources) --------
const allFiles = walk(ROOT);
function collectAssets(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) collectAssets(path.join(dir, e.name), out); }
    else out.add('/' + rel(path.join(dir, e.name)).toLowerCase());
  }
  return out;
}
const assetSet = collectAssets(ROOT, new Set());

const redirectSources = new Set();
try {
  const vj = read(path.join(ROOT, 'vercel.json'));
  const re = /"source"\s*:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(vj))) redirectSources.add((m[1].replace(/\/$/, '') || '/').toLowerCase());
} catch (_) {}

function resolveLink(href) {
  let p = href.split('#')[0].split('?')[0];
  if (!p || !p.startsWith('/')) return null;
  p = p.toLowerCase();
  if (p === '/') return assetSet.has('/index.html') ? '/index.html' : null;
  if (assetSet.has(p)) return p;
  if (p.endsWith('/')) return assetSet.has(p + 'index.html') ? p + 'index.html' : null;
  if (/\.[a-z0-9]{2,5}$/.test(p)) return assetSet.has(p) ? p : null;
  if (assetSet.has(p + '.html')) return p + '.html';
  if (assetSet.has(p + '/index.html')) return p + '/index.html';
  return null;
}
function pageUrlPath(file) {
  let p = '/' + rel(file).replace(/\.html$/i, '');
  p = p.replace(/\/index$/i, '/');
  if (p !== '/' && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
}

// ---- Collect issues --------------------------------------------------------
const issues = [];
const add = (sev, check, file, detail) => issues.push({ sev, check, file: file ? rel(file) : '', detail });

// sitemap
const sitemapPaths = new Set();
try {
  const sm = read(path.join(ROOT, 'sitemap.xml'));
  const re = /<loc>\s*([^<]+?)\s*<\/loc>/g;
  let m;
  while ((m = re.exec(sm))) {
    const u = (m[1].replace(/^https?:\/\/[^/]+/i, '').replace(/\/$/, '') || '/').toLowerCase();
    sitemapPaths.add(u);
    if (!resolveLink(u)) add('red', 'Sitemap', null, `sitemap lists ${m[1]} but no matching page exists`);
  }
} catch (_) { add('yellow', 'Sitemap', null, 'sitemap.xml not found'); }

const titleMap = new Map();
let scanned = 0;

for (const file of allFiles) {
  const html = read(file);
  const r = rel(file);
  // Skip intentionally non-indexed pages (instant redirects, thank-you pages):
  // they are not meant to rank, so title/meta/schema/sitemap flags are noise.
  if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html) || /http-equiv=["']refresh["']/i.test(html)) continue;
  scanned++;
  let m;

  // 1. Review consistency
  const ratingRe = /"ratingValue"\s*:\s*"?([\d.]+)"?/g;
  while ((m = ratingRe.exec(html))) if (m[1] !== EXPECTED_RATING) add('red', 'Review', file, `ratingValue "${m[1]}" (expected ${EXPECTED_RATING})`);
  const reviewRe = /"reviewCount"\s*:\s*"?(\d+)"?/g;
  while ((m = reviewRe.exec(html))) if (m[1] !== EXPECTED_REVIEWS) add('red', 'Review', file, `reviewCount "${m[1]}" (expected ${EXPECTED_REVIEWS})`);
  const starRe = /(\d\.\d)\s*(★|\/\s*5\b|\bstars?\b)/gi;
  while ((m = starRe.exec(html))) if (m[1] !== EXPECTED_RATING) add('yellow', 'Review', file, `body text rating "${m[0].trim()}" — fix to ${EXPECTED_RATING} or remove`);

  // 2. Stale / future dates
  const dateRe = /"(dateModified|lastReviewed)"\s*:\s*"(\d{4})-(\d{2})-(\d{2})"/g;
  while ((m = dateRe.exec(html))) {
    const d = new Date(`${m[2]}-${m[3]}-${m[4]}T00:00:00`);
    if (d > today) add('red', 'Dates', file, `${m[1]} is in the future (${m[2]}-${m[3]}-${m[4]})`);
    else if (monthsAgo(d) >= STALE_MONTHS) add('yellow', 'Dates', file, `${m[1]} stale (${m[2]}-${m[3]}-${m[4]})`);
  }
  const updRe = /Updated\s+([A-Za-z]+)\s+(\d{4})/g;
  while ((m = updRe.exec(html))) {
    const mi = MONTHS.indexOf(m[1].toLowerCase());
    if (mi >= 0) {
      const d = new Date(Number(m[2]), mi, 1);
      if (d > today) add('red', 'Dates', file, `visible badge "${m[0]}" is in the future`);
      else if (monthsAgo(d) >= STALE_MONTHS) add('yellow', 'Dates', file, `visible badge "${m[0]}" is stale`);
    }
  }

  // 3. Title / meta
  const tm = html.match(/<title>([^<]*)<\/title>/i);
  if (!tm || !tm[1].trim()) add('red', 'Title/Meta', file, 'missing <title>');
  else {
    const t = tm[1].trim();
    const norm = t.toLowerCase().replace(/\s+/g, ' ');
    if (!titleMap.has(norm)) titleMap.set(norm, []);
    titleMap.get(norm).push(r);
    if (t.length < TITLE_MIN) add('yellow', 'Title/Meta', file, `title short (${t.length}): "${t}"`);
    if (t.length > TITLE_MAX) add('yellow', 'Title/Meta', file, `title long (${t.length}): "${t}"`);
  }
  const dm = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  if (!dm || !dm[1].trim()) add('red', 'Title/Meta', file, 'missing meta description');
  else if (dm[1].length > DESC_MAX) add('yellow', 'Title/Meta', file, `meta description long (${dm[1].length}, aim <=${DESC_MAX})`);

  // 5. Images missing alt
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const noAlt = imgs.filter((tag) => !/\balt\s*=/.test(tag)).length;
  if (noAlt > 0) add('yellow', 'Images', file, `${noAlt} <img> missing alt`);

  // 6. Broken internal links
  const linkRe = /href=["']([^"']+)["']/gi;
  const seenBad = new Set();
  while ((m = linkRe.exec(html))) {
    const href = m[1].trim();
    if (!href.startsWith('/')) continue;
    const norm = (href.split('#')[0].split('?')[0].replace(/\/$/, '') || '/').toLowerCase();
    if (redirectSources.has(norm) || resolveLink(href)) continue;
    if (!seenBad.has(norm)) { seenBad.add(norm); add('red', 'Links', file, `internal link target not found: ${href}`); }
  }

  // 7. Schema presence
  if (!/application\/ld\+json/i.test(html)) add('yellow', 'Schema', file, 'no JSON-LD on page');
  else if (/^(departments|services)\//i.test(r)) {
    if (!/BreadcrumbList/.test(html)) add('yellow', 'Schema', file, 'missing BreadcrumbList schema');
    if (!/MedicalWebPage|FAQPage/.test(html)) add('yellow', 'Schema', file, 'missing MedicalWebPage/FAQPage schema');
  }

  // 8. Sitemap coverage
  const up = (pageUrlPath(file).replace(/\/$/, '') || '/').toLowerCase();
  if (!sitemapPaths.has(up)) add('yellow', 'Sitemap', file, `not in sitemap.xml (${pageUrlPath(file)})`);
}

// 4. Duplicate titles
for (const [title, files] of titleMap) {
  if (files.length > 1) add('red', 'Duplicate Title', null, `${files.length} pages share title "${title}": ${files.join(', ')}`);
}

// ---- Report ----------------------------------------------------------------
const CHECKS = ['Review', 'Dates', 'Title/Meta', 'Duplicate Title', 'Images', 'Links', 'Schema', 'Sitemap'];
const ICON = { red: '🔴', yellow: '🟡' };
const pad = (n) => String(n).padStart(2, '0');
const stamp = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
const redCount = issues.filter((i) => i.sev === 'red').length;
const yellowCount = issues.filter((i) => i.sev === 'yellow').length;

let md = `# SEO Audit — Hope Hospital — ${stamp}\n\n`;
md += `Scanned **${scanned}** indexable pages. Found **${redCount}** 🔴 fix-now and **${yellowCount}** 🟡 review issues.\n\n`;
md += `| Check | 🔴 | 🟡 |\n|---|---|---|\n`;
for (const c of CHECKS) {
  const red = issues.filter((i) => i.check === c && i.sev === 'red').length;
  const yel = issues.filter((i) => i.check === c && i.sev === 'yellow').length;
  md += `| ${c} | ${red || ''} | ${yel || ''} |\n`;
}
md += `\n`;
if (!issues.length) md += `✅ No issues found.\n`;
else for (const c of CHECKS) {
  const list = issues.filter((i) => i.check === c).sort((a, b) => (a.sev === b.sev ? 0 : a.sev === 'red' ? -1 : 1));
  if (!list.length) continue;
  md += `## ${c}\n\n`;
  for (const i of list) md += `- ${ICON[i.sev]} ${i.file ? `\`${i.file}\` — ` : ''}${i.detail}\n`;
  md += `\n`;
}
md += `---\n_Generated by seo-system/scripts/seo-audit.js — run \`npm run audit\`._\n`;

fs.mkdirSync(OUT_DIR, { recursive: true });
const outPath = path.join(OUT_DIR, `seo-audit-${stamp}.md`);
fs.writeFileSync(outPath, md, 'utf8');
console.log(`SEO audit complete: ${redCount} fix-now, ${yellowCount} review.`);
console.log(`Report: ${rel(outPath)}`);
