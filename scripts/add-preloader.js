const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const files = [
  'index.html',
  'about.html',
  'contact.html',
  'departments.html',
  'empanelments.html',
  'gallery.html',
  'hospitals.html',
  'blog/index.html',
  'blog/knee-replacement-surgery-nagpur-guide.html',
  'blog/hip-replacement-when-do-you-need-it.html',
  'blog/choosing-best-hospital-in-nagpur.html',
  'nagpur/index.html',
  'departments/orthopedics.html',
  'departments/neurosurgery.html',
  'departments/cardiology.html',
  'departments/critical-care.html',
  'departments/oncology.html',
  'departments/gastroenterology.html',
  'departments/nephrology.html',
  'departments/colorectal-surgery.html',
  'departments/minimal-invasive-surgery.html',
  'departments/mother-child-care.html',
  'diseases/arthritis.html',
  'diseases/diabetes.html',
  'diseases/hypertension.html',
];

// The preloader snippet — injected immediately after <body ...>
const preloaderHTML = `
  <!-- Preloader: hides page until fully loaded -->
  <div id="preloader" style="position:fixed;inset:0;background:#ffffff;z-index:99999;display:flex;align-items:center;justify-content:center;">
    <img src="/images/hope-hospital-logo-header.webp" alt="Hope Hospital" style="height:64px;width:auto;" onerror="this.style.display='none'">
  </div>
  <style>
    #preloader{transition:opacity 0.35s ease;}
    #preloader.fade-out{opacity:0;}
  </style>
  <script>
    window.addEventListener('load',function(){
      var p=document.getElementById('preloader');
      if(p){p.classList.add('fade-out');setTimeout(function(){p.style.display='none';},360);}
    });
  </script>`;

let updated = 0;
let skipped = 0;

files.forEach(rel => {
  const filePath = path.join(root, rel);
  if (!fs.existsSync(filePath)) {
    console.log(`  SKIP (not found): ${rel}`);
    skipped++;
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Already has preloader? Skip
  if (html.includes('id="preloader"')) {
    console.log(`  ALREADY DONE: ${rel}`);
    skipped++;
    return;
  }

  // Insert right after <body> (with any attributes)
  const bodyTag = html.match(/<body[^>]*>/i);
  if (!bodyTag) {
    console.log(`  NO <body>: ${rel}`);
    skipped++;
    return;
  }

  html = html.replace(bodyTag[0], bodyTag[0] + preloaderHTML);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`  ✓ ${rel}`);
  updated++;
});

console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
