# Client Dashboard — Overview Tab Design Brief

## Overview
Redesign the **Overview tab** of the client dashboard to be a simple, clean, single-screen hub where clients can:
1. View their orders/requests and create new ones
2. See their payment status at a glance
3. Chat with their programmer in real-time

The design should feel **premium but minimal** — no clutter, easy to scan, inviting interaction.

---

## Design System (Reuse from Main Website)

### Colors
- **Primary Black**: `#121212` — Headlines, labels
- **Gold**: `#C5A059` — Accents, active states, CTAs
- **Gold Dark**: `#A8843E` — Hover states, darker text on light
- **Green**: `#006747` — Success, completed status
- **Surface**: `#F8F9FA` — Light backgrounds, cards
- **Parchment**: `#F5F0E8` — Warm light sections
- **White**: `#FFFFFF` — Main background
- **Body Text**: `#3D3D3D` — Body copy
- **Muted**: `#7A7A7A` — Secondary text, disabled
- **Hairline**: `#E0DBD3` — Borders, dividers
- **Red**: `#D32F2F` — Error, overdue

### Typography
- **Headline Font**: `Hanken Grotesk` (Bold, confident)
  - Page title: 36px, weight 600
  - Section title: 24px, weight 600
  - Card title: 18px, weight 600

- **Body Font**: `Inter` (Clean, readable)
  - Body: 16px, weight 400
  - Secondary: 14px, weight 400
  - Small: 12px, weight 400

- **Mono Font**: `JetBrains Mono` (Labels, badges)
  - 11-12px, weight 500, uppercase, letter-spacing: 0.18em

### Spacing
- Base unit: 8px
- Padding/margin: 16px, 24px, 32px, 48px
- Gap between sections: 40px

### Corners
- Small buttons/badges: 4px
- Cards: 8px
- Pills: 9999px

---

## Layout Structure

### Desktop (1200px+)
```
┌─────────────────────────────────────────────────┐
│ Fixed Sidebar (240px)  │  Main Content Area     │
│                        │                        │
│  • Overview (active)   │  [Welcome Card]        │
│  • Project             │  ────────────────      │
│  • Invoices            │  [My Orders Section]   │
│  • Updates             │  [Payments Section]    │
│                        │  [Chat Section]        │
│  [Sign Out]            │                        │
└─────────────────────────────────────────────────┘
```

**Main content area:**
- Max-width: 900px, centered
- Padding: 48px (top/bottom), 32px (left/right)
- Scrollable

### Tablet (768px - 1199px)
- Sidebar collapses to horizontal tabs under header
- Tabs: Overview, Project, Invoices, Updates
- Active state: gold bottom border
- Content padding: 32px

### Mobile (< 768px)
- No sidebar; horizontal tabs at top
- Tabs full-width, scrollable horizontally
- Content padding: 16px
- All sections stack vertically
- Chat height: 200px (instead of 280px)

---

## Components & Sections

### 1. Welcome Card
**Purpose:** Friendly greeting with client context

**Layout:** Single card, full-width
- Headline: "Welcome back, [Client Name]"
- Subtext: "[Business Name]" — secondary text in muted color
- Background: `#FFFFFF` with light hairline border (optional)
- Padding: 32px
- Corner: 8px

**Spacing below:** 40px

---

### 2. My Orders Section

**Header Row:**
- Left: `<h3>My Orders</h3>` (24px, Hanken Grotesk, weight 600)
- Right: Button `+ New Request` (Gold background, white text, 4px corner, 10px padding)

**Order Cards (List below header):**

**Empty state:** If no orders, show centered message "No orders yet. Ready to get started?" with "+ New Request" button

**Card Layout (each order):**
- Container: white background, hairline border, 8px corner, 16px padding
- Hover: subtle shadow lift (0 4px 12px rgba(0,0,0,0.08))

**Content grid (responsive):**
- **Desktop:** 3 columns — Title | Status Badge | Date
- **Tablet/Mobile:** Stack vertically — Title at top, Status badge + Date below

**Fields:**
- **Title** (left): `[Order Name]` — 18px, weight 600, black
- **Status Badge** (center/inline): 
  - `pending` → Gold background (`#E8DFC7`), dark gold text (`#A8843E`), 4px corner, 8px padding
  - `in_progress` → Gold background (`#E8DFC7`), dark gold text (`#A8843E`)
  - `completed` → Green background (`#C8E6C9`), dark green text (`#006747`)
  - Mono font, 11px, uppercase, letter-spacing 0.18em
- **Date** (right): `Jan 15, 2025` — 12px, muted color

**Spacing:**
- Gap between cards: 8px
- Below section: 40px

---

### 3. Payments Section

**Header:**
- `<h3>Payments</h3>` (24px, Hanken Grotesk, weight 600)

**Empty state:** "No invoices. You're all caught up!"

**Invoice List:**

Each row (horizontal layout):
- **Desktop:** 4-column grid — Description | Amount | Status | Due Date
- **Tablet:** 3-column — Description (wider) | Amount | Status
- **Mobile:** Stack — Description, Amount, Status, Due Date (vertically)

**Invoice Row Styling:**
- Padding: 16px 0
- Border-bottom: 1px hairline (last row no border)
- Hover on mobile: slight background shift

**Fields:**
- **Description** (left, flex-grow): 
  - Line 1: `[Invoice description]` — 16px, weight 600, black
  - Line 2: (optional) — 12px, muted
  
- **Amount** (center):
  - Large number: `15,000` — 24px, weight 600, **Gold color** (`#C5A059`)
  - Below: `ETB` — 12px, muted
  
- **Status Badge** (right):
  - `paid` → Green background, green text
  - `unpaid` → Gold background, gold text
  - `overdue` → Red background (`#FFCDD2`), red text (`#D32F2F`)
  - Mono font, 11px, uppercase
  
- **Due Date** (far right):
  - `Due Jan 20` — 12px, muted

**Below section:** 40px

---

### 4. Chat Section

**Header:**
- `<h3>Chat with your Programmer</h3>` (24px, Hanken Grotesk)

**Chat Container:**
- Background: `#F8F9FA` (surface)
- Border: 1px hairline
- Corner: 8px
- Padding: 16px
- Height: 280px desktop / 200px mobile
- Overflow-y: auto
- Display: flex, flex-direction column, gap 12px

**Chat Bubbles:**

**Agency/Programmer Message (left-aligned):**
- Max-width: 72%
- Label above (12px, mono, uppercase, `#A8843E` gold dark): "Programmer"
- Bubble body:
  - Background: `#F8F9FA` (light surface)
  - Text: `#3D3D3D` (body)
  - Padding: 10px 14px
  - Corner: 8px
  - Font: 15px, Inter, weight 400
  - Timestamp (optional): 11px, muted, below or right-aligned

**Client Message (right-aligned):**
- Max-width: 72%
- Label above (12px, mono, uppercase, `#7A7A7A` muted): "You"
- Bubble body:
  - Background: `#121212` (primary black)
  - Text: `#FFFFFF` (white)
  - Padding: 10px 14px
  - Corner: 8px
  - Font: 15px, Inter, weight 400
  - Timestamp (optional): 11px, muted in white text

**Auto-scroll:** Chat always scrolls to bottom when new message arrives

**Input Row (below chat box):**
- Display: flex, gap 8px
- **Text input:**
  - Placeholder: "Type a message…" — muted color
  - Padding: 10px 14px
  - Border: 1px hairline
  - Corner: 8px
  - Font: Inter, 15px
  - Focus: border color changes to gold, no outline
  - Flex: 1 (grows)
  
- **Send Button:**
  - `Send` or `→` (arrow icon)
  - Background: `#121212` (primary)
  - Text: white
  - Padding: 10px 16px
  - Corner: 4px
  - Font: mono, 11px, uppercase
  - Hover: slightly darker or lifted shadow
  - On Enter key: also triggers send

---

### 5. New Request Modal

**Trigger:** "+ New Request" button in My Orders header

**Modal Overlay:**
- Background: `rgba(0, 0, 0, 0.4)` (semi-transparent)
- Centered on screen
- Z-index: high

**Modal Box:**
- Background: white
- Width: 100%, max-width 440px
- Corner: 8px
- Padding: 32px
- Box-shadow: 0 8px 32px rgba(0,0,0,0.12)
- Display: flex flex-direction column, gap 16px

**Fields:**
- **Title:** `<h3>New Request</h3>` (24px, Hanken Grotesk, weight 600)

- **Input 1 (Title):**
  - Label: "What do you need?" (14px, weight 600, black)
  - Input: full-width, placeholder, 10px 14px padding, hairline border, 8px corner
  - Font: Inter, 15px
  - Focus: gold border

- **Textarea (Description):**
  - Label: "More details (optional)" (14px, weight 600, black)
  - Textarea: full-width, 100px height (min), 10px 14px padding, hairline border, 8px corner
  - Font: Inter, 15px
  - Resize: vertical only
  - Focus: gold border

- **Action Buttons (bottom):**
  - Display: flex, justify-content flex-end, gap 8px
  - `Cancel` → Ghost button (white bg, black border, black text)
  - `Submit` → Gold button (gold bg, white text)
  - Both: 10px 20px padding, 4px corner, mono font uppercase

---

## States & Interactions

### Hover States
- **Order card:** Shadow lift, background stays white
- **Payment row:** Slight background shift to `#FAFAFA`
- **Chat bubble:** None (static)
- **Buttons:** Darker shade or shadow lift
- **Text input:** Gold border on focus

### Loading State (during API calls)
- **Submitting new request:** Button shows spinner / disabled state
- **Sending message:** Input disables, shows small spinner next to button
- **Chat polling:** No visible loading (happens silently every 10s)

### Success State
- **New request submitted:** Modal closes, new order appears in list with "pending" badge
- **Message sent:** Message appears immediately in chat (optimistic), then confirmed when API responds
- **Error:** Toast notification or inline error message near button

### Empty States
- **No orders yet:** "No orders yet. Ready to get started?" centered, 60px height, with "+ New Request" button
- **No messages:** Chat box empty, ready for first message
- **No payments:** "You're all caught up!" — centered message

---

## Animation & Transitions

- **Tab switch:** Fade-in 200ms on new section
- **Modal open:** Fade-in 150ms, slight scale-in (0.95 → 1)
- **Modal close:** Fade-out 150ms
- **New order appears:** Slide-in from top 300ms
- **New chat message:** Fade-in 150ms, auto-scroll smooth
- **Button hover:** 100ms ease

---

## Responsive Breakpoints

### Desktop (1200px+)
- Sidebar: 240px fixed on left
- Content: max-width 900px, centered
- Chat height: 280px
- Order cards: 3-column grid layout
- Payment rows: 4-column grid

### Tablet (768px - 1199px)
- Sidebar → Horizontal tabs under header
- Content: full-width with 32px padding
- Chat height: 240px
- Order cards: 2-column grid
- Payment rows: 3-column grid

### Mobile (< 768px)
- No sidebar; horizontal tabs scrollable
- Content: full-width with 16px padding
- Chat height: 200px
- Order cards: single column, full-width
- Payment rows: single column, stacked

---

## Copy Guidelines

- **Friendly, conversational tone**
- **Placeholders:** "What do you need?" not "Enter request title"
- **Status labels:** `Pending`, `In Progress`, `Completed` (capitalized, not all-caps in headers)
- **Button text:** "Submit", "Cancel", "Send" (short, clear)
- **Empty states:** Encouraging tone, call to action

---

## Reference

This design reuses the **Ethiopian Websites design system**. For color palette, typography, and spacing, refer to:
- Main website `index.html`, `portfolio.html`, `contact.html`
- Existing CSS variables in `src/style.css`
- This brief's color hex codes match the website brand

**Goal:** Make the Overview tab feel as premium and polished as the main website, but focused and minimal with zero distraction.

---

## Deliverables Needed

1. **Desktop mockup** (1200px) — Full page with all 4 sections visible
2. **Tablet mockup** (768px) — Tabs visible, chat smaller
3. **Mobile mockup** (375px) — Stacked sections, vertical tabs
4. **Component states:** 
   - Order card (pending, in_progress, completed)
   - Invoice row (paid, unpaid, overdue)
   - Chat bubble (agency left, client right)
   - Modal (open/closed)
   - Input states (default, focus, disabled, error)
5. **Interaction specs:**
   - Modal open/close animation
   - Tab switch behavior
   - Chat auto-scroll behavior
   - Button hover/active states

---

**Design Principle:** Simple. Clean. Functional. Let the content breathe. Gold accents for actions and status. Minimal borders. Premium feel, zero clutter.
