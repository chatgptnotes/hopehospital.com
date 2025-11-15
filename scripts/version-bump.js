const fs = require('fs');
const path = require('path');

// Read package.json
const packagePath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Parse version
const [major, minor] = pkg.version.split('.').map(Number);

// Increment minor version
const newVersion = `${major}.${minor + 1}.0`;

// Update package.json
pkg.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');

// Update version in HTML footer
const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Get current date
const date = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});

// Replace version info in footer
const versionRegex = /Version [\d.]+\s*\|\s*Last updated:.*?\s*\|\s*hopehospital\.com/;
const newVersionInfo = `Version ${newVersion} | Last updated: ${date} | hopehospital.com`;

if (versionRegex.test(html)) {
  html = html.replace(versionRegex, newVersionInfo);
} else {
  // If not found, add it to footer-bottom
  html = html.replace(
    /(&copy; \d{4} Hope Hospital\. All rights reserved\.)/,
    `$1<br><span style="font-size: 0.75rem; opacity: 0.6; margin-top: 0.5rem; display: inline-block;">${newVersionInfo}</span>`
  );
}

fs.writeFileSync(indexPath, html);

console.log(`✓ Version bumped to ${newVersion}`);
console.log(`✓ Date updated to ${date}`);
console.log(`✓ HTML footer updated`);
