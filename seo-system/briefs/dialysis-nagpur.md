# Content Brief — Dialysis in Nagpur

> Created 2026-05-27 · Status: **brief only — not built, not published.** New page → needs go-ahead to build + **doctor sign-off** before publish.

**Page type / URL:** new **service page** → `/services/dialysis-nagpur` (procedure/treatment intent — complements the dept page's "nephrologist" intent and the transplant pages; no cannibalization).

## Target query + intent
- **Primary:** "dialysis in nagpur", "dialysis centre in nagpur", "dialysis cost in nagpur"
- **Secondary:** "is dialysis free under ayushman", "hemodialysis nagpur", "best dialysis centre nagpur"
- **Intent:** commercial / high-urgency — a CKD/ESRD patient (or family) needing **regular** dialysis, comparing centre, cost, and scheme coverage. Recurring need = high lifetime value.
- **AI-question forms:** "Is dialysis free under Ayushman Bharat in Nagpur?" · "How much does one dialysis session cost in Nagpur?" · "Where can I get dialysis in Nagpur?"

## Answer-first lead (2 sentences, for AI extraction)
> Hope Hospital in Nagpur provides regular haemodialysis at its NABH-accredited Clean Dialysis Unit, with dialysis covered **free** for eligible patients under Ayushman Bharat (PM-JAY), MJPJAY, CGHS and ECHS. For private patients, a single haemodialysis session in Nagpur typically costs **₹[verify]**, and the unit operates **[hours — verify]** with [N — verify] dialysis stations.

*(Every bracketed figure = verify with doctor before publish.)*

## Canonical structure (GEO content model, adapted for a treatment)
1. **What is dialysis** — haemodialysis vs peritoneal, in plain language *(clinical — verify)*
2. **Who needs dialysis** — CKD stage 5 / ESRD, acute kidney injury; when a nephrologist recommends it *(verify)*
3. **Types offered at Hope Hospital** — HD; peritoneal/home dialysis? *(confirm what's actually offered)*
4. **Our Dialysis Unit** — NephroPlus partnership, "Clean Dialysis Unit", machine count, RO water treatment, infection-control/NABH, single-use vs reuse policy *(confirm facility facts)*
5. **What to expect in a session** — duration, frequency (e.g. 2–3×/week), what to bring
6. **Cost in Nagpur + scheme coverage** — private per-session ₹ + the free-under-scheme table (mirror the homepage scheme table) *(verify cost)*
7. **FAQ** — the AI-question forms above, answer-first *(verify each)*
8. **When to seek urgent care** — missed-session danger signs, fluid overload, access-site infection *(clinical — verify)*
9. **CTA** — book / call 0712-2980073, WhatsApp 9823555053

## Internal links
**Add links TO the new page from:**
- `departments/nephrology.html` — anchor **"dialysis in Nagpur"** (strongest cluster signal)
- `services/kidney-transplant-nagpur.html` — anchor **"dialysis"** (pre-transplant context)
- `blog/kidney-transplant-cost-nagpur-2026.html` — anchor **"dialysis cost in Nagpur"**
- `index.html` (Surgical Specialties / Health Library card) and `empanelments.html`

**Add links FROM the new page to:** `departments/nephrology`, `services/kidney-transplant-nagpur`, `blog/kidney-transplant-cost-nagpur-2026`, `empanelments`, `contact`.

## Schema to include *(run `/schema-generate` after the page is drafted)*
- `MedicalWebPage`, `BreadcrumbList`
- `MedicalProcedure` — name "Hemodialysis" / "Dialysis"
- `FAQPage` — built from the real FAQs above
- `Hospital` / `MedicalClinic` — canonical NAP from master-context
- `Physician` — **only if** a real named nephrologist is provided (none exists on site today — see below)
- **No fabricated `aggregateRating`.** No Hindi.

## Citable facts to confirm — flagged for doctor sign-off
| Fact | Why it matters | Status |
|---|---|---|
| **Named nephrologist + credentials** | No nephrologist is named anywhere on the site — major E-E-A-T gap for this cluster | ❗ needed |
| In-house "Clean Dialysis Unit" **vs** NephroPlus-operated — exact relationship | Homepage says "Clean Dialysis Unit"; nephrology page says "NephroPlus Dialysis Partner" — must reconcile to stay consistent | ❗ clarify |
| Number of dialysis stations / machines | Citable capacity fact | verify |
| HD only, or peritoneal/home dialysis too | Don't claim services not offered | verify |
| Hours / sessions per day / 24×7? | Citable, high-intent | verify |
| Per-session private cost (₹) in Nagpur | The #1 cited number for this query | verify |
| Dialysis package **free** under PM-JAY / MJPJAY / CGHS / ECHS | Core Ayushman angle — confirm package actually covers maintenance dialysis | verify |
| Water treatment / RO, reuse & infection-control policy | NABH trust signal | verify |

---

**Biggest unlock:** getting a **named nephrologist** for this page — it would lift the whole kidney cluster (and finally give "nephrologist in nagpur" a credentialed face). Worth raising with the hospital alongside the dialysis facts.
