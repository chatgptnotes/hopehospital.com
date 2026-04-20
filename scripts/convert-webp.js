const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imagesDir = path.resolve(__dirname, '..', 'images');

const files = fs.readdirSync(imagesDir).filter(f => /\.(jpg|jpeg|png|gif|bmp)$/i.test(f));

(async () => {
  for (const file of files) {
    const input = path.join(imagesDir, file);
    const name = path.parse(file).name;
    const output = path.join(imagesDir, name + '.webp');

    if (fs.existsSync(output)) {
      console.log(`SKIP (exists): ${file}`);
      continue;
    }

    try {
      const info = await sharp(input).webp({ quality: 80 }).toFile(output);
      const origSize = fs.statSync(input).size;
      const savings = ((1 - info.size / origSize) * 100).toFixed(1);
      console.log(`OK: ${file} → ${name}.webp (${(origSize/1024).toFixed(0)}KB → ${(info.size/1024).toFixed(0)}KB, -${savings}%)`);
    } catch (err) {
      console.error(`FAIL: ${file} — ${err.message}`);
    }
  }
  console.log('\nDone.');
})();
