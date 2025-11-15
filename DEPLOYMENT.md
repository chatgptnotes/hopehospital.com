# Hope Hospital Website - Deployment Guide

## Quick Deployment Commands

```bash
# Test locally first
npm run dev
# Open http://localhost:3000

# Build for production
npm run build

# Deploy to Vercel (recommended)
npm run deploy
```

## Deployment Options

### 1. Vercel (Recommended - Easiest)

**Step 1:** Install Vercel CLI
```bash
npm install -g vercel
```

**Step 2:** Login to Vercel
```bash
vercel login
```

**Step 3:** Deploy
```bash
vercel --prod
```

**Benefits:**
- Automatic HTTPS
- Global CDN
- Zero configuration
- Free for personal projects
- Automatic deployments from Git

**Live URL:** Will be provided after deployment (e.g., `hopehospital.vercel.app`)

---

### 2. Netlify

**Step 1:** Install Netlify CLI
```bash
npm install -g netlify-cli
```

**Step 2:** Login
```bash
netlify login
```

**Step 3:** Deploy
```bash
npm run build
netlify deploy --prod --dir=build
```

**Alternative: Drag & Drop**
1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `build` folder
4. Done!

---

### 3. GitHub Pages

**Step 1:** Push to GitHub
```bash
git push origin main
```

**Step 2:** Enable GitHub Pages
1. Go to repository settings
2. Navigate to "Pages"
3. Select branch: `main`
4. Select folder: `/` (root)
5. Save

**Live URL:** `https://chatgptnotes.github.io/hopehospital.com/`

---

### 4. Traditional Web Hosting (cPanel, FTP)

**Step 1:** Build
```bash
npm run build
```

**Step 2:** Upload
- Connect via FTP (FileZilla, Cyberduck)
- Upload all files from `build/` directory to `public_html/` or `www/`

**Files to upload:**
- index.html
- All images (if using local images)
- Any CSS/JS files

---

## Environment Setup for Production

### Update Image Paths

If using local images, update the path in `index.html`:

```html
<!-- Change from: -->
<img src="/Users/murali/Muralibk 19 sept/muralibk/public/images/dr-murali-bk.jpg">

<!-- To: -->
<img src="./images/dr-murali-bk.jpg">
```

Then create an `images/` folder and add the image.

### Configure Environment Variables

For Vercel/Netlify, add environment variables in their dashboard:

**Vercel:**
```bash
vercel env add CONTACT_EMAIL
vercel env add GOOGLE_ANALYTICS_ID
```

**Netlify:**
1. Go to Site Settings → Environment Variables
2. Add variables from `.env.example`

---

## Domain Configuration

### Custom Domain Setup

**For Vercel:**
```bash
vercel domains add hopehospital.com
```

**For Netlify:**
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

**For GitHub Pages:**
1. Add `CNAME` file in repository root:
   ```
   hopehospital.com
   ```
2. Update DNS:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153

   Type: CNAME
   Name: www
   Value: chatgptnotes.github.io
   ```

---

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All sections visible and styled
- [ ] Images display properly
- [ ] Forms submit successfully
- [ ] Mobile responsive works
- [ ] Navigation links work
- [ ] Contact numbers are correct
- [ ] Emergency hotline visible
- [ ] Footer version displays correctly
- [ ] Meta tags present (view source)
- [ ] No console errors
- [ ] SSL certificate active (HTTPS)
- [ ] Google Search Console setup
- [ ] Google Analytics configured (optional)
- [ ] Social sharing works (Open Graph)

---

## Continuous Deployment

### Automatic Deployments from Git

**Vercel:** Automatic
- Any push to `main` branch auto-deploys

**Netlify:** Automatic
- Connect GitHub repository
- Auto-deploys on push

**GitHub Actions** (Custom):
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## Performance Optimization

Before deploying, run:

```bash
# Minify HTML (optional)
npm install -g html-minifier
html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html

# Optimize images (if using local images)
npm install -g imagemin-cli
imagemin images/* --out-dir=build/images
```

---

## SSL/HTTPS Setup

All recommended platforms (Vercel, Netlify, GitHub Pages) provide **automatic HTTPS**.

For traditional hosting:
1. Get free SSL from Let's Encrypt
2. Use cPanel "SSL/TLS" to install
3. Force HTTPS in `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## Monitoring & Analytics

### Google Analytics

1. Create GA4 property
2. Add tracking code to `index.html` before `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Google Search Console

1. Go to https://search.google.com/search-console
2. Add property (hopehospital.com)
3. Verify via HTML tag or DNS
4. Submit sitemap (optional)

---

## Backup & Recovery

### Automatic Backups

Your website is backed up automatically via:
- **Git repository** (version control)
- **Vercel/Netlify** (deployment history)
- **Build folder** (local backups)

### Manual Backup

```bash
# Backup entire project
zip -r hopehospital-backup-$(date +%Y%m%d).zip . -x node_modules/**\* -x .git/**\*

# Upload to cloud storage (Google Drive, Dropbox, etc.)
```

---

## Rollback Procedures

**Vercel/Netlify:**
1. Go to deployments tab
2. Select previous deployment
3. Click "Promote to Production"

**Git:**
```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

---

## Support & Troubleshooting

### Common Issues

**Issue:** Images not loading
- **Fix:** Check image paths are relative, not absolute

**Issue:** Forms not submitting
- **Fix:** Check browser console for JavaScript errors

**Issue:** Mobile layout broken
- **Fix:** Clear cache, check viewport meta tag

**Issue:** Slow loading
- **Fix:** Optimize images, enable CDN

---

## Contact for Deployment Help

- **Technical Support:** dev@hopehospital.com
- **Emergency:** +91-9373111709

---

## Version History

- **v1.0.0** - November 15, 2024 - Initial deployment

---

**Deployment Status:** ✅ Ready for Production
**Last Updated:** November 15, 2024
**Deployed By:** Claude Code Autonomous Agent
