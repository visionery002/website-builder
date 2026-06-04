# Client Dashboard Setup & Usage

## Overview
The client dashboard is a new feature that allows individual clients to track their project status, see milestones, view invoices, and receive project updates.

## Files Added/Modified

### New Files
- **`dashboard.html`** — The client-facing dashboard page
- **`api/dashboard.js`** — Vercel serverless API endpoint to fetch dashboard data
- **`src/style.css`** — Added dashboard-specific CSS styles (sidebar, cards, progress stepper, etc.)

### Modified Files
- **`vite.config.js`** — Added `dashboard` entry point for multi-page build
- **`Backend/database.sql`** — Added 4 new tables (projects, milestones, invoices, updates)
- **`initDb.js`** — Updated with seeding for new tables + test data

## Database Schema

Four new tables have been added to your Supabase database:

### `projects`
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES clients(id),
  title VARCHAR(255),
  status VARCHAR(50),  -- 'discovery', 'design', 'development', 'review', 'launched'
  stage_notes TEXT,
  launch_date DATE,
  created_at TIMESTAMPTZ
);
```

### `milestones`
```sql
CREATE TABLE milestones (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id),
  label VARCHAR(255),
  completed BOOLEAN,
  due_date DATE
);
```

### `invoices`
```sql
CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES clients(id),
  amount NUMERIC(10,2),
  currency VARCHAR(10),  -- 'ETB', 'USD'
  status VARCHAR(30),    -- 'paid', 'unpaid', 'overdue'
  due_date DATE,
  description TEXT,
  created_at TIMESTAMPTZ
);
```

### `updates`
```sql
CREATE TABLE updates (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id),
  body TEXT,
  from_agency BOOLEAN,
  created_at TIMESTAMPTZ
);
```

## Setup Instructions

### 1. Run Database Migrations
First, initialize the new tables in your Supabase database:

```bash
npm run initDb  # or node initDb.js
```

This will create the 4 new tables and seed with test data (1 test client + project).

### 2. Build the Project
```bash
npm run build
```

The dashboard will be built to `dist/dashboard.html`.

### 3. Deploy to Vercel
Push your changes to your Vercel-connected repo. The API handler in `api/dashboard.js` will be deployed automatically.

## Using the Dashboard

### Access URL Format
```
https://your-domain.com/dashboard.html?clientId=1
```

Where `clientId` is the ID of the client in the `clients` table.

**Example:** If you have a client with `id=1`, share this link:
```
https://your-domain.com/dashboard.html?clientId=1
```

### Features

#### Overview Tab
- Welcome card with client name
- Current project status badge
- Quick stats: Days since start, Milestones completed, Outstanding invoices
- Next action card with contextual messaging

#### Project Tab
- Project title and current stage
- Progress stepper (Discovery → Design → Development → Review → Launched)
- Milestone checklist with due dates
- Stage notes from the agency

#### Invoices Tab
- Summary of total amount due
- List of all invoices with amount, due date, and status
- Status badges: Paid, Unpaid, Overdue

#### Updates Tab
- Timeline-style feed of agency messages
- Each update shows the date and message body
- Displays in reverse chronological order (newest first)

## Local Development

### Start Dev Server
```bash
npm run dev
```

Vite will serve the site at `http://localhost:5173`.

### Test the Dashboard
1. Visit `http://localhost:5173/dashboard.html?clientId=1`
2. Make sure your `.env` file has `DATABASE_URL` configured
3. The page will fetch data from the `/api/dashboard?clientId=1` endpoint
4. In dev mode, the API is at `http://localhost:5001/api/dashboard`

## Managing Client Data

### Adding a New Client & Project

Use any PostgreSQL client or the Supabase Studio UI:

```sql
-- 1. Insert a client
INSERT INTO clients (user_name, business_name, category, phone_number, gmail)
VALUES ('John Doe', 'John\'s Bakery', 'business_website', '+251911111111', 'john@bakery.com');

-- 2. Insert a project for that client
INSERT INTO projects (client_id, title, status, stage_notes)
VALUES (2, 'Johns Bakery Website', 'design', 'Designing homepage mockups');

-- 3. Add milestones
INSERT INTO milestones (project_id, label, completed, due_date)
VALUES 
  (2, 'Homepage Design', FALSE, '2024-06-15'),
  (2, 'Services Page', FALSE, '2024-06-22');

-- 4. Add invoices
INSERT INTO invoices (client_id, amount, currency, status, due_date, description)
VALUES (2, 10000, 'ETB', 'unpaid', '2024-06-10', '50% Deposit - Website Design');

-- 5. Post updates
INSERT INTO updates (project_id, body, from_agency, created_at)
VALUES (2, 'We have started working on your website. Homepage mockups coming next week!', TRUE, NOW());
```

### Updating Project Status
```sql
UPDATE projects SET status = 'development' WHERE id = 2;
```

## API Reference

### GET `/api/dashboard?clientId=<id>`

Returns all dashboard data for a client.

**Response:**
```json
{
  "client": {
    "id": 1,
    "user_name": "Abebe Kebede",
    "business_name": "Kebede Construction",
    "phone_number": "+251911111111",
    "gmail": "abebe@example.com",
    "created_at": "2024-06-01T10:30:00Z"
  },
  "project": {
    "id": 1,
    "client_id": 1,
    "title": "Kebede Construction Website",
    "status": "design",
    "stage_notes": "Currently designing the homepage",
    "launch_date": null,
    "created_at": "2024-06-01T10:30:00Z"
  },
  "milestones": [
    {
      "id": 1,
      "project_id": 1,
      "label": "Homepage Design",
      "completed": true,
      "due_date": "2024-05-28"
    }
  ],
  "invoices": [
    {
      "id": 1,
      "client_id": 1,
      "amount": 15000.00,
      "currency": "ETB",
      "status": "unpaid",
      "due_date": "2024-06-11",
      "description": "50% Deposit - Website Design"
    }
  ],
  "updates": [
    {
      "id": 1,
      "project_id": 1,
      "body": "We have started the design phase...",
      "from_agency": true,
      "created_at": "2024-06-02T14:20:00Z"
    }
  ]
}
```

## Styling

The dashboard uses the same design system as the rest of the site:
- Design tokens: Gold (`#C5A059`), Primary (`#121212`), Green (`#006747`)
- Fonts: Hanken Grotesk (headlines), Inter (body)
- Responsive layout: Works on mobile, tablet, and desktop

## Future Enhancements

1. **Authentication** — Add login (email/password or magic link) so clients can't access other clients' dashboards
2. **Payment Gateway** — Integrate Stripe or Telebirr for invoice payments
3. **File Uploads** — Allow clients to upload files (design approval, content, etc.)
4. **Email Notifications** — Notify clients when projects are updated
5. **Admin Panel** — Build an admin section to manage projects, invoices, and updates
