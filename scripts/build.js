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

// Copy sitemap.xml
const sitemapSrc = path.join(__dirname, '..', 'sitemap.xml');
const sitemapDest = path.join(buildDir, 'sitemap.xml');
if (fs.existsSync(sitemapSrc)) {
  fs.copyFileSync(sitemapSrc, sitemapDest);
  console.log('✓ Copied sitemap.xml');
}

// Copy robots.txt
const robotsSrc = path.join(__dirname, '..', 'robots.txt');
const robotsDest = path.join(buildDir, 'robots.txt');
if (fs.existsSync(robotsSrc)) {
  fs.copyFileSync(robotsSrc, robotsDest);
  console.log('✓ Copied robots.txt');
}

// Copy assets if they exist
const assetsDirs = ['images', 'css', 'js', 'blog'];
assetsDirs.forEach(dir => {
  const srcDir = path.join(__dirname, '..', dir);
  if (fs.existsSync(srcDir)) {
    const destDir = path.join(buildDir, dir);
    fs.mkdirSync(destDir, { recursive: true });

    // Copy all files in directory (including subdirectories)
    const copyRecursive = (src, dest) => {
      const entries = fs.readdirSync(src, { withFileTypes: true });
      entries.forEach(entry => {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
          fs.mkdirSync(destPath, { recursive: true });
          copyRecursive(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      });
    };

    copyRecursive(srcDir, destDir);
    console.log(`✓ Copied ${dir}/`);
  }
});

console.log('\n✅ Build complete! Output in /build directory');
console.log('📦 Ready for deployment\n');
