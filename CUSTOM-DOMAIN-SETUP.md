# Custom Domain Setup Guide - hopehospital.com on Vercel

**Current Vercel URL**: https://hopehospital-two.vercel.app/
**Target Domain**: hopehospital.com
**Domain Registrar**: EnomCentral (https://www.enomcentral.com/)

---

## Step-by-Step Guide

### Part 1: Add Domain in Vercel

1. **Login to Vercel Dashboard**
   - Go to https://vercel.com/
   - Login with your account

2. **Navigate to Your Project**
   - Find and click on "hopehospital" project
   - Or go directly to: https://vercel.com/chatgptnotes-6366s-projects/hopehospital

3. **Go to Settings**
   - Click on "Settings" tab at the top
   - Click on "Domains" in the left sidebar

4. **Add Custom Domain**
   - Click "Add" button
   - Enter: `hopehospital.com`
   - Click "Add"

5. **Add www Subdomain (Recommended)**
   - Click "Add" again
   - Enter: `www.hopehospital.com`
   - Click "Add"

6. **Vercel Will Show DNS Configuration**
   - Vercel will display the DNS records you need to add
   - Keep this page open - you'll need these values

---

### Part 2: Configure DNS at EnomCentral

#### DNS Records You Need to Add:

**Option A: Using A Records (Recommended)**

For `hopehospital.com`:
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

For `www.hopehospital.com`:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

**Option B: Using CNAME (Alternative)**

If A record doesn't work:
```
Type: CNAME
Name: @ (or leave blank)
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

---

### Part 3: Add DNS Records in EnomCentral

1. **Login to EnomCentral**
   - Go to https://www.enomcentral.com/myaccount/
   - Login with your credentials

2. **Find Your Domain**
   - Locate `hopehospital.com` in your domain list
   - Click on "Manage Domain" or "DNS Management"

3. **Access DNS Settings**
   - Look for "DNS Management", "Nameservers", or "DNS Zone File"
   - Click on it to access DNS records

4. **Add A Record for Root Domain**
   - Click "Add Record" or "Add New Record"
   - Select Type: **A**
   - Host/Name: **@** (or leave blank for root domain)
   - Points to/Value: **76.76.21.21**
   - TTL: **3600** (or leave as default)
   - Click "Save" or "Add"

5. **Add CNAME Record for www**
   - Click "Add Record" again
   - Select Type: **CNAME**
   - Host/Name: **www**
   - Points to/Value: **cname.vercel-dns.com**
   - TTL: **3600** (or leave as default)
   - Click "Save" or "Add"

6. **Remove Conflicting Records (Important!)**
   - Look for any existing A or CNAME records for @ or www
   - Delete old/conflicting records that point elsewhere
   - Common conflicts: parking pages, old hosting

7. **Save Changes**
   - Make sure to save/apply all DNS changes
   - Some registrars have a separate "Save Zone" or "Publish" button

---

### Part 4: Verify Domain in Vercel

1. **Return to Vercel Dashboard**
   - Go back to your project's Domains settings
   - You should see your domain(s) listed

2. **Check Verification Status**
   - Vercel will automatically check DNS records
   - Status will show:
     - ⏳ "Pending" - DNS not propagated yet
     - ✅ "Valid Configuration" - Domain is working!
     - ❌ "Invalid Configuration" - Check DNS settings

3. **Wait for DNS Propagation**
   - DNS changes can take 5 minutes to 48 hours
   - Usually propagates within 15-30 minutes
   - You can check status with: https://dnschecker.org/

---

### Part 5: Configure SSL Certificate (Automatic)

**Vercel handles SSL automatically!**

- Once domain is verified, Vercel will:
  - Issue a free SSL certificate from Let's Encrypt
  - Enable HTTPS automatically
  - Redirect HTTP to HTTPS
  - Renew certificates automatically

**Wait Time**: 5-15 minutes after DNS verification

---

## Alternative: Using Vercel's Nameservers (Easier)

If you have trouble with DNS records, you can use Vercel's nameservers:

### Step 1: Get Vercel Nameservers
1. In Vercel, go to your domain settings
2. Look for "Use Vercel Nameservers" option
3. Note the nameserver addresses (example):
   - ns1.vercel-dns.com
   - ns2.vercel-dns.com

### Step 2: Update Nameservers at EnomCentral
1. Login to EnomCentral
2. Go to domain management for hopehospital.com
3. Find "Nameservers" or "DNS Servers" section
4. Select "Custom Nameservers"
5. Enter Vercel's nameservers
6. Save changes

**Note**: This gives Vercel full control of your DNS. All DNS management will be done in Vercel.

---

## Troubleshooting

### Domain Shows "Invalid Configuration"

**Check:**
1. DNS records are correct (A record: 76.76.21.21, CNAME: cname.vercel-dns.com)
2. No conflicting DNS records exist
3. DNS has propagated (use https://dnschecker.org/)
4. TTL is set correctly (3600 or Auto)

### www Works but Root Domain Doesn't (or vice versa)

**Solution:**
- Make sure both records are added:
  - A record for @ (root)
  - CNAME for www
- Check for CNAME flattening or ALIAS records if your registrar supports it

### DNS Not Propagating

**Try:**
1. Clear browser cache and DNS cache
2. Use incognito/private browsing
3. Try different device/network
4. Wait longer (up to 48 hours max)
5. Flush local DNS:
   - Windows: `ipconfig /flushdns`
   - Mac: `sudo dscacheutil -flushcache`
   - Linux: `sudo systemd-resolve --flush-caches`

### SSL Certificate Not Issued

**Check:**
1. Domain is verified in Vercel (green checkmark)
2. Wait 15 minutes after verification
3. Try visiting https://hopehospital.com
4. Check Vercel deployment logs for errors

---

## Verification Commands

### Check DNS Propagation
```bash
# Check A record
nslookup hopehospital.com

# Check CNAME record
nslookup www.hopehospital.com

# Or use online tool
# Visit: https://dnschecker.org/
```

### Check SSL Certificate
```bash
# Check SSL
curl -I https://hopehospital.com

# Or visit in browser
# https://www.ssllabs.com/ssltest/analyze.html?d=hopehospital.com
```

---

## Expected Timeline

| Step | Time Required |
|------|---------------|
| Add domain in Vercel | 2 minutes |
| Configure DNS at EnomCentral | 5-10 minutes |
| DNS propagation | 15-30 minutes (up to 48 hours) |
| SSL certificate issuance | 5-15 minutes after DNS |
| **Total** | **30-60 minutes typically** |

---

## Final Verification Checklist

- [ ] Domain added in Vercel
- [ ] A record added at EnomCentral (@ → 76.76.21.21)
- [ ] CNAME record added at EnomCentral (www → cname.vercel-dns.com)
- [ ] Old/conflicting DNS records removed
- [ ] DNS propagation complete (check dnschecker.org)
- [ ] Domain verified in Vercel (green checkmark)
- [ ] SSL certificate issued (https:// works)
- [ ] Both hopehospital.com and www.hopehospital.com work
- [ ] HTTP redirects to HTTPS automatically

---

## Recommended Settings

### Redirect Configuration in Vercel

After domain is working:

1. **Set Primary Domain**
   - In Vercel, go to Domains settings
   - Choose either `hopehospital.com` or `www.hopehospital.com` as primary
   - Recommendation: Use `www.hopehospital.com` as primary
   - Vercel will redirect non-www to www automatically

2. **HTTPS Redirect**
   - Vercel does this automatically
   - All HTTP traffic redirects to HTTPS

3. **Update Canonical URLs**
   - Update canonical URL in index.html:
   ```html
   <link rel="canonical" href="https://www.hopehospital.com/" />
   ```

4. **Update Schema.org URLs**
   - Update all URLs in schema markup
   - Update social media URLs
   - Update sitemap URLs

---

## Support Resources

### Vercel Documentation
- Custom Domains: https://vercel.com/docs/concepts/projects/domains
- DNS Configuration: https://vercel.com/docs/concepts/projects/domains/add-a-domain
- Troubleshooting: https://vercel.com/docs/concepts/projects/domains/troubleshooting

### EnomCentral Support
- Knowledge Base: https://www.enomcentral.com/support/
- Contact Support: Through your account dashboard

### DNS Tools
- DNS Checker: https://dnschecker.org/
- What's My DNS: https://www.whatsmydns.net/
- DNS Propagation: https://www.dnswatch.info/

---

## Quick Setup Commands (for reference)

### Using Vercel CLI (Alternative Method)

```bash
# Login to Vercel
npx vercel login

# Add domain
npx vercel domains add hopehospital.com

# Add www subdomain
npx vercel domains add www.hopehospital.com

# Check domain status
npx vercel domains ls

# Inspect domain
npx vercel domains inspect hopehospital.com
```

---

## After Domain is Live

1. **Update Google Search Console**
   - Add both hopehospital.com and www.hopehospital.com
   - Set preferred domain
   - Submit updated sitemap with new domain

2. **Update Social Media**
   - Facebook page URL
   - Instagram bio link
   - Google My Business URL
   - All social profiles

3. **Update Analytics**
   - Update Google Analytics property
   - Update any tracking codes

4. **Test Everything**
   - All internal links work
   - Forms submit correctly
   - Images load properly
   - All sections accessible
   - Mobile responsive
   - SSL certificate valid

5. **Monitor**
   - Check Vercel deployment logs
   - Monitor analytics for traffic
   - Check Google Search Console for crawl errors

---

## Contact Information

If you need help:

**Vercel Support**: https://vercel.com/support
**EnomCentral Support**: Contact through your account

**Created**: November 15, 2025
**Last Updated**: November 15, 2025
**Version**: 1.0
