const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, '..', 'images');

const jobs = [
  { src: 'phoenix-hero.png',     out: 'phoenix-hero.webp',     width: 1920, quality: 78 },
  { src: 'phoenix-services.png', out: 'phoenix-services.webp', width: 1600, quality: 78 },
  { src: 'phoenix-logo.png',     out: 'phoenix-logo.webp',     width: 256,  quality: 90 },
  { src: 'dr-murali-bk.jpg',     out: 'dr-murali-bk.webp',     width: 900,  quality: 82 },
  { src: 'hope-hospital-logo.png', out: 'hope-hospital-logo.webp', width: 400, quality: 90 },
  { src: 'hope-hospital-og.png', out: 'hope-hospital-og.webp', width: 1200, quality: 82 },
];

(async () => {
  for (const job of jobs) {
    const srcPath = path.join(IMG_DIR, job.src);
    const outPath = path.join(IMG_DIR, job.out);
    if (!fs.existsSync(srcPath)) {
      console.log(`SKIP  ${job.src} (not found)`);
      continue;
    }
    const srcBytes = fs.statSync(srcPath).size;
    await sharp(srcPath)
      .resize({ width: job.width, withoutEnlargement: true })
      .webp({ quality: job.quality })
      .toFile(outPath);
    const outBytes = fs.statSync(outPath).size;
    const pct = ((1 - outBytes / srcBytes) * 100).toFixed(1);
    console.log(
      `${job.src.padEnd(28)} ${(srcBytes / 1024).toFixed(0).padStart(6)} KB  ->  ` +
      `${job.out.padEnd(28)} ${(outBytes / 1024).toFixed(0).padStart(6)} KB  (-${pct}%)`
    );
  }
})();
