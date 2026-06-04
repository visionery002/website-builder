# Ethiopian Websites Dashboard - Design System (Imperial Minimalist)

## Core Theme
**Imperial Minimalist** - Premium, professional dashboard with:
- Expansive whitespace
- Restrained color palette  
- Parchment surfaces for high-importance sections
- Hairline borders for crisp architecture
- Subtle motion & fade-up transitions
- Gold accents for hierarchy

## Color Palette

### Primary Colors
- **Primary Black**: `#000000` or `#121212` - Headlines, dark text
- **Gold**: `#C5A059` - Primary accent, highlights
- **Gold Dark**: `#A8843E` - Hover states
- **Green**: `#006747` - Success, completed states

### Surfaces
- **White**: `#FFFFFF` - Main work surface
- **Parchment**: `#F5F0E8` - Elevated/important sections
- **Surface**: `#F8F9FA` - Secondary background
- **Surface Container**: `#f2ede5` - Card backgrounds

### Text & Borders
- **On Surface**: `#1d1c17` - Body text
- **On Surface Variant**: `#444748` - Secondary text
- **Body Text**: `#3D3D3D` - Regular copy
- **Muted**: `#7A7A7A` - Disabled, hints
- **Hairline**: `#E0DBD3` - Borders, dividers

### Status Colors
- **Success/Paid**: `#006747` (Green) + light: `#a0f4ca`
- **Warning/Unpaid**: `#775a19` (Gold/Brown) + light: `#fed488`
- **Error/Overdue**: `#ba1a1a` (Red) + light: `#ffdad6`

## Typography

### Fonts
- **Headlines**: `Hanken Grotesk` (Bold, geometric)
- **Body**: `Inter` (Clean, readable)
- **Labels/Badges**: `JetBrains Mono` (Technical, uppercase)

### Sizes & Styles
- **Display XL**: 64px, weight 700, Hanken, -0.02em spacing
- **Display LG**: 52px, weight 700, Hanken, -0.02em spacing
- **Display MD**: 36px, weight 600, Hanken
- **Headline**: 28px, weight 600, Hanken
- **Subheading**: 20px, weight 400, Inter
- **Body**: 17px, weight 400, Inter
- **Label (Caps)**: 12px, weight 500, JetBrains Mono, 0.18em spacing, uppercase
- **Mobile Headline**: 24px, weight 600, Hanken

## Spacing (8px Base Unit)
- **stack-xs**: 8px
- **stack-sm**: 16px
- **stack-md**: 24px
- **stack-lg**: 48px
- **stack-xl**: 64px
- **sidebar-width**: 240px
- **gutter**: 24px
- **margin-desktop**: 48px
- **margin-mobile**: 16px

## Shapes
- **Small (sm)**: 4px - Buttons, inputs
- **Medium (DEFAULT)**: 8px - Cards, components
- **Pill (full)**: 9999px - Status badges

## Component Styles

### Status Badges
- **Standard** (Discovery, Design, Dev, Review, Unpaid): 
  - Background: `#C5A059` at 10% opacity
  - Text: `#A8843E`
  - Padding: 8px 16px
  - Border radius: 9999px

- **Success** (Launched, Paid):
  - Background: `#006747` at 10% opacity
  - Text: `#006747`

- **Alert** (Overdue):
  - Background: `#ffdad6`
  - Text: `#B91C1C`

### Stat Cards
- Border: 1px `#E0DBD3`
- Padding: 24px
- Radius: 8px
- Label: 12px mono, uppercase, muted color
- Value: Display MD (36px), Gold color
- Hover: 2px gold bottom border + ambient shadow

### Progress Stepper
- Connecting line: 1px `#E0DBD3`
- Active node: 12px circle in Gold `#C5A059`
- Completed node: 12px circle in Green `#006747` with checkmark
- Upcoming node: 12px circle in Hairline color
- Nodes have 4px white inner dot

### Buttons
- **Primary**: 
  - Background: `#000000`
  - Text: `#FFFFFF`
  - Padding: 16px 28px
  - Radius: 4px
  - Font: Body bold

- **Secondary**:
  - Background: `#FFFFFF`
  - Border: 1px `#C5A059`
  - Text: `#C5A059`
  - Padding: 16px 28px
  - Radius: 4px

### Cards
- Background: `#FFFFFF` or `#f2ede5`
- Border: 1px `#E0DBD3`
- Radius: 8px
- Padding: 24px
- Shadow on hover: `0px 12px 24px rgba(26, 18, 8, 0.04)`

### Inputs
- Background: `#F8F9FA`
- Border: 1px `#E0DBD3`
- Radius: 4px
- Focus: 1px Gold border + subtle gold glow
- Font: Body 17px

## Layout

### Desktop
- **Sidebar**: Fixed 240px width on left
- **Main**: Remaining width with 48px margins
- **Grid**: 3-column for stat cards, responsive grid for others
- **Max Width**: 1440px container

### Mobile  
- **Sidebar**: Horizontal scrollable tabs below header
- **Main**: Full width with 16px margins
- **Grid**: Single column, stacked layout

## Shadows & Elevation
- **No shadow**: Default state
- **Ambient Shadow**: `0px 12px 24px rgba(26, 18, 8, 0.04)` - Hover state
- **Focus glow**: Gold at 10% opacity

## Animations
- **Fade-up**: Elements animate in on scroll
- **Transition duration**: 200-300ms
- **Hover lift**: Cards lift slightly on hover
- **Button press**: scale(0.97) on active

