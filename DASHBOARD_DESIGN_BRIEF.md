# Client Dashboard Design Brief

## Overview
Design a beautiful client dashboard for **Ethiopian Websites** that allows clients to track their project progress, view milestones, track invoices, and receive project updates. The dashboard should feel premium, professional, and aligned with the existing website aesthetic.

## Design System (Use These)

### Colors
- **Primary Black**: `#121212` - Headlines, main text
- **Gold**: `#C5A059` - Accent, highlights, CTAs, status badges
- **Gold Dark**: `#A8843E` - Hover states
- **Green**: `#006747` - Success states, completed items
- **Parchment**: `#F5F0E8` - Light background sections
- **Surface**: `#F8F9FA` - Secondary background
- **Dark**: `#1A1208` - Dark sections (optional)
- **Body Text**: `#3D3D3D` - Body copy
- **Muted**: `#7A7A7A` - Secondary text, disabled states
- **Hairline**: `#E0DBD3` - Borders, dividers
- **White**: `#FFFFFF` - Main background

### Typography
- **Headline Font**: `Hanken Grotesk` (Bold, confident)
  - Display XL: 64px, weight 700
  - Display LG: 52px, weight 700
  - Display MD: 36px, weight 600
  - Headline: 28px, weight 600
  
- **Body Font**: `Inter` (Clean, readable)
  - Body: 17px, weight 400
  - Subheading: 20px, weight 400
  
- **Mono Font**: `JetBrains Mono` (For labels, badges)
  - 11-13px, weight 500, uppercase, letter-spacing: 0.18em

### Design Elements from Website
- Rounded corners: 4px (small), 8px (medium), 9999px (pill-shaped)
- Sticky navigation with scroll state
- Fade-up animations on scroll
- Card-based layouts with hover elevation
- Premium spacing and breathing room
- Gold accent lines/borders on key sections

---

## Current UI Issues
The current dashboard UI has:
- Generic sidebar/tab navigation
- Basic card layouts with minimal hierarchy
- Weak visual hierarchy
- Uninspiring status badges
- Poor use of white space
- Doesn't reflect the premium feel of the main website

---

## Dashboard Structure & Features

### 1. Login Screen (Entry Point)
**User enters email or phone to access their dashboard**
- Clean, centered form
- Company branding
- Link to "Reserve Your Slot" for new clients
- Professional error messaging

### 2. Overview Tab (Dashboard Home)
**Client's project snapshot**
- Welcome card with client name & business
- Large project status indicator (visual, not just badge)
- 3 quick stat cards: Days Since Start | Milestones Done | Outstanding Invoices
- "Next Steps" card with contextual message based on project stage
- Logout button (subtle placement)

### 3. Project Tab
**Project details, milestones, progress**
- Project title & description
- Stage indicator
- **Progress Stepper**: 5-step visual progress (Discovery → Design → Development → Review → Launched)
  - Current step highlighted in gold
  - Completed steps show checkmark in green
  - Visual connecting lines between steps
- **Milestones Section**: Checklist-style
  - Each milestone: label, due date, completion status
  - Completed items fade/strikethrough
  - Visual indicators for overdue (red) vs upcoming (gold) vs completed (green)
- Stage notes from agency (text block)

### 4. Invoices Tab
**Payment tracking**
- **Invoice Summary Card**: Total due amount prominently displayed in gold
- **Invoice Cards**: 
  - Amount (large, bold)
  - Currency
  - Description
  - Due date
  - Status badge (Paid = green, Unpaid = gold, Overdue = red)
  - Clean, scannable layout
- Professional invoice styling (like a real invoice preview)

### 5. Updates Tab
**Project communication timeline**
- Chronological feed (newest first)
- Each update: 
  - Date & time
  - "Ethiopian Websites Team" label
  - Message body
  - Timeline line visual (left side with dot)
- Clean, readable, conversational tone

---

## Navigation

### For Desktop
- **Sidebar Navigation** (left side, 200-240px wide)
  - Sticky, follows scroll
  - 4 nav items (Overview, Project, Invoices, Updates)
  - Active state: gold left border + gold text
  - Hover: subtle gold background
  - Logo/client name at top (optional)
  - Logout button at bottom

### For Mobile
- **Horizontal Tab Navigation** (under header)
  - Scrollable or wrapped tabs
  - Active state: gold bottom border
  - Touch-friendly sizing

---

## Visual Hierarchy & Spacing

- **Use consistent spacing**: 16px, 24px, 32px, 48px gaps
- **Card design**: White backgrounds, subtle hairline borders, 8px corners
- **Elevated sections**: Parchment background for important sections
- **Accent lines**: Gold left borders on important cards (like the website does)
- **Icons**: Simple, minimal (consider SVG icons for status, milestones, etc.)
- **Emphasis**: Gold color for numbers/amounts, green for success, red for warnings

---

## Specific Component Requests

### Status Badges
- **Discovery** → Light gold background, dark gold text
- **Design** → Light gold background, dark gold text
- **Development** → Light gold background, dark gold text
- **Review** → Light gold background, dark gold text
- **Launched** → Light green background, dark green text
- **Paid** → Light green background, dark green text
- **Unpaid** → Light gold background, dark gold text
- **Overdue** → Light red background, dark red text

### Stat Cards
- White background, hairline border
- Label: small, muted, uppercase, mono font
- Value: large (32px+), gold color, bold headline font
- Hover: subtle shadow lift

### Milestone Items
- Checkbox (not input, just visual state)
- Label (fade if completed)
- Due date (small, muted)
- Completed = green checkmark inside circle
- Overdue = red indicator

### Invoice Cards
- Two-column layout: description left, amount right
- Amount in large bold gold numbers
- Currency label smaller, muted
- Status badge positioned clearly
- Divider line between invoices

### Timeline Updates
- Left border in gold (full timeline)
- Dot at each update point
- Date/time label small and muted
- Message body in regular text
- "Agency" label in gold

---

## Animation & Interactions

- Tab switches: Quick fade-in (200-300ms)
- Hover states on cards: Subtle shadow or background shift
- Loading states: Spinner or skeleton screens
- Error messages: Red text, with icon
- Success feedback: Green check, with message

---

## Responsive Design

- **Desktop**: Full sidebar navigation, cards in grid
- **Tablet**: Sidebar becomes top tabs, adjusted spacing
- **Mobile**: Full-width tabs, single column cards, touch-friendly spacing

---

## Inspiration References

Look at the existing **Ethiopian Websites** pages for design direction:
- `index.html`: Hero section, color usage, card layouts
- `portfolio.html`: Project showcase styling
- `contact.html`: Form design, sidebar info cards
- Color palette and typography consistency
- Premium but not over-designed aesthetic

---

## Key Goals

1. **Professional & Premium**: Should feel as good as the main website
2. **Clear Information Hierarchy**: Important metrics stand out
3. **Usable & Fast**: Quick scans for status, no clutter
4. **Consistent Branding**: Uses Ethiopian Websites colors, fonts, style
5. **Accessible**: Good contrast, readable fonts, clear labels
6. **Beautiful**: Gold accents, white space, smooth interactions

---

## Deliverables Needed

1. **High-fidelity mockups** (Figma/Adobe XD) for all 5 screens
2. **Mobile & Desktop variants**
3. **Component library** (status badges, cards, buttons, etc.)
4. **CSS/styling guide** (can be implemented by developer)
5. **Responsive behavior documentation**

---

## Current Tech Stack
- Vanilla HTML/CSS/JS (no frameworks)
- Responsive CSS Grid & Flexbox
- PostHog Analytics integrated
- Vercel deployment

---

**The goal: Make this dashboard something clients are proud to use, that feels as premium as the Ethiopian Websites brand.**
