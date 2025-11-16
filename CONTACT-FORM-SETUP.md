# Contact Form Setup Instructions

## Current Status
✅ Contact form is configured to send emails using **Web3Forms**
✅ Form will send messages to: **cmd@hopehospital.com**
⚠️ **ACTION REQUIRED**: You need to get a free Web3Forms access key

---

## How to Set Up (5 Minutes)

### Step 1: Get Your Free Web3Forms Access Key

1. **Visit Web3Forms**
   - Go to: https://web3forms.com/
   - Click "Get Started Free" or "Create Access Key"

2. **Enter Your Email**
   - Enter: **cmd@hopehospital.com**
   - Click "Create Access Key"

3. **Check Your Email**
   - Check inbox for **cmd@hopehospital.com**
   - Look for email from Web3Forms
   - Subject: "Verify your email for Web3Forms"
   - Click the verification link

4. **Get Your Access Key**
   - After verification, you'll see your **Access Key**
   - It looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
   - Copy this key

---

### Step 2: Add Access Key to Website

1. **Open index.html**
   - Find line 5417 (search for "YOUR_ACCESS_KEY_HERE")

2. **Replace the placeholder:**
   ```html
   <!-- BEFORE -->
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">

   <!-- AFTER (with your actual key) -->
   <input type="hidden" name="access_key" value="a1b2c3d4-e5f6-7890-abcd-ef1234567890">
   ```

3. **Save the file**

4. **Deploy to Vercel:**
   ```bash
   git add index.html
   git commit -m "Add Web3Forms access key"
   npx vercel --prod
   ```

---

## How It Works

1. **User fills form** on hopehospital.com
2. **Form submits** to Web3Forms API
3. **Web3Forms sends email** to cmd@hopehospital.com
4. **You receive email** with:
   - Name
   - Phone Number
   - Email Address (if provided)
   - Message

---

## Email Format You'll Receive

```
From: Hope Hospital Contact Form
To: cmd@hopehospital.com
Subject: New Contact Form Submission - Hope Hospital

Name: John Doe
Phone: 9876543210
Email: john@example.com
Message: I need an appointment for knee replacement surgery.
```

---

## Testing the Form

After setting up the access key:

1. Go to: https://hopehospital.com/#contact
2. Fill the form with test data
3. Click "Send Message"
4. Check **cmd@hopehospital.com** inbox
5. You should receive the email within 1-2 minutes

---

## Web3Forms Features (Free Tier)

✅ **250 submissions per month** (free)
✅ **Email notifications** to cmd@hopehospital.com
✅ **Spam filtering** built-in
✅ **File uploads** supported (if needed)
✅ **Custom email templates**
✅ **Webhook support** for integrations
✅ **Dashboard** to view all submissions

---

## Troubleshooting

### Form doesn't send email?
- ✅ Check access key is correct
- ✅ Verify email address (cmd@hopehospital.com)
- ✅ Check spam folder
- ✅ Wait 2-3 minutes after first submission

### Still not working?
- Check Web3Forms dashboard: https://web3forms.com/dashboard
- Look for submission logs
- Verify email verification was completed

---

## Alternative: Formspree Setup

If you prefer Formspree instead:

1. Go to: https://formspree.io/
2. Sign up with **cmd@hopehospital.com**
3. Create a new form
4. Get form ID (like: `xdkovdaa`)
5. Update index.html line 5415:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

---

## Support

- **Web3Forms Docs**: https://docs.web3forms.com/
- **Web3Forms Support**: support@web3forms.com
- **Dashboard**: https://web3forms.com/dashboard

---

**Created**: November 16, 2025
**Version**: 1.0
**For**: Hope Hospital Website - hopehospital.com
