---
description: Open this week's GBP-post PDF (as a PDF) and write a ChatGPT image-generation prompt for today's GBP post
---

This is the **daily publish helper** of the Hope Hospital GBP workflow. Trigger
phrase: the user says **"today's GBP post"** (or runs `/todays-gbp-post`).

It does exactly two things — (1) open this week's GBP post PDF in a PDF viewer, and
(2) hand the user a ready-to-paste ChatGPT prompt to generate today's post image.
It does NOT publish anything (the user posts to GBP manually) and does NOT invent
post copy — today's post already lives in this week's GBP sheet.

## Steps

1. **Find this week's GBP sheet.** Today's date determines the week. The weekly GBP
   posts live as an HTML sheet at the repo root named
   `gbp-posts-<month-range>-<year>.html` (e.g. `gbp-posts-jun-16-22-2026.html`).
   Pick the sheet whose date range contains today.

2. **Ensure the weekly PDF exists and is current.** The PDF lives at
   `seo-system/gbp/<same-name>.pdf`. If it is missing — or older than the HTML
   sheet — regenerate it from the HTML with Puppeteer (already a devDependency).
   Use a throwaway script like:
   ```js
   const path=require('path'),puppeteer=require('puppeteer');
   (async()=>{const src=path.resolve('gbp-posts-<range>.html');
   const out=path.resolve('seo-system/gbp/gbp-posts-<range>.pdf');
   const b=await puppeteer.launch({headless:'new'});const p=await b.newPage();
   await p.goto('file:///'+src.replace(/\\/g,'/'),{waitUntil:'load',timeout:30000});
   await new Promise(r=>setTimeout(r,1500));
   await p.pdf({path:out,format:'A4',printBackground:true,
   margin:{top:'12mm',bottom:'12mm',left:'10mm',right:'10mm'}});await b.close();})();
   ```
   Delete the temp script afterward.

3. **Open the PDF as a PDF** — in the OS default PDF viewer, NOT localhost/browser:
   `Invoke-Item "C:\…\seo-system\gbp\gbp-posts-<range>.pdf"` (PowerShell). Never
   open it via the dev server / `http://localhost`. If a localhost preview of the
   sheet is still open, stop the dev server on its port.

4. **Read today's post from the weekly sheet.** Find the card dated today and pull
   its **headline**, **body**, and the **"Image Idea"** note.

5. **Write the ChatGPT image prompt** from that Image Idea (see Output).

## Output

A single, ready-to-paste **ChatGPT image-generation prompt** for today's post,
built from the sheet's "Image Idea", following the Hope Hospital design system:

- Square **1080×1080** (1:1), print-quality medical-awareness graphic.
- Palette: **navy #1B365D**, **red #D31211**, **orange accent #F26A1B**, white,
  soft light-blue. Sans-serif (Montserrat / Open Sans feel). Clean, uncluttered.
- Headline styling: keyword in navy, the emotive words (e.g. "WARNING SIGNS") in the
  red/orange accent.
- **Branding:** instruct the user to **attach the Hope Hospital logo**
  (`images/new_hd_logo-removebg-preview.png`, transparent) and tell the model to use
  it **exactly as provided**, placed **bottom-right** on white space — do not redraw,
  recolor, distort, or crop it.
- Spell out any on-image text **exactly**, and warn that image models often misspell —
  the user should verify/regenerate.

Then a one-line reminder of which logo file to attach + that the PDF is now open.

## Rules

- **Open the weekly PDF as a PDF (`Invoke-Item`), never via localhost/browser.**
  (See [[feedback_gbp_today_open_weekly_pdf]].)
- The image must use the **attached real logo** — never let the model draw a fake
  Hope Hospital logo.
- Honor all GBP/site constraints: **no phone number on the image or in post body**
  (Call CTA button only — [[feedback_gbp_no_phone_in_post_body]]); Ayushman "free"
  always qualified ("for eligible cardholders" / "covered" / "cashless" —
  [[feedback_ayushman_free_qualifier]]); **no Hindi**; rating **4.0★ / 430**.
- Only true facts — don't invent post copy; today's post comes from the weekly sheet.
- Draft/prompt only — the user generates the image in ChatGPT and publishes to GBP
  manually.
