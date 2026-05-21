#!/usr/bin/env node
/**
 * GEO fact extractor — Hope Hospital SEO operating system
 * -------------------------------------------------------------
 * Pulls the deterministic, measurable signals that decide whether a page is
 * ready to be CITED by AI search engines (ChatGPT/Gemini/Perplexity), not just
 * ranked by Google. The /geo-audit command turns these facts into judgment.
 *
 * Usage:  node seo-system/scripts/geo-check.js <page>      (path relative to repo root)
 *         npm run geo -- departments/oncology.html
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const arg = process.argv[2];
if (!arg) {
  console.error('Usage: node seo-system/scripts/geo-check.js <page.html>  (relative to repo root)');
  process.exit(1);
}
const file = path.isAbsolute(arg) ? arg : path.join(ROOT, arg);
if (!fs.existsSync(file)) { console.error(`Not found: ${arg}`); process.exit(1); }

const html = fs.readFileSync(file, 'utf8').replace(/^﻿/, '');
const rel = path.relative(ROOT, file).replace(/\\/g, '/');
const count = (re) => (html.match(re) || []).length;

// JSON-LD @type values present
const types = new Set();
let m;
const tre = /"@type"\s*:\s*"([^"]+)"/g;
while ((m = tre.exec(html))) types.add(m[1]);
const GEO_TYPES = ['MedicalWebPage', 'FAQPage', 'Physician', 'MedicalProcedure', 'MedicalCondition', 'Hospital', 'MedicalClinic', 'MedicalOrganization', 'BreadcrumbList'];
const present = GEO_TYPES.filter((t) => types.has(t));

// FAQ depth
const faqQ = count(/"@type"\s*:\s*"Question"/g);

// Question-style headings (AI engines extract Q&A)
const headings = [];
const hre = /<h([23])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
while ((m = hre.exec(html))) headings.push(m[2].replace(/<[^>]+>/g, '').replace(/&[a-z]+;/gi, ' ').trim());
const qWord = /^(what|who|how|why|when|is|are|can|does|do|where|should|which)\b/i;
const qHeadings = headings.filter((h) => qWord.test(h) || h.endsWith('?'));

// Citable structure
const lists = count(/<(ul|ol)\b/gi);
const tables = count(/<table\b/gi);

// Entity clarity
const entities = {
  Nagpur: count(/\bNagpur\b/gi),
  NABH: count(/\bNABH\b/g),
  Ayushman: count(/\bAyushman\b/gi),
  'Hope Hospital': count(/\bHope Hospital\b/gi),
};

// Author / medical-review authority (EEAT)
const reviewSignal = /reviewed by/i.test(html) || /"reviewedBy"/.test(html) || /lastReviewed/.test(html);

// Rough visible word count
const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
const words = (text.match(/\b\w+\b/g) || []).length;

// ---- Output ----------------------------------------------------------------
console.log(`GEO fact sheet — ${rel}`);
console.log(`- JSON-LD @types: ${[...types].join(', ') || 'NONE'}`);
console.log(`- GEO-relevant types present: ${present.join(', ') || 'none'}`);
console.log(`- FAQ questions (schema): ${faqQ}`);
console.log(`- Question-style headings: ${qHeadings.length}/${headings.length}${qHeadings.length ? ` (e.g. "${qHeadings[0]}")` : ''}`);
console.log(`- Lists: ${lists} · Tables: ${tables}`);
console.log(`- Entity mentions: ${Object.entries(entities).map(([k, v]) => `${k}=${v}`).join(', ')}`);
console.log(`- Author / medical-review signal: ${reviewSignal ? 'yes' : 'NO'}`);
console.log(`- Visible word count: ~${words}`);
