# Local SEO / GBP Signals Audit — Hope Hospital — 2026-05-22

Local signals are the top off-page lever for "[treatment] in Nagpur" medical searches.
This audit covers the **on-site half** (NAP, schema, geo — auditable from the codebase)
and lists the **off-site half** (GBP dashboard, citations) that needs your access.

## ✅ What's already good
- **NAP address is consistent everywhere**: "Near Go-Gas Auto LPG-2, Teka Naka, Kamptee Road, Nagpur 440026" (36+9 schema occurrences, identical).
- **Rating consistent**: 3.9★ / 402 reviews sitewide (matches GBP — never inflated).
- **Strong local schema**: `Hospital`, `MedicalOrganization`, `Physician`, `MedicalClinic` types present; homepage `Hospital` has `geo`, `aggregateRating`, `openingHours` (Mo-Su 00:00-23:59), `priceRange`, `hasOfferCatalog`.
- **Excellent `areaServed`**: Nagpur, Kamptee, Wardha, Bhandara, Chandrapur, Amravati, Gondia, Vidarbha — good regional targeting.
- **GBP review link** (`g.page/r/CXNeWp4Fw2cOEBM/review`) used in 57 places.

## 🔴 Fix-now (on-site, high value)
1. **GBP not linked in structured data.** Homepage `sameAs` lists Facebook/Instagram/YouTube but **not** the Google Business Profile. Add the GBP place URL to `sameAs` (and add `hasMap`) so Google firmly connects website ↔ GBP entity. *Easy, high value.*
2. **Phone-number fragmentation (NAP risk).** THREE numbers are in active use:
   - `0712-2980073` (landline) — 407 text / 145 `tel:` — primary displayed.
   - `+91-9823555053` (mobile) — 253 text / 49 WhatsApp.
   - `9373111709` — **77 text / 52 WhatsApp links / 3 `tel:`** — the primary WhatsApp number, but it does **not** match the displayed contact number.
   NAP must match the GBP exactly. Decide ONE primary phone and align site + GBP + citations. The WhatsApp mismatch (9373111709 vs 9823555053) is the biggest inconsistency.

## 🟡 Improvements (on-site)
3. **No `hasMap`** in schema — add it pointing to the GBP place URL.
4. **Verify geo-coordinates.** Schema uses `21.1458, 79.0882` (≈ central Nagpur). Confirm this matches the actual Teka Naka / Kamptee Road pin from your GBP — wrong coordinates hurt Map Pack placement. (North-Nagpur/Kamptee Rd is ≈ 21.17–21.19 lat.)
5. **`telephone` holds two numbers** in one field ("0712-2980073 / +91-9823555053"). schema.org expects a single value — split into primary + use `contactPoint` for others.
6. **Coordinate type inconsistency** — some files use `"latitude": "21.1458"` (string), others `21.1458` (number). Harmless but tidy to unify.
7. **Inconsistent `tel:` formatting** — `gallery.html:317` uses `tel:0712-2980073`; everywhere else uses canonical `tel:+917122980073`. Also WhatsApp `tel:` appears as both `09373111709` and `+919373111709`.
8. **"Get Directions" uses a text-query maps link** (`maps.google.com/?q=Hope+Hospital+...`) — replace with the canonical GBP place link for a precise pin.
9. **`Physician` (Dr. Murali) carries `aggregateRating`** — review stars on a person entity can be flagged under Google's review-snippet policy; consider keeping `aggregateRating` only on the `Hospital` entity.

## 🔍 Needs your GBP dashboard / web access (the bigger half)
- **GBP categories** — primary category should be "Hospital" (or the most specific, e.g. "Private hospital"/"Orthopedic surgeon"); add relevant secondary categories. Wrong primary category is a top local-ranking killer.
- **Profile completeness** — hours (incl. special hours), attributes, full services list, description, opening date.
- **Photos** — count, quality, freshness (regular uploads correlate with ranking).
- **GBP Posts** — cadence (weekly offers/updates). You have the `/gbp-post` skill for this.
- **Review response rate** — reply to *all* reviews (esp. negative). You have `/gbp-post` review-reply templates.
- **Review velocity** — steady flow of new reviews matters more than total.
- **Citation NAP consistency** — Justdial, Practo, Lybrate, Sulekha, hospital directories must show the EXACT same name/address/phone. Inconsistent citations dilute local authority.
- **Local backlinks** — Nagpur news, .gov empanelment pages, local directories.

## Recommended order
1. Decide the ONE primary phone → align site + GBP + citations (NAP).
2. Add GBP to `sameAs` + add `hasMap` (on-site, quick).
3. Verify GBP primary category + geo pin (dashboard).
4. Stand up a review-reply + GBP-post cadence (`/gbp-post`).
5. Citation NAP cleanup.

_On-site items 1–9 are fixable in the codebase now; items under "Needs GBP access" require the dashboard._
