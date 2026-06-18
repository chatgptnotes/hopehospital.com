#!/usr/bin/env node
/**
 * AEO Scorecard — Hope Hospital (Answer-Engine Optimization, site-wide)
 * -------------------------------------------------------------------
 * Scores EVERY indexable page for how citable it is by AI answer engines
 * (ChatGPT, Gemini, Perplexity, Google AI Overviews) and writes a dated
 * report to seo-system/reports/aeo-scorecard-<YYYY-MM-DD>.md.
 *
 * Complements geo-check.js (deep single-page fact sheet) with the all-pages view.
 * Run:  npm run aeo
 *
 * Score /10 (transparent weights):
 *   +2.0  MedicalWebPage schema           +1.0  question-style headings >= 30%
 *   +2.0  FAQPage (or >= 3 FAQ questions) +1.0  entity clarity (>=3 of Nagpur/NABH/Ayushman/Hope Hospital)
 *   +1.5  named author / medical reviewer +0.5  Hospital or MedicalClinic schema
 *   +1.0  MedicalProcedure or Condition   +0.5  BreadcrumbList schema
 *                                         +0.5  >= 600 visible words
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const OUT_DIR = path.join(__dirname, '..', 'reports');
const SKIP_DIRS = new Set(['node_modules', 'build', '.git', 'scripts', 'seo-system', '.vercel', 'images', 'assets', 'css', 'js']);
const SKIP_FILES = [/^seo-audit-report\.html$/i, /^himanshuhopehospt\..*\.html$/i, /^gbp-post.*\.html$/i, /^review-card\.html$/i];
const QWORD = /^(what|why|how|is|are|when|where|which|can|do|does|who|should)\b/i;

const rel = (f) => path.relative(ROOT, f).replace(/\\/g, '/');
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), out); }
    else if (e.name.toLowerCase().endsWith('.html') && !SKIP_FILES.some((re) => re.test(e.name))) out.push(path.join(dir, e.name));
  }
  return out;
}
const typeOf = (r) =>
  /^blog\//.test(r) ? 'blog' :
  /^departments\/[a-z]/.test(r) ? 'department' :
  /^services\//.test(r) ? 'service' :
  /^diseases\//.test(r) ? 'disease' :
  /^doctors\/dr-/.test(r) ? 'doctor' : 'utility';

function score(html) {
  const types = new Set([...html.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map((m) => m[1]));
  const faqQ = (html.match(/"@type"\s*:\s*"Question"/g) || []).length;
  const heads = [...html.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, '').replace(/&[a-z]+;/gi, ' ').trim()).filter(Boolean);
  const qh = heads.filter((h) => QWORD.test(h) || h.endsWith('?')).length;
  const qhRatio = heads.length ? qh / heads.length : 0;
  const author = /reviewedBy|medically reviewed|"@type"\s*:\s*"Physician"/i.test(html);
  const ent = ['Nagpur', 'NABH', 'Ayushman', 'Hope Hospital'].filter((e) => new RegExp(e, 'i').test(html)).length;
  const words = (html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').match(/\b[a-zA-Z]{2,}\b/g) || []).length;

  let s = 0;
  const has = (t) => types.has(t);
  if (has('MedicalWebPage')) s += 2;
  if (has('FAQPage') || faqQ >= 3) s += 2;
  if (author) s += 1.5;
  if (has('MedicalProcedure') || has('MedicalCondition')) s += 1;
  if (qhRatio >= 0.30) s += 1;
  if (ent >= 3) s += 1;
  if (has('Hospital') || has('MedicalClinic')) s += 0.5;
  if (has('BreadcrumbList')) s += 0.5;
  if (words >= 600) s += 0.5;
  s = Math.min(10, Math.round(s * 10) / 10);

  const gaps = [];
  if (!has('MedicalWebPage')) gaps.push('no MedicalWebPage');
  if (!(has('FAQPage') || faqQ >= 3)) gaps.push('no FAQ schema');
  if (!author) gaps.push('no author/reviewer');
  if (!(has('MedicalProcedure') || has('MedicalCondition'))) gaps.push('no Procedure/Condition');
  if (qhRatio < 0.30) gaps.push(`few Q-headings (${qh}/${heads.length})`);
  if (ent < 3) gaps.push('weak entity clarity');
  return { s, gaps, words };
}

// ---- scan ----
const rows = walk(ROOT)
  .map((f) => {
    const html = fs.readFileSync(f, 'utf8').replace(/^﻿/, '');
    if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html) || /http-equiv=["']refresh["']/i.test(html)) return null;
    const r = rel(f);
    return { r, type: typeOf(r), ...score(html) };
  })
  .filter(Boolean)
  .sort((a, b) => a.type.localeCompare(b.type) || b.s - a.s);

const tier = (s) => (s >= 8 ? '🟢' : s >= 5 ? '🟡' : '🔴');
const avg = (a) => (a.reduce((x, y) => x + y, 0) / a.length).toFixed(2);
const byType = {};
for (const p of rows) (byType[p.type] = byType[p.type] || []).push(p.s);

const pad = (n) => String(n).padStart(2, '0');
const d = new Date();
const stamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const strong = rows.filter((p) => p.s >= 8).length;
const medium = rows.filter((p) => p.s >= 5 && p.s < 8).length;
const weak = rows.filter((p) => p.s < 5).length;

let md = `# AEO Scorecard — Hope Hospital — ${stamp}\n\n`;
md += `Site-wide AEO readiness: **${avg(rows.map((p) => p.s))}/10** across **${rows.length}** indexable pages.\n`;
md += `**🟢 ${strong} Strong (≥8) · 🟡 ${medium} Medium (5–8) · 🔴 ${weak} Weak (<8)**\n\n`;
md += `## By section\n\n| Section | Pages | Avg |\n|---|--:|--:|\n`;
for (const t of Object.keys(byType).sort()) md += `| ${t} | ${byType[t].length} | ${avg(byType[t])} |\n`;
md += `\n## Per page\n`;
let cur = '';
for (const p of rows) {
  if (p.type !== cur) { cur = p.type; md += `\n### ${cur}\n`; }
  md += `- ${tier(p.s)} **${p.s}** \`${p.r}\`${p.gaps.length ? ' — ' + p.gaps.join(', ') : ' — full'}\n`;
}
md += `\n---\n_Generated by seo-system/scripts/aeo-scorecard.js — run \`npm run aeo\`. Deep single-page audit: \`/geo-audit <page>\`. Fix: \`/schema-generate <page>\`._\n`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, `aeo-scorecard-${stamp}.md`), md, 'utf8');
console.log(`AEO scorecard: site avg ${avg(rows.map((p) => p.s))}/10 · ${strong} strong / ${medium} medium / ${weak} weak (${rows.length} pages).`);
for (const t of Object.keys(byType).sort()) console.log(`  ${t}: ${avg(byType[t])} (n=${byType[t].length})`);
console.log(`Report: ${rel(path.join(OUT_DIR, `aeo-scorecard-${stamp}.md`))}`);
