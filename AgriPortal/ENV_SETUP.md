# Frontend Environment Configuration Guide

## 🚀 Backend Integration Setup

Your frontend is now configured to connect to your Render-deployed backend.

### Environment Files Created

1. **`.env`** - Documentation reference (commit to repo)
   - Shows default environment variables
   - For reference only

2. **`.env.local`** - Development configuration (DO NOT COMMIT)
   - Used for local development
   - Contains: `VITE_API_URL=https://agriportal-1-hkp4.onrender.com`

3. **`.env.production`** - Production build configuration (DO NOT COMMIT)
   - Used when building for production
   - Contains: `VITE_API_URL=https://agriportal-1-hkp4.onrender.com`

### Configuration File Created

**`src/config/api.ts`** - Centralized API URL export
```typescript
const API: string = import.meta.env.VITE_API_URL as string;
export default API;
```

## ✅ Files Updated

All components now use the centralized API configuration:

- ✅ `src/pages/AdminDashboard.tsx`
- ✅ `src/pages/AdminGrievances.tsx`
- ✅ `src/pages/GovernmentSchemes.tsx`
- ✅ `src/pages/GrivienceSystem.tsx`
- ✅ `src/pages/Login.tsx`
- ✅ `src/pages/Profile.tsx`

### What Changed

**Before:**
```typescript
const res = await fetch("http://localhost:5000/api/griviences/admin/all");
```

**After:**
```typescript
import API from "@/config/api";
const res = await fetch(`${API}/api/griviences/admin/all`);
```

## 📋 How to Use

### For Local Development
```bash
# The .env.local file is automatically used
npm run dev
```

### For Production Build (Vercel)
```bash
# The .env.production file is automatically used
npm run build
# This creates an optimized build in the dist/ folder
```

### For Vercel Deployment

1. Push your changes to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically detect `.env.production`
4. The build will use `VITE_API_URL=https://agriportal-1-hkp4.onrender.com`

**Or manually add to Vercel:**
- Go to Project Settings → Environment Variables
- Add: `VITE_API_URL` = `https://agriportal-1-hkp4.onrender.com`

## 🔒 Security Notes

- `.env.local` and `.env.production` are listed in `.gitignore`
- These files are NOT committed to the repository
- Each environment can have different configurations
- Vercel will use its own environment variables (if configured) or `.env.production`

## 🌐 Backend URL

**Current Backend:** `https://agriportal-1-hkp4.onrender.com`

To change the backend URL:
1. Update `.env.local` for local development
2. Update `.env.production` for production builds
3. Or add `VITE_API_URL` to Vercel's environment variables

## 🧪 Testing

To verify the setup is working:

```bash
# Start local development
npm run dev

# Check browser console (F12) for API calls
# You should see requests to: https://agriportal-1-hkp4.onrender.com/api/...
```

## 📚 Additional Resources

- [Vite Environment Variables Documentation](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Render Backend Deployment](https://render.com/docs)
