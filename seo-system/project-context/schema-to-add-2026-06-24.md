# Schema to add — generated 2026-06-24 (from /schema-generate)

**Generate-only.** Ready-to-paste JSON-LD for the pages with genuine **safe** schema gaps (no medical
claims, no doctor sign-off). Insert each block just before `</head>` (alongside the existing JSON-LD).
**Before publishing FAQPage:** confirm each answer matches the page's visible FAQ text verbatim (Google
requires it) — answers below are transcribed from the live page but should be eyeballed at apply time.

---

## 1) blog/hip-replacement-when-do-you-need-it.html  (AEO 4 → ~8)
Already present: Physician, Hospital, BreadcrumbList. **Add:** MedicalWebPage, FAQPage, MedicalProcedure.

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"MedicalWebPage","@id":"https://www.hopehospital.com/blog/hip-replacement-when-do-you-need-it#webpage","url":"https://www.hopehospital.com/blog/hip-replacement-when-do-you-need-it","name":"Hip Replacement Surgery in Nagpur: When Do You Need It?","inLanguage":"en-IN","audience":{"@type":"MedicalAudience","audienceType":"Patient"},"about":{"@type":"MedicalProcedure","name":"Hip Replacement Surgery"},"isPartOf":{"@type":"WebSite","name":"Hope Hospital Nagpur","url":"https://www.hopehospital.com/"},"publisher":{"@type":"Organization","name":"Hope Hospital","url":"https://www.hopehospital.com/"}}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"MedicalProcedure","name":"Hip Replacement (Total Hip Replacement)","alternateName":"THR","procedureType":"https://schema.org/SurgicalProcedure","bodyLocation":"Hip joint","relevantSpecialty":{"@type":"MedicalSpecialty","name":"Orthopedic"},"howPerformed":"Surgical replacement of the damaged hip joint with an artificial implant.","seriousAdverseOutcome":{"@type":"MedicalEntity","name":"Managed surgically at a NABH-accredited hospital"},"availableService":{"@type":"Hospital","name":"Hope Hospital","url":"https://www.hopehospital.com/"}}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What is the ideal age for hip replacement?","acceptedAnswer":{"@type":"Answer","text":"There's no strict age limit. The decision is based on pain level and disability, not age. Most patients are between 50-80 years old, but younger patients with severe arthritis or older patients in good health can also be suitable candidates."}},
{"@type":"Question","name":"How long do hip replacements last?","acceptedAnswer":{"@type":"Answer","text":"Modern hip implants typically last 15-20 years or longer. Over 90% of hip replacements are still functioning well after 15 years."}},
{"@type":"Question","name":"Will I be able to walk immediately after surgery?","acceptedAnswer":{"@type":"Answer","text":"Yes. At Hope Hospital, patients typically begin walking with a walker on the first day after surgery under physiotherapist guidance."}},
{"@type":"Question","name":"Is hip replacement painful?","acceptedAnswer":{"@type":"Answer","text":"Post-operative pain is managed effectively with medications. Most patients report that recovery discomfort is far less than the chronic pain they experienced before surgery."}},
{"@type":"Question","name":"Can I have both hips replaced at once?","acceptedAnswer":{"@type":"Answer","text":"Bilateral hip replacement (both hips) can be done in selected healthy patients. The surgeon will assess if you are a suitable candidate based on your overall health."}},
{"@type":"Question","name":"What activities can I do after hip replacement?","acceptedAnswer":{"@type":"Answer","text":"Low-impact activities like walking, swimming, golf, cycling, and dancing are encouraged. Avoid high-impact activities like running or contact sports."}},
{"@type":"Question","name":"Will I need to take special precautions forever?","acceptedAnswer":{"@type":"Answer","text":"Hip precautions (avoiding extreme bending, crossing legs) are typically needed for 6-12 weeks. After full recovery, most restrictions are lifted, though extreme range of motion should always be avoided."}}
]}
</script>
```
*Conditions named on the page (for reference / optional MedicalCondition entities): Osteoarthritis, Rheumatoid Arthritis, Avascular Necrosis, Hip Dysplasia, Hip Fracture.*

---

## 2) blog/knee-replacement-surgery-nagpur-guide.html  (AEO 4 → ~8)
Already present: Physician, Hospital, BreadcrumbList. **Add:** MedicalWebPage, FAQPage, MedicalProcedure.
*(Verify the exact `name` against the page's `<title>` before publishing.)*

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"MedicalWebPage","@id":"https://www.hopehospital.com/blog/knee-replacement-surgery-nagpur-guide#webpage","url":"https://www.hopehospital.com/blog/knee-replacement-surgery-nagpur-guide","name":"Knee Replacement Surgery in Nagpur — Complete Guide","inLanguage":"en-IN","audience":{"@type":"MedicalAudience","audienceType":"Patient"},"about":{"@type":"MedicalProcedure","name":"Knee Replacement Surgery"},"isPartOf":{"@type":"WebSite","name":"Hope Hospital Nagpur","url":"https://www.hopehospital.com/"},"publisher":{"@type":"Organization","name":"Hope Hospital","url":"https://www.hopehospital.com/"}}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"MedicalProcedure","name":"Knee Replacement (Total Knee Replacement)","alternateName":"TKR","procedureType":"https://schema.org/SurgicalProcedure","bodyLocation":"Knee joint","relevantSpecialty":{"@type":"MedicalSpecialty","name":"Orthopedic"},"howPerformed":"Surgical replacement of the damaged knee joint surfaces with an artificial implant.","availableService":{"@type":"Hospital","name":"Hope Hospital","url":"https://www.hopehospital.com/"}}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"How long does a knee replacement last?","acceptedAnswer":{"@type":"Answer","text":"Modern knee implants typically last 15-20 years or more. With advances in implant technology and proper care, many patients never need revision surgery."}},
{"@type":"Question","name":"Is knee replacement surgery painful?","acceptedAnswer":{"@type":"Answer","text":"You'll experience some pain after surgery, but it's well-managed with medications. Most patients report that post-surgery discomfort is far less than the chronic pain they experienced before surgery."}},
{"@type":"Question","name":"Can I kneel or squat after knee replacement?","acceptedAnswer":{"@type":"Answer","text":"Most patients can kneel comfortably 3-6 months after surgery. Squatting ability varies by individual, but many patients can perform modified squats; the surgeon provides specific guidance based on your recovery."}},
{"@type":"Question","name":"When can I return to work after knee replacement?","acceptedAnswer":{"@type":"Answer","text":"Most patients with desk jobs can return to work within 4-6 weeks. Those with physically demanding jobs may need 3-4 months, based on the surgeon's advice for your occupation."}},
{"@type":"Question","name":"Will I set off metal detectors at airports?","acceptedAnswer":{"@type":"Answer","text":"Yes, knee implants may trigger metal detectors. We provide you with a medical implant card to show security personnel."}},
{"@type":"Question","name":"What activities can I do after knee replacement?","acceptedAnswer":{"@type":"Answer","text":"Low-impact activities like walking, swimming, golf, cycling, and dancing are encouraged. High-impact activities like running, jumping, or contact sports should be avoided to protect the implant."}}
]}
</script>
```
*Conditions named on the page: Osteoarthritis, Rheumatoid Arthritis, Post-traumatic Arthritis, Avascular Necrosis, Knee Deformities.*

---

## 3) departments.html  (AEO 6 → ~8)
Already present: FAQPage, Physician, Hospital, BreadcrumbList. **Add:** MedicalWebPage (+ optional department ItemList).

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"MedicalWebPage","@id":"https://www.hopehospital.com/departments#webpage","url":"https://www.hopehospital.com/departments","name":"Departments — Hope Hospital, Nagpur","inLanguage":"en-IN","audience":{"@type":"MedicalAudience","audienceType":"Patient"},"isPartOf":{"@type":"WebSite","name":"Hope Hospital Nagpur","url":"https://www.hopehospital.com/"},"publisher":{"@type":"Organization","name":"Hope Hospital","url":"https://www.hopehospital.com/"}}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"ItemList","name":"Medical Departments at Hope Hospital, Nagpur","itemListElement":[
{"@type":"ListItem","position":1,"item":{"@type":"MedicalSpecialty","name":"Orthopedics","url":"https://www.hopehospital.com/departments/orthopedics"}},
{"@type":"ListItem","position":2,"item":{"@type":"MedicalSpecialty","name":"Neurosurgery","url":"https://www.hopehospital.com/departments/neurosurgery"}},
{"@type":"ListItem","position":3,"item":{"@type":"MedicalSpecialty","name":"Cardiology","url":"https://www.hopehospital.com/departments/cardiology"}},
{"@type":"ListItem","position":4,"item":{"@type":"MedicalSpecialty","name":"Critical Care","url":"https://www.hopehospital.com/departments/critical-care"}},
{"@type":"ListItem","position":5,"item":{"@type":"MedicalSpecialty","name":"Oncology","url":"https://www.hopehospital.com/departments/oncology"}},
{"@type":"ListItem","position":6,"item":{"@type":"MedicalSpecialty","name":"Mother & Child Care","url":"https://www.hopehospital.com/departments/mother-child-care"}},
{"@type":"ListItem","position":7,"item":{"@type":"MedicalSpecialty","name":"Minimal Invasive Surgery","url":"https://www.hopehospital.com/departments/minimal-invasive-surgery"}},
{"@type":"ListItem","position":8,"item":{"@type":"MedicalSpecialty","name":"Gastroenterology","url":"https://www.hopehospital.com/departments/gastroenterology"}},
{"@type":"ListItem","position":9,"item":{"@type":"MedicalSpecialty","name":"Nephrology & Urology","url":"https://www.hopehospital.com/departments/nephrology"}},
{"@type":"ListItem","position":10,"item":{"@type":"MedicalSpecialty","name":"Colorectal & Minimal Access Surgery","url":"https://www.hopehospital.com/departments/colorectal-surgery"}}
]}
</script>
```

---

## Apply checklist (when shipped, post-export)
1. Paste each block before `</head>`; validate all JSON-LD parses.
2. FAQPage: confirm answers match the visible FAQ text verbatim.
3. `npm run audit` → 0/0; re-run `node seo-system/scripts/geo-check.js <page>` (expect the missing types now present).
4. Log to `change-ledger.md` (n/a — GEO/AI); commit on approval.
