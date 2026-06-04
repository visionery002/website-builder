# Executive Portal Dashboard — Setup Guide

## What's New

Your dashboard has been completely redesigned with a **clean, premium interface** featuring:

✅ **My Orders** — Clients create & track service requests
✅ **Payments** — View invoices with status tracking
✅ **Chat** — Direct messaging with the programmer
✅ **Professional UI** — Sidebar nav, responsive design, Tailwind CSS

---

## Database Setup

### 1. Run the Migration

The new `requests` table is already added to `initDb.js`. Run:

```bash
npm run init-db
```

Or manually in **Supabase SQL Editor**, paste and run:

```sql
-- Create requests table
CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    client_id INT REFERENCES clients(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(30) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add seed data
INSERT INTO requests (client_id, title, status, created_at)
VALUES
  (1, 'Add a contact form to the homepage', 'in_progress', CURRENT_TIMESTAMP - INTERVAL '2 days'),
  (1, 'Fix mobile menu on iOS', 'completed', CURRENT_TIMESTAMP - INTERVAL '5 days'),
  (2, 'Update company logo', 'pending', CURRENT_TIMESTAMP - INTERVAL '1 day')
ON CONFLICT DO NOTHING;
```

---

## API Endpoints

### New Endpoints Created

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/requests` | Create a new request |
| POST | `/api/messages` | Send a message (chat) |

### Updated Endpoint

| Method | Path | Returns |
|--------|------|---------|
| GET | `/api/dashboard?clientId=X` | Now includes `requests` array |

### Files Created

- `api/requests.js` — POST handler for new requests
- `api/messages.js` — POST handler for chat messages

### Files Modified

- `api/dashboard.js` — Added requests query
- `initDb.js` — Added requests table + seed data
- `dashboard.html` — Complete redesign with new UI

---

## Testing the Dashboard

### 1. Run Dev Server

```bash
npm run dev
```

### 2. Open Dashboard

```
http://localhost:5173/dashboard.html
```

### 3. Login

- **Email/Phone:** `test@test.com` or `+251922222222`
- Sidebar nav appears on desktop
- Mobile tabs appear on small screens

### 4. Try Each Feature

**My Orders Section:**
- Click `+ New Request` button
- Fill in title (required) + description (optional)
- Submit → appears in list with "PENDING" status
- Existing test orders show different statuses

**Payments Section:**
- Shows all invoices for the client
- Color-coded badges: Green (paid), Gold (unpaid), Red (overdue)
- Displays amount in ETB, due date, description

**Chat Section:**
- Existing messages appear (agency left-aligned gold, client right-aligned dark)
- Type a message → click Send (or press Enter)
- Message sent as `from_agency = false` in DB
- New messages appear every 10 seconds (polling)

---

## Features Explained

### 1. Orders / Requests
- Clients can request anything (new features, edits, designs, etc.)
- Status options: `pending`, `in_progress`, `completed`
- Agency can update status in Supabase directly (no admin UI yet)

### 2. Payments (Invoices)
- Displays all invoices tied to the client
- Status colors:
  - 🟢 **Green** = Paid
  - 🟡 **Gold** = Unpaid
  - 🔴 **Red** = Overdue
- Shows amount, currency, due date, description

### 3. Chat
- One-way polling (no WebSocket)
- Client messages stored with `from_agency = FALSE`
- Agency messages appear with label "Programmer"
- Messages auto-scroll to bottom

---

## Customization

### Change Colors
Edit the Tailwind config in `dashboard.html`:
```js
"gold-dark": "#A8843E",
"status-pending-bg": "#E8DFC7",
"status-success-bg": "#C8E6C9",
```

### Change Polling Interval
At bottom of `dashboard.html`, change:
```js
setInterval(() => {
  if (currentClientId && dashboardData) {
    loadDashboard();
  }
}, 10000);  // <- milliseconds (10s)
```

### Add More Sections
The layout supports sidebar nav with tabs for Project, Invoices, Updates (currently placeholders). Update the section IDs to add real content.

---

## Deployment

### Build for Production

```bash
npm run build
```

The bundled dashboard will be at `dist/dashboard.html`.

### Deploy to Vercel

Your API endpoints are already Vercel-compatible (serverless functions in `api/` folder).

---

## Next Steps (Optional)

1. **Admin Panel** — Allow agency to update request status, create invoices, post messages
2. **Real-time Chat** — Replace polling with WebSocket (Socket.io or similar)
3. **Payment Gateway** — Add Stripe/PayPal to invoice cards
4. **Authentication** — Replace URL-based access with proper auth tokens
5. **Notifications** — Email/SMS when client has new messages or payments due

---

## Troubleshooting

**Chat messages not appearing?**
- Check browser Network tab → `/api/dashboard` responses
- Verify `updates` table has `from_agency` column
- Check polling runs every 10s in browser console

**Orders not saving?**
- Verify `requests` table exists in Supabase
- Check `/api/requests` response in Network tab
- Ensure `clientId` is passed correctly

**Login fails?**
- Check Supabase has `clients` table with test email
- Verify environment variable `DATABASE_URL` is set
- Check `/api/verify` endpoint returns client data

---

That's it! Your clean, simple dashboard is ready. 🎉
