# PostHog Analytics - Quick Start Guide

## What I've Done ✅

1. **Added PostHog to all 10 HTML pages:**
   - index.html, contact.html, services.html, portfolio.html
   - addis-global.html, architecture-design.html, ethio-tech.html
   - law-firm.html, premium-cosmetics.html, tej-table.html

2. **Created PostHog configuration:**
   - `src/posthog-config.js` - For advanced tracking with Node.js
   - Updated `.env` file with PostHog variables
   - Created `POSTHOG_SETUP.md` - Full setup documentation

3. **Installed PostHog dependencies:**
   - Added `posthog-js` to package.json

## Your Domain
**ethiowebdesigners.xyz** ✅ Ready to track

---

## 🚀 Next Steps (3 minutes)

### Step 1: Create PostHog Account
- Go to **https://posthog.com**
- Sign up for free
- Create a project

### Step 2: Get Your Project Token
- In PostHog dashboard, go to **⚙️ Settings → Project**
- Copy your **Project Token** (looks like: `phc_abc123xyz...`)

### Step 3: Replace in Your Code
Find and replace `YOUR_POSTHOG_API_KEY` with your actual **Project Token** in ALL these files:
- `index.html`
- `contact.html`
- `services.html`
- `portfolio.html`
- `addis-global.html`
- `architecture-design.html`
- `ethio-tech.html`
- `law-firm.html`
- `premium-cosmetics.html`
- `tej-table.html`

**Quick Replace:**
```bash
cd /Users/owner/Desktop/hello/pro/et
sed -i '' 's/YOUR_POSTHOG_API_KEY/phc_YOUR_ACTUAL_KEY_HERE/g' *.html
```

### Step 4: Commit & Deploy
```bash
git add .
git commit -m "Add PostHog analytics tracking"
git push
```

Your Vercel deployment will update automatically. PostHog will start tracking immediately!

### Step 5: View Analytics
1. Go to **https://app.posthog.com**
2. Click **Insights** → You'll see:
   - **Unique Users** (visitors)
   - **Page Views** (total sessions)
   - **Top Pages** (most visited)
   - **User Events** (clicks, interactions)

---

## 📊 What Gets Tracked Automatically

| Metric | Description |
|--------|-------------|
| **Page Views** | Every time someone visits a page |
| **Session Duration** | How long users stay on site |
| **Unique Users** | Count of distinct visitors |
| **Bounce Rate** | Users who visit only 1 page |
| **User Paths** | Which pages users visit in order |
| **Clicks** | Every button/link click |
| **Form Submissions** | Contact form submissions |
| **Geographic Data** | Location of visitors |

---

## 💡 Pro Tips

1. **Identify Contact Form Submissions:**
   Add this to your contact form handler to track submissions:
   ```javascript
   posthog.capture('contact_form_submitted', {
     service_type: 'web-design',
     page: window.location.pathname,
   });
   ```

2. **Track "Reserve Your Slot" Clicks:**
   ```javascript
   document.querySelectorAll('.btn--primary').forEach(btn => {
     btn.addEventListener('click', () => {
       posthog.capture('reserve_slot_clicked', {
         page: window.location.pathname,
       });
     });
   });
   ```

3. **View Heatmaps:**
   PostHog shows you where users click the most.

4. **Session Recordings:**
   Optionally view how real users interact with your site.

---

## 📞 Support

- **PostHog Docs:** https://posthog.com/docs
- **PostHog Community:** https://posthog.com/slack
- **Questions?** Check `POSTHOG_SETUP.md` for detailed info

---

## Free Tier Limits

✅ **Free plan includes:**
- 1,000,000 events/month (plenty for most sites)
- Unlimited users
- 30-day data retention
- Core analytics features

No credit card required to start!
