
# AgriNova – Frontend UI Plan

## Overview
Build the complete, stunning frontend for AgriNova as a React + Tailwind app with mock data, ready to connect to your Express/MongoDB backend. Modern startup-grade UI with glassmorphism, gradient dashboards, animations, and dark/light mode.

---

## Phase 1: Foundation & Landing Page

### Design System
- Custom color palette (greens, earth tones for agriculture theme)
- Dark/light mode toggle
- Glassmorphism card styles, gradient backgrounds
- Smooth page transitions using Framer Motion
- Skeleton loaders and toast notifications

### Landing Page
- Hero section with animated statistics counter (farmers helped, crops tracked, etc.)
- Feature highlights with icon cards
- Impact metrics section
- Demo preview / screenshots carousel
- Mock testimonials section
- Call-to-action for signup
- Responsive, mobile-first design

---

## Phase 2: Auth & Layout Shell

### Authentication Pages (UI only, mock logic)
- Login page with role selector (Farmer / Admin / Agronomist)
- Signup page with email verification UI
- Forgot password flow UI
- Modern form design with validation feedback

### App Layout Shell
- Sidebar navigation with icons (collapsible)
- Top header with notifications badge, profile avatar, dark mode toggle
- Breadcrumb navigation
- Role-based menu items (different nav for Farmer vs Admin vs Agronomist)

---

## Phase 3: Core Module UIs

### Smart Farmer Profile
- Profile form with all fields (personal details, farm location, land area, soil type, irrigation, crops)
- Profile completeness progress bar
- Crop history timeline
- Soil test report upload area
- AI recommendation cards (mock suggestions)

### AI Crop Recommendation
- Input form (soil type, season, rainfall, location dropdowns)
- Results display with charts (Recharts)
- Recommendation cards with confidence scores
- "External API ready" — structured to call your backend endpoint

### Real-Time Crop Price Intelligence
- Price cards by crop with trend indicators
- Historical price line charts (30-day trends)
- State-wise market comparison table
- Price prediction visualization (mock regression curve)

### Smart Grievance System
- Ticket submission form with file upload
- Ticket list with status badges (Pending → In Review → Resolved)
- Status tracking timeline UI
- Admin notes section
- Satisfaction rating component (post-resolution)

---

## Phase 4: Marketplace & Weather

### Agri Marketplace
- Product listing cards (image, price, quantity, farmer info)
- "List a Product" form
- Buyer request / negotiation chat UI (mock)
- Order tracking timeline
- Payment status badges

### Weather Intelligence
- 7-day forecast cards
- Rain and heatwave alert banners
- Crop advisory suggestions panel
- Weather data visualization charts

---

## Phase 5: Dashboards & Admin

### Farmer Dashboard
- Overview stats cards (animated counters)
- Crop success rate charts
- Income estimation visualization
- Yield prediction graphs
- Recent activity feed

### Admin Intelligence Dashboard
- Total farmers, active grievances, revenue stats cards
- Crop demand heatmap visualization
- Monthly growth line/bar charts
- Region-wise farmer distribution (mock map or chart)
- Farmer activity logs table
- Export buttons (PDF/CSV — UI only)

### Notification System
- Notification dropdown with badge counter
- Notification list with read/unread states
- Critical alert highlighting
- In-app notification center page

---

## Phase 6: Extras & Polish

### Additional Pages
- Farmer Community Forum UI (post list, thread view)
- AI Chat Assistant interface (chat bubble UI)
- Government Scheme Eligibility checker (form + results)
- Loan Eligibility Estimator (calculator UI)

### Final Polish
- All pages responsive and mobile-optimized
- Consistent animations and transitions throughout
- Loading states and error states for all views
- Mock data that looks realistic (Indian crop names, prices, locations)

---

## Data Strategy
All data will be mock/hardcoded JSON to make the UI fully functional for demo purposes. API service files will be structured with clear interfaces so you can swap mock data for real Express API calls with minimal changes.

## What You'll Build Separately (Outside Lovable)
- Express.js backend with all REST APIs
- MongoDB schemas and database logic
- JWT authentication logic
- File uploads (Multer/Cloudinary)
- Real AI/ML integrations
