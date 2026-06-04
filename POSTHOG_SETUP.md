# PostHog Analytics Setup Guide

## Overview
PostHog is now configured to track:
- ✅ Number of visitors (sessions)
- ✅ User interactivity (clicks, form submissions, page navigation)
- ✅ Unique users (distinct visitors)
- ✅ Session duration and bounce rate
- ✅ Page views and user paths

## Step 1: Create a PostHog Account

1. Go to **https://posthog.com**
2. Click "Start Free" 
3. Sign up with your email
4. Create a new project or use the default

## Step 2: Get Your Project Token

1. After signing up, go to **Project Settings** (⚙️ icon)
2. Copy your **Project Token** (starts with `phc_`)
3. Also note your **API Host** (usually `https://us.i.posthog.com` for US)

## Step 3: Add API Key to Your Code

Replace `YOUR_POSTHOG_API_KEY` in these files:

### Option A: Frontend (HTML) - Already Added
- **File**: `index.html` (line ~11)
- Replace `YOUR_POSTHOG_API_KEY` with your **Project Token**

### Option B: Backend (Node.js) - Optional
- **File**: `.env`
- Add: `VITE_POSTHOG_API_KEY=phc_YOUR_PROJECT_TOKEN_HERE`

### Option C: All Other HTML Files (Recommended)
Add this to the `<head>` of: `contact.html`, `services.html`, `portfolio.html`, `law-firm.html`, `premium-cosmetics.html`, `tejy-table.html`, `ethio-tech.html`, `architecture-design.html`, `addis-global.html`

```html
<!-- PostHog Analytics -->
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0===u.POSTHOG_DEBUG&&(u.POSTHOG_DEBUG=!1),o=0;o<e._i.length;o++)g(e._i[o]);e.SV=1.1,e.identify=function(t){e.append({"distinct_id":t})},e.capture=function(t,o){e.append({"event":t,"properties":o})},e.capturePageView=function(){e.capture("$pageview")},e.onready=function(t){e._onReady=t}},e.pageView=function(){e.capturePageView()});}(document,window.posthog||[]);
  posthog.init('YOUR_POSTHOG_API_KEY', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true,
    autocapture: true,
  });
</script>
```

## Step 4: Deploy to Vercel

Once you've updated your API key:

```bash
git add .
git commit -m "Add PostHog analytics"
git push
```

Your Vercel deployment will automatically update `ethiowebdesigners.xyz` with PostHog tracking.

## Step 5: View Your Analytics

1. Go to **https://app.posthog.com**
2. Navigate to **Insights** tab
3. You'll see:
   - **Unique users** (in the past 7/30 days)
   - **Page views** (total visitor sessions)
   - **Top pages** (most visited pages)
   - **User events** (clicks, form submissions)
   - **Session recordings** (optional: see how users interact)

## Key Metrics You Can Track

| Metric | Where to Find |
|--------|---------------|
| **Unique Visitors** | Insights → Unique Session IDs |
| **Total Page Views** | Insights → Count of $pageview events |
| **Bounce Rate** | Insights → Sessions with 1 event |
| **Avg Session Duration** | Insights → Time between events |
| **Form Submissions** | Insights → Events (auto-captured) |
| **Button Clicks** | Insights → Events → Click events |
| **User Paths** | User Paths dashboard |
| **Geographic Data** | Cohorts → Filter by location |

## Optional: Track Custom Events

In `src/main.js`, you can add custom tracking:

```javascript
import { trackEvent } from './posthog-config.js';

// Track contact form submission
trackEvent('contact_form_submitted', {
  service_type: 'web-design',
  phone: 'truncated',
});

// Track "Reserve Your Slot" button click
trackEvent('reserve_slot_clicked', {
  page: document.location.pathname,
});
```

## FAQ

**Q: When will I see data?**
A: PostHog starts tracking immediately after deployment. You'll see data within seconds of the first visitor.

**Q: Is my data private?**
A: Yes. PostHog respects user privacy (GDPR compliant). No cookies are set unless you configure them.

**Q: Can I track email addresses?**
A: Yes, but only if you identify users with `posthog.identify(email)`. By default, no personal data is collected.

**Q: How much does PostHog cost?**
A: Free tier includes 1M events/month. Perfect for most websites.

## Support
- PostHog Docs: https://posthog.com/docs
- Dashboard: https://app.posthog.com
- Help: support@posthog.com
