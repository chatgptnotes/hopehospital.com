# Disease Pages — Medical Reviewer Sign-off (one pass)

**For:** Dr. B.K. Murali (CMD) — to assign / confirm the reviewer for each page
**Prepared:** 24 June 2026
**Take this on the same trip as** the kidney-care packet (`nephrology-dialysis-packet-2026-06-16.md`) —
one sit-down, both signed.

## Why this matters (30-second version)
We have 8 patient-education "disease" pages (symptoms / causes / treatment). They're already built with
the right structure and schema — **the only thing missing is a named medical reviewer.** A real,
credentialed doctor shown as the reviewer is the single biggest trust signal for Google and AI
assistants (ChatGPT/Gemini), and it's proven to lift these pages. No content rewrite is needed —
**we just add "Medically reviewed by Dr. ___" once you tell us who.**

> Nothing is published until you sign. We will not put any doctor's name on a page without your approval.

## Please confirm the reviewer for each page
*(Suggested doctor is based on specialty — change any you like. The doctor named should be comfortable
that the page's general health information is accurate.)*

| # | Disease page | Suggested reviewer (specialty) | Confirm / change | Reviewed on |
|--:|---|---|---|---|
| 1 | **Arthritis & joint pain** | Dr. Dheeraj Gupta *(Joint Replacement)* or Dr. B.K. Murali *(Ortho)* | __________________ | ____ |
| 2 | **Back pain & slipped disc** | Dr. B.K. Murali *(Ortho/Spine)* or Dr. Ritesh Nawkhare *(Neurosurgery)* | __________________ | ____ |
| 3 | **Diabetes** | Dr. Afzal Sheikh *(General Physician)* | __________________ | ____ |
| 4 | **Gallbladder stones** | Dr. Nikhil Khobragade *(Gastroenterology)* or Dr. Vishal Nandagawali *(Laparoscopic)* | __________________ | ____ |
| 5 | **Heart attack** | Dr. Akshay Dalal *(Cardiologist)* | __________________ | ____ |
| 6 | **High blood pressure (hypertension)** | Dr. Akshay Dalal *(Cardiology)* or Dr. Milind Dekate *(Nephrology)* | __________________ | ____ |
| 7 | **Kidney stones** | Dr. Jayant Nikose *(Urology)* | __________________ | ____ |
| 8 | **Stroke (brain attack)** | Dr. Ritesh Nawkhare *(Neurosurgery)* | __________________ | ____ |

**One credential check (pages 5 & 6):** please confirm Dr. Akshay Dalal's cardiology qualification as it
should appear (e.g. MBBS, MD, DM Cardiology) — or name a different cardiologist for the heart pages.

## Sign-off
- [ ] **Reviewers assigned as above / as edited** — Dr. _______________  Date _______
- [ ] **Hold — needs discussion**

_Once signed, each page gets a visible "Medically reviewed by Dr. ___" line + matching `reviewedBy`
schema (the build is ready). Every change is then logged to the SEO change-ledger._

---
*Build status (internal): the 8 disease pages already have `MedicalWebPage` + `MedicalCondition` +
`FAQPage` schema (added 2026-06-19); `reviewedBy` + `lastReviewed` were deliberately left blank pending
this sign-off. Adding them takes each page from AEO ~7 → ~8.5.*
