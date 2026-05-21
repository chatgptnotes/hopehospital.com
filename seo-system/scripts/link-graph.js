#!/usr/bin/env node
/**
 * Internal link graph — Hope Hospital SEO operating system (Phase 5)
 * -------------------------------------------------------------
 * Maps every internal link to find under-linked ("orphan") pages and, for a
 * given page, which high-value pages it does NOT yet link to. These are facts
 * the /internal-link command turns into concrete anchor suggestions.
 *
 *   node seo-system/scripts/link-graph.js                 # site-wide orphan report
 *   node seo-system/scripts/link-graph.js departments/nephrology.html   # one page
 *   npm run links -- departments/nephrology.html
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const ORPHAN_MAX = 2; // pages with <= this many inbound internal links are under-linked

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

const files = walk(ROOT);
const relSet = new Set(files.map((f) => '/' + rel(f).toLowerCase()));

// resolve an internal href to a page file (clean URLs), or null
function resolveLink(href) {
  let p = href.split('#')[0].split('?')[0];
  if (!p || !p.startsWith('/')) return null;
  p = p.toLowerCase();
  if (p === '/') return relSet.has('/index.html') ? '/index.html' : null;
  if (relSet.has(p)) return p.endsWith('.html') ? p : null;
  if (p.endsWith('/')) return relSet.has(p + 'index.html') ? p + 'index.html' : null;
  if (relSet.has(p + '.html')) return p + '.html';
  if (relSet.has(p + '/index.html')) return p + '/index.html';
  return null;
}

// build outbound + inbound maps (keyed by '/path.html' lowercase)
const outbound = new Map();
const inbound = new Map();
for (const f of files) { outbound.set('/' + rel(f).toLowerCase(), new Set()); inbound.set('/' + rel(f).toLowerCase(), new Set()); }

for (const f of files) {
  const src = '/' + rel(f).toLowerCase();
  const html = read(f);
  let m; const re = /href=["']([^"']+)["']/gi;
  while ((m = re.exec(html))) {
    const tgt = resolveLink(m[1]);
    if (tgt && tgt !== src) { outbound.get(src).add(tgt); inbound.get(tgt).add(src); }
  }
}

const arg = process.argv[2];

if (!arg) {
  // site-wide: under-linked pages first
  const ranked = [...inbound.entries()].map(([p, s]) => ({ p, in: s.size, out: outbound.get(p).size }))
    .sort((a, b) => a.in - b.in);
  console.log(`Internal link graph — ${files.length} pages\n`);
  console.log(`Under-linked pages (<= ${ORPHAN_MAX} inbound internal links) — these need more internal links:`);
  const orphans = ranked.filter((r) => r.in <= ORPHAN_MAX);
  if (!orphans.length) console.log('  (none — every page has good inbound linking)');
  for (const r of orphans) console.log(`  ${String(r.in).padStart(2)} in / ${String(r.out).padStart(2)} out  ${r.p}`);
  console.log(`\nMost-linked pages (top 5):`);
  for (const r of [...ranked].sort((a, b) => b.in - a.in).slice(0, 5)) console.log(`  ${String(r.in).padStart(3)} in  ${r.p}`);
} else {
  const tgt = resolveLink(arg.startsWith('/') ? arg : '/' + arg.replace(/\\/g, '/').toLowerCase()) || ('/' + arg.replace(/\\/g, '/').toLowerCase());
  if (!outbound.has(tgt)) { console.error(`Page not found in graph: ${arg}`); process.exit(1); }
  const out = [...outbound.get(tgt)].sort();
  const inn = [...inbound.get(tgt)].sort();
  console.log(`Link profile — ${tgt}\n`);
  console.log(`Inbound (${inn.length}) — pages linking TO this:`);
  inn.forEach((p) => console.log(`  ${p}`));
  console.log(`\nOutbound (${out.length}) — internal links FROM this page:`);
  out.forEach((p) => console.log(`  ${p}`));
  // candidates: high-value pages (departments/services) not yet linked from here
  const highValue = [...relSet].filter((p) => (p.startsWith('/departments/') || p.startsWith('/services/')) && p !== tgt);
  const missing = highValue.filter((p) => !outbound.get(tgt).has(p));
  console.log(`\nHigh-value pages NOT linked from here (${missing.length}) — internal-link candidates:`);
  missing.forEach((p) => console.log(`  ${p}`));
}
