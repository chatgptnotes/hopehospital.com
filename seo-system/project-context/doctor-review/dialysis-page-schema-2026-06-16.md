# Dialysis Cost Page — Prepared JSON-LD Schema

**Prepared:** 16 June 2026 · **Status:** GENERATE-ONLY — for a page **not yet built or signed off**.
**Companion to:** `nephrology-dialysis-packet-2026-06-16.md` (Section C).
**Do not paste until:** (1) the page `blog/dialysis-cost-nagpur-ayushman-2026.html` is built, AND (2) the medical packet is signed.

Conventions mirror the confirmed-winning cost blogs (`kidney-transplant-cost`, `rirs-surgery`): `BlogPosting` + `MedicalWebPage` (with `reviewedBy`) + `Hospital` + `FAQPage` + `BreadcrumbList`; costs live in on-page tables, **never** in schema; **no `aggregateRating`** (blog hard constraint).

---

## 1. BreadcrumbList
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hopehospital.com/"},
    {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hopehospital.com/blog"},
    {"@type": "ListItem", "position": 3, "name": "Dialysis Cost in Nagpur — Covered Under Ayushman Bharat", "item": "https://www.hopehospital.com/blog/dialysis-cost-nagpur-ayushman-2026"}
  ]
}
</script>
```

## 2. BlogPosting
> ⚠️ Set `datePublished` to the real publish date.
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Dialysis Cost in Nagpur: Covered Under Ayushman Bharat (2026)",
  "image": "https://www.hopehospital.com/images/hope-hospital-og1.png",
  "datePublished": "2026-06-16",
  "dateModified": "2026-06-16",
  "author": {"@type": "Organization", "name": "Hope Hospital Nagpur", "url": "https://www.hopehospital.com"},
  "publisher": {
    "@type": "Organization",
    "name": "Hope Hospital",
    "logo": {"@type": "ImageObject", "url": "https://www.hopehospital.com/images/new_hd_logo-removebg-preview.webp"}
  },
  "mainEntityOfPage": "https://www.hopehospital.com/blog/dialysis-cost-nagpur-ayushman-2026"
}
</script>
```

## 3. MedicalWebPage (named reviewer = Dr. Milind Dekate)
> ⚠️ Add `{"@type": "MedicalProcedure", "name": "Peritoneal Dialysis"}` to `about` ONLY if packet Section A confirms PD is offered on-site.
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Dialysis Cost in Nagpur — Covered Under Ayushman Bharat (2026)",
  "url": "https://www.hopehospital.com/blog/dialysis-cost-nagpur-ayushman-2026",
  "specialty": "https://schema.org/Renal",
  "lastReviewed": "2026-06-16",
  "reviewedBy": {
    "@type": "Physician",
    "name": "Dr. Milind Dekate",
    "description": "Nephrologist & Kidney Specialist at Hope Hospital, Nagpur, with 10+ years of experience (MBBS, MD (Nephrology)).",
    "medicalSpecialty": "https://schema.org/Renal",
    "url": "https://www.hopehospital.com/doctors/dr-milind-dekate"
  },
  "about": [
    {"@type": "MedicalProcedure", "name": "Hemodialysis"},
    {"@type": "MedicalCondition", "name": "Chronic Kidney Disease (CKD) and End-Stage Renal Disease"}
  ]
}
</script>
```

## 4. Hospital (NAP from master-context — no aggregateRating on a blog)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Hospital",
  "name": "Hope Hospital - Best Hospital in Nagpur",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Near Go-Gas Auto LPG-2, Teka Naka, Kamptee Road",
    "addressLocality": "Nagpur",
    "addressRegion": "Maharashtra",
    "postalCode": "440026",
    "addressCountry": "IN"
  },
  "telephone": "0712-2980073",
  "medicalSpecialty": ["https://schema.org/Renal"],
  "url": "https://www.hopehospital.com/departments/nephrology"
}
</script>
```

## 5. FAQPage — ⚠️ DRAFT answers; every claim needs doctor sign-off (packet Section A/C)
> Confirm before publish: the "no waiting period" claim (Q3) + the cashless-coverage wording (Q1, Q2).
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is dialysis free under Ayushman Bharat in Nagpur?",
      "acceptedAnswer": {"@type": "Answer", "text": "Dialysis is covered cashless for eligible Ayushman Bharat (PM-JAY) and MJPJAY cardholders at empaneled hospitals in Nagpur, including Hope Hospital. Eligible patients receive hemodialysis at no out-of-pocket cost; the hospital's PMJAY desk handles eligibility verification and pre-authorization."}
    },
    {
      "@type": "Question",
      "name": "How much does dialysis cost in Nagpur?",
      "acceptedAnswer": {"@type": "Answer", "text": "Dialysis cost in Nagpur varies by type and centre. At Hope Hospital's NephroPlus unit, hemodialysis is offered at standardized, transparent rates, and eligible patients pay nothing under Ayushman Bharat (PM-JAY), MJPJAY, CGHS, and ECHS."}
    },
    {
      "@type": "Question",
      "name": "Is there a waiting period for dialysis under PMJAY?",
      "acceptedAnswer": {"@type": "Answer", "text": "Chronic kidney disease and end-stage renal disease are covered from day one under PM-JAY for eligible cardholders, with no waiting period for chronic dialysis."}
    }
  ]
}
</script>
```

---

### Notes
- **No cost figures in schema** — costs belong in an on-page `<table>`; the cash dialysis rate is unverified (packet Section C).
- **No invented data** — reviewer is the real, already-live Dr. Dekate; NAP from master-context; CKD/hemodialysis real; PD gated on Section A.
- When the page ships, log it to `change-ledger.md`.
