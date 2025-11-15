const fs = require('fs');
const path = require('path');

console.log('🏗️  Building Hope Hospital Website...\n');

// Create build directory
const buildDir = path.join(__dirname, '..', 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Copy index.html
const indexSrc = path.join(__dirname, '..', 'index.html');
const indexDest = path.join(buildDir, 'index.html');
fs.copyFileSync(indexSrc, indexDest);
console.log('✓ Copied index.html');

// Copy assets if they exist
const assetsDirs = ['images', 'css', 'js'];
assetsDirs.forEach(dir => {
  const srcDir = path.join(__dirname, '..', dir);
  if (fs.existsSync(srcDir)) {
    const destDir = path.join(buildDir, dir);
    fs.mkdirSync(destDir, { recursive: true });

    // Copy all files in directory
    fs.readdirSync(srcDir).forEach(file => {
      fs.copyFileSync(
        path.join(srcDir, file),
        path.join(destDir, file)
      );
    });
    console.log(`✓ Copied ${dir}/`);
  }
});

console.log('\n✅ Build complete! Output in /build directory');
console.log('📦 Ready for deployment\n');
