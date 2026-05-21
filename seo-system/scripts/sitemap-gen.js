#!/usr/bin/env node
/**
 * Sitemap generator — Hope Hospital SEO operating system (Phase 4)
 * -------------------------------------------------------------
 * Regenerates sitemap.xml from the actual page files, with <lastmod> taken from
 * git history (real last-modified date) and noindex/redirect pages excluded.
 *
 *   node seo-system/scripts/sitemap-gen.js --check   # dry run: show the diff only
 *   node seo-system/scripts/sitemap-gen.js           # write sitemap.xml
 *   npm run sitemap -- --check
 *
 * NOTE: sitemap.xml is a LIVE deployed file. Run --check first, review, then write.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..', '..');
const DOMAIN = 'https://www.hopehospital.com';
const CHECK = process.argv.includes('--check');

const SKIP_DIRS = new Set(['node_modules', 'build', '.git', 'scripts', 'seo-system', '.vercel']);
const SKIP_FILES = [/^seo-audit-report\.html$/i, /^himanshuhopehospt\..*\.html$/i, /^gbp-posts.*\.html$/i, /^review-card\.html$/i];

const read = (f) => fs.readFileSync(f, 'utf8').replace(/^﻿/, '');
const rel = (f) => path.relative(ROOT, f).replace(/\\/g, '/');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), out); }
    else if (e.name.toLowerCase().endsWith('.html') && !SKIP_FILES.some((re) => re.test(e.name))) out.push(path.join(dir, e.name));
  }
  return out;
}
function urlPath(file) {
  let p = '/' + rel(file).replace(/\.html$/i, '');
  p = p.replace(/\/index$/i, '/');
  if (p !== '/' && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
}
function lastmod(file) {
  try {
    const d = execSync(`git log -1 --format=%cs -- "${rel(file)}"`, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    if (d) return d;
  } catch (_) {}
  return fs.statSync(file).mtime.toISOString().slice(0, 10);
}
function priority(p) {
  if (p === '/') return '1.0';
  if (p.startsWith('/departments/') || p.startsWith('/services/')) return '0.9';
  if (p.split('/').filter(Boolean).length === 1) return '0.9';
  if (p.startsWith('/blog/') || p.startsWith('/diseases/')) return '0.7';
  return '0.8';
}
const changefreq = (p) => (p === '/' || p.startsWith('/blog')) ? 'weekly' : 'monthly';

// indexable pages only (skip noindex / redirect)
const files = walk(ROOT).filter((f) => {
  const html = read(f);
  return !(/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html) || /http-equiv=["']refresh["']/i.test(html));
});

const urls = files.map((f) => {
  const p = urlPath(f);
  return { loc: DOMAIN + p, mod: lastmod(f), pri: priority(p), cf: changefreq(p) };
}).sort((a, b) => (b.pri.localeCompare(a.pri)) || a.loc.localeCompare(b.loc));

// diff vs current sitemap
const out = path.join(ROOT, 'sitemap.xml');
const prev = fs.existsSync(out) ? read(out) : '';
const prevLocs = new Set((prev.match(/<loc>\s*([^<]+?)\s*<\/loc>/g) || []).map((s) => s.replace(/<\/?loc>/g, '').trim()));
const newLocs = new Set(urls.map((u) => u.loc));
const added = [...newLocs].filter((l) => !prevLocs.has(l));
const removed = [...prevLocs].filter((l) => !newLocs.has(l));

console.log(`Sitemap: ${urls.length} URLs (current sitemap.xml has ${prevLocs.size}).`);
if (added.length) console.log(`  + ${added.length} added:\n` + added.map((l) => '    ' + l).join('\n'));
if (removed.length) console.log(`  - ${removed.length} removed:\n` + removed.map((l) => '    ' + l).join('\n'));
if (!added.length && !removed.length) console.log('  URL set unchanged (lastmod dates will refresh to git history).');

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const u of urls) {
  xml += `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.mod}</lastmod>\n    <changefreq>${u.cf}</changefreq>\n    <priority>${u.pri}</priority>\n  </url>\n`;
}
xml += '</urlset>\n';

if (CHECK) {
  console.log('\n(--check) dry run — sitemap.xml NOT written. Re-run without --check to write.');
} else {
  fs.writeFileSync(out, xml, 'utf8');
  console.log('\nsitemap.xml written.');
}
