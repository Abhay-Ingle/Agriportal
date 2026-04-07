# Quick Reference Guide

## 🚀 New Routes & Pages

| Feature | Route | Component File | Purpose |
|---------|-------|---------------|---------|
| **Farmer Registration** | `/farmer-registration` | FarmerRegistration.tsx | 3-step farmer profile creation |
| **Government Schemes** | `/government-schemes` | GovernmentSchemes.tsx | Browse 8+ government schemes with search & filter |
| **Updated Login** | `/login` | Login.tsx | Farmer/Admin login (simplified) |
| **Updated Home** | `/` | Index.tsx | Homepage with new CTA buttons |

---

## 📑 File Changes Summary

### New Files Created:
✅ `src/pages/FarmerRegistration.tsx` (550 lines)  
✅ `src/pages/GovernmentSchemes.tsx` (500+ lines)  
✅ `FARMER_REGISTRATION_AND_SCHEMES.md` (Documentation)  

### Files Updated:
✅ `src/App.tsx` - Added 2 new routes  
✅ `src/pages/Login.tsx` - Removed signup, simplified to login-only  
✅ `src/components/landing/Navbar.tsx` - Added navigation links  
✅ `src/components/landing/CTASection.tsx` - Added 2 CTA buttons

---

## 🎯 Key Features Breakdown

### Farmer Registration (`/farmer-registration`)

#### Step 1: Personal Information
```
First Name* | Last Name*
Email* | Phone*
Date of Birth* | Gender*
```

#### Step 2: Address & Farm Details
```
ADDRESS (Required):
  Address* | City* | District* | State* | Pincode*

FARM INFO (Optional):
  Total Land Area | Irrigated Area | Rain-fed Area
  Soil Type | Crops Grown | Farming Method
```

#### Step 3: Review & Submit
- Display all information
- Review before submission
- Submit to backend/localStorage

### Government Schemes (`/government-schemes`)

#### 8 Schemes Included:
1. **PM-KISAN** - ₹6,000/year financial aid
2. **Fasal Bima Yojana** - Crop insurance
3. **Kusum Yojana** - Solar pumps (90% subsidy)
4. **Agri-Mission** - Technology adoption (50-75% subsidy)
5. **Soil Health Card** - Free soil testing
6. **Paramparagat - Organic Farming** - ₹50,000/hectare
7. **Deen Dayal Upadhyaya** - Rural electrification
8. **PM-AASHA** - Price support & MSP

#### Interactive Features:
- 🔍 Search by name/keyword
- 🏷️ Filter by 8 categories
- 📖 Expandable details for each
- 🌐 Direct links to official websites

---

## 👨‍🌾 User Workflows

### Workflow 1: New Farmer Registration
```
Homepage
  ↓ (Click "Register as Farmer")
Farmer Registration (Step 1)
  ↓ (Fill personal info)
Farmer Registration (Step 2)
  ↓ (Fill address + optional farm details)
Farmer Registration (Step 3)
  ↓ (Review all info)
Success Toast → Auto-redirect to Login
  ↓ (Wait 2 seconds)
Login Page (Ready to login)
```

### Workflow 2: Browse Government Schemes
```
Homepage
  ↓ (Click "Explore Schemes" OR navbar "Schemes")
Government Schemes Page
  ↓ (View all 8 schemes)
Search/Filter Schemes
  ↓ (Find relevant schemes)
Click "+" to Expand Details
  ↓ (View eligibility, benefits, how to apply)
"Visit Official Website" Button
  ↓ (Opens government portal in new window)
Apply Online
```

### Workflow 3: Admin vs Farmer Login
```
Login Page
  ↓ (Select Role)
  
  Farmer Path:
    Email* | Password*
    ↓ (Submit)
    Profile Page (farmer dashboard)
    
  Admin Path:
    Email: abhayingle21@gmail.com*
    Password: abhay@1234*
    ↓ (Submit)
    Admin Dashboard (grievance management)
```

---

## 🎨 Component Structure

### FarmerRegistration.tsx Structure:
```
FarmerRegistration
├── Header (Title + Icon)
├── Progress Indicator (Step 1/2/3)
├── Card (Main Form Container)
  ├── If Step 1:
  │   ├── Personal Info Form
  │   └── Next Button
  ├── If Step 2:
  │   ├── Address Section
  │   ├── Farm Details Section
  │   └── Back/Next Buttons
  └── If Step 3:
      ├── Review Sections
      ├── Terms Notice
      └── Back/Submit Buttons
└── Footer (Login Link)
```

### GovernmentSchemes.tsx Structure:
```
GovernmentSchemes
├── Header (Title + Icon)
├── Search Bar + Filter Dropdown
├── Results Counter
├── Schemes Grid
  └── For Each Scheme:
      ├── Header (Title, Desc, Badges)
      ├── Expand/Collapse Button
      └── If Expanded:
          ├── Benefits Section
          ├── Eligibility Section
          ├── Application Info
          └── Official Website Link
├── Empty State (If no results)
└── Info Sections (Help + Contact)
```

---

## 🔗 Navigation Updates

### Navbar Links Changed:
```OLD
Features | Impact | Testimonials | [Log in] [Get Started]

NEW
Features | Impact | Testimonials | Schemes | [Register] [Schemes] [Login]
```

### CTA Section Changed:
```OLD
[Get Started Free →]

NEW
[Register as Farmer →] [Explore Schemes]
```

### Mobile Menu:
```
Features
Impact
Testimonials
Schemes
---
[Register as Farmer]
[Login]
```

---

## 📊 Data Structures

### FarmerProfile (from FarmerRegistration):
```typescript
{
  basicInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
  },
  addressInfo: {
    address: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  },
  farmInfo: {
    totalLandArea: string;
    irrigatedArea: string;
    rainFedArea: string;
    soilType: string;
    crops: string;
    farmingMethod: string;
  },
  registeredAt: string;
}
```

### Scheme (from GovernmentSchemes):
```typescript
{
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  ministry: string;
  launchYear: number;
  targetBenefit: string;
  applicationMethod: string;
  officialWebsite: string;
  scheme_color: string;
}
```

---

## 🎯 URL Pattern Guide

### Main Features:
- `/` - Homepage
- `/login` - Login/Admin Login
- `/farmer-registration` - Farmer Registration (NEW)
- `/government-schemes` - Government Schemes (NEW)

### User Authenticated:
- `/profile` - Farmer Profile/Dashboard
- `/admin-dashboard` - Admin Dashboard

### Other Features:
- `/ai-crop-advisor` - AI Crop Advisor
- `/price-intelligence` - Price Intelligence
- `/grievance-system` - Grievance System
- `/agri-marketplace` - Agri Marketplace
- `/weather-intel` - Weather Intelligence
- `/smart-dashboard` - Smart Dashboard
- `/community-forum` - Community Forum
- `/alert-system` - Alert System
- `/admin/grievances` - Manage Grievances (Admin)

---

## ⚠️ Important Notes

1. **Farmer Registration:**
   - Currently saves to `localStorage`
   - Ready to connect to backend API
   - Validation on each step
   - No database connection yet

2. **Government Schemes:**
   - Static data (8 schemes)
   - Can be expanded with more schemes
   - Links open in new window
   - Search/filter is client-side

3. **Login Changes:**
   - Removed signup from login page
   - Redirect new users to `/farmer-registration`
   - Simplified to login-only
   - Still supports both Farmer & Admin roles

4. **Navigation:**
   - All navbar links functional
   - Mobile menu tested
   - Responsive on all devices
   - New routes integrated in App.tsx

---

## ✅ Testing Checklist

### Farmer Registration:
- [ ] All 3 steps load correctly
- [ ] Form validation works
- [ ] Back button navigates properly
- [ ] Data persists while navigating
- [ ] Submit button shows loading state
- [ ] Success notification appears
- [ ] Redirects to login after 2 seconds
- [ ] Mobile layout responsive

### Government Schemes:
- [ ] All 8 schemes display
- [ ] Search filters correctly
- [ ] Category dropdown works
- [ ] Expand/collapse works
- [ ] Official links open in new window
- [ ] Mobile layout responsive
- [ ] No console errors

### Navigation:
- [ ] All nav links work
- [ ] Mobile menu opens/closes
- [ ] CTA buttons functional
- [ ] Routes don't have 404
- [ ] Redirects work correctly

---

## 🚀 Quick Start

1. **View Farmer Registration:**
   - Click "Register as Farmer" on homepage

2. **View Government Schemes:**
   - Click "Explore Schemes" on homepage

3. **Direct Links:**
   - `/farmer-registration`
   - `/government-schemes`

---

Last Updated: April 7, 2026
