# READY TO SHIP — apply the moment the kidney-care packet is signed

**Source of truth:** `nephrology-dialysis-packet-2026-06-16.md` (Sections A–D).
**Rule:** Do NOT apply anything until that packet is signed. Then apply **only the items the doctor
approved**, fold in any wording edits they made, and bump the "Last reviewed" date to the sign-off date.
Run `npm run audit` (expect 0/0) + validate JSON-LD, then log each to `change-ledger.md` and commit on
user approval.

> Everything below restates facts already drafted in the signed packet — no new claims to invent at ship time.

---

## EDIT 1 — RIRS blog: reviewer swap → Dr. Nikose
**File:** `blog/rirs-surgery-nagpur-kidney-stones-2026.html` · **Gated on:** Section D = "Nikose" confirmed.

**1A — JSON-LD (BlogPosting), find → replace:**
- FIND: `"reviewedBy": {"@type": "Person", "name": "Dr. B.K. Murali", "jobTitle": "MS Ortho - Founder & Senior Surgeon", "url": "https://www.hopehospital.com/doctors/dr-bk-murali"}`
- REPL: `"reviewedBy": {"@type": "Person", "name": "Dr. Jayant Nikose", "jobTitle": "Urologist, MCh Urology", "url": "https://www.hopehospital.com/doctors/dr-jayant-nikose"}`

**1B — JSON-LD (MedicalWebPage), find → replace:**
- FIND: `"reviewedBy": {"@type": "Person", "name": "Dr. B.K. Murali", "url": "https://www.hopehospital.com/doctors/dr-bk-murali"}`
- REPL: `"reviewedBy": {"@type": "Person", "name": "Dr. Jayant Nikose", "url": "https://www.hopehospital.com/doctors/dr-jayant-nikose"}`

**1C — Visible byline, find → replace** (update the date to sign-off date):
- FIND: `Medically reviewed by <a href="/doctors/dr-bk-murali">Dr. B.K. Murali, MS Ortho</a>, Founder &amp; Senior Surgeon, Hope Hospital &middot; Last reviewed 30 May 2026`
- REPL: `Medically reviewed by <a href="/doctors/dr-jayant-nikose">Dr. Jayant Nikose, MCh Urology</a>, Urologist, Hope Hospital &middot; Last reviewed <SIGNOFF-DATE>`

*(Optional, if desired: add `"performer"` = Dr. Nikose to the RIRS `MedicalProcedure` node.)*

---

## EDIT 2 — Nephrology dept: depth content (Section B)
**File:** `departments/nephrology.html` · **Gated on:** Section B confirmed. **B2 (HD vs PD) only if Section A = "PD/CAPD Yes"** — if HD-only, omit the B2 block and reword any PD mentions.

**Insertion point:** immediately BEFORE `<div class="dept-faq"> <h2>Frequently Asked Questions</h2>`
(i.e., right after the "Kidney Conditions We Treat" list which ends `...acid-base disorders</li> </ul>`).

**Insert this HTML:**
```html
<h2>What Are the 5 Stages of Chronic Kidney Disease (CKD)?</h2>
<p>Chronic kidney disease is graded by <strong>eGFR</strong> (estimated glomerular filtration rate &mdash; a measure of how well the kidneys filter blood):</p>
<ul style="font-size:1.05rem;color:#374151;line-height:1.7;padding-left:1.5rem">
<li><strong>Stage 1 (eGFR 90+):</strong> normal filtering, but with signs of kidney damage &mdash; the focus is controlling diabetes and blood pressure.</li>
<li><strong>Stage 2 (eGFR 60&ndash;89):</strong> mild loss of function, usually with no symptoms.</li>
<li><strong>Stage 3a / 3b (eGFR 45&ndash;59 / 30&ndash;44):</strong> moderate loss &mdash; most patients are first referred to a nephrologist at this stage.</li>
<li><strong>Stage 4 (eGFR 15&ndash;29):</strong> severe loss; this is when we begin preparing for dialysis access or a transplant.</li>
<li><strong>Stage 5 (eGFR below 15):</strong> kidney failure &mdash; dialysis or a transplant is needed.</li>
</ul>

<!-- B2 — INCLUDE ONLY IF Section A = PD/CAPD Yes -->
<h2>Hemodialysis vs Peritoneal Dialysis: What's the Difference?</h2>
<ul style="font-size:1.05rem;color:#374151;line-height:1.7;padding-left:1.5rem">
<li><strong>Hemodialysis (HD):</strong> blood is filtered by a machine, typically 3 sessions a week, about 4 hours each, at our on-campus NephroPlus unit.</li>
<li><strong>Peritoneal Dialysis (PD / CAPD):</strong> uses the lining of your own abdomen to filter &mdash; it can be done at home, including overnight (automated PD).</li>
</ul>
<!-- end B2 -->

<h2>Dialysis or Kidney Transplant &mdash; Understanding Your Options</h2>
<p>Dialysis can begin immediately and needs no surgery or donor. A kidney transplant offers a fuller lifestyle and freedom from regular dialysis sessions, but it means major surgery and lifelong immunosuppressant medication. The right choice depends on your age, overall health, donor availability and personal preference &mdash; our nephrology team helps you weigh both.</p>
```

---

## EDIT 3 — Nephrology dept: 2 new FAQs (Section B4)
**File:** `departments/nephrology.html` · **Gated on:** Section B4 facts confirmed (esp. "eGFR <60 for 3 months = CKD" and "AKI often reversible").

**3A — Visible:** insert BEFORE the FAQ-section close. Anchor — the last FAQ ends:
`...kidney transplant cost guide for Nagpur</a>.</p> </div>` then the section closes `</div>`.
Insert these two `faq-item`s right after that last `</p> </div>` (and before the dept-faq closing `</div>`):
```html
<div class="faq-item"> <h3><span class="material-icons" style="font-size:1.1rem;vertical-align:middle;margin-right:.4rem;color:#D31211">help_outline</span> What is a normal creatinine and eGFR level?</h3> <p>A normal eGFR is 90 or above. An eGFR below 60 for 3 or more months indicates chronic kidney disease (CKD), and below 15 means kidney failure. Creatinine is read alongside your age, sex and body size, which is why eGFR is the more reliable measure of kidney function.</p> </div>
<div class="faq-item"> <h3><span class="material-icons" style="font-size:1.1rem;vertical-align:middle;margin-right:.4rem;color:#D31211">help_outline</span> Can chronic kidney disease be reversed?</h3> <p>Chronic kidney disease is usually not reversible, but in its early stages its progression can often be slowed or stabilised with the right treatment and lifestyle changes. Acute kidney injury &mdash; a sudden drop in kidney function &mdash; is often reversible with prompt care.</p> </div>
```

**3B — FAQPage JSON-LD:** append these 2 Question objects to the FAQPage `mainEntity` array (match the last
existing Question "How much does dialysis cost in Nagpur?" at apply time and insert after it):
```json
,{"@type":"Question","name":"What is a normal creatinine and eGFR level?","acceptedAnswer":{"@type":"Answer","text":"A normal eGFR is 90 or above. An eGFR below 60 for 3 or more months indicates chronic kidney disease (CKD), and below 15 means kidney failure. Creatinine is interpreted alongside age, sex and body size, which is why eGFR is the more reliable measure of kidney function."}},{"@type":"Question","name":"Can chronic kidney disease be reversed?","acceptedAnswer":{"@type":"Answer","text":"Chronic kidney disease is usually not reversible, but in its early stages its progression can often be slowed or stabilised with the right treatment and lifestyle changes. Acute kidney injury — a sudden drop in kidney function — is often reversible with prompt care."}}
```

---

## DEFERRED — Section C: new "Dialysis Cost in Nagpur" page
**Cannot pre-build** — needs the cash/private dialysis rate (Section C, Q1) which the doctor must supply.
Once that figure is signed off, build a new blog page: BlogPosting + MedicalWebPage + FAQPage, reviewedBy
Dr. Dekate, with the answer-first lead already drafted in the packet. Add to `sitemap.xml` + a blog card.

---

## Apply checklist (post-sign-off)
1. Read the signed packet; apply ONLY approved items; fold in any doctor wording edits.
2. **Section A gate:** if HD-only → drop EDIT 2's B2 block + reword any PD mentions sitewide.
3. Bump `dateModified` / `lastReviewed` on both pages → the sign-off date.
4. `npm run audit` → expect 0/0; validate JSON-LD on both pages (nephrology should go 5/5 → 5/5 with +2 FAQs; RIRS 4/4).
5. Log each change to `change-ledger.md` (hypothesis + re-check date); commit + push on user OK.
6. Re-run `/geo-audit` on nephrology → expect GEO 8.0 → ~9 (depth + FAQs); RIRS → ~9.5 (topical reviewer).
