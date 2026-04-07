# Admin Authentication & Dashboard Documentation

## 🔐 Admin Credentials

| Field | Value |
|-------|-------|
| **Email** | abhayingle21@gmail.com |
| **Password** | abhay@1234 |
| **Role** | admin |

---

## 🔑 Authentication Flow

### 1. **Admin Login Process**

```
┌─────────────────────────────────────────────────────────────┐
│ Step 1: Admin enters credentials on Login page              │
│ - Email: abhayingle21@gmail.com                             │
│ - Password: abhay@1234                                      │
│ - Role: Select "Admin" from dropdown                        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 2: Frontend sends POST request to backend              │
│ POST /api/auth/login                                        │
│ Body: { email, password, role: "admin" }                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 3: Backend validates credentials                       │
│ - Check if role === "admin"                                 │
│ - Validate email === ADMIN_EMAIL                            │
│ - Validate password === ADMIN_PASSWORD                      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 4: Generate JWT Token                                  │
│ - Sign token with JWT_SECRET                                │
│ - Payload: { email, role: "admin" }                         │
│ - Expiry: 1 day (24 hours)                                  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 5: Store credentials in localStorage                   │
│ - localStorage.setItem("token", <JWT_TOKEN>)                │
│ - localStorage.setItem("userRole", "admin")                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 6: Redirect to Admin Dashboard                         │
│ - Route: /admin-dashboard or /admin/grievances              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📡 API Endpoints

### Admin Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "abhayingle21@gmail.com",
  "password": "abhay@1234",
  "role": "admin"
}
```

**Response (Success - 200)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "admin"
}
```

**Response (Error - 401)**
```json
{
  "message": "Invalid admin credentials"
}
```

---

## 🛡️ Token Management

### Token Storage
```javascript
// Login Success
localStorage.setItem("token", data.token);              // JWT Token
localStorage.setItem("userRole", data.role);           // "admin"
```

### Token Verification (Backend Middleware)
```javascript
// Every protected request uses: Authorization header
Authorization: Bearer <JWT_TOKEN>

// Middleware extracts & verifies token
const token = req.headers.authorization?.split(" ")[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### Token Expiry
- **Duration**: 24 hours
- **After Expiry**: User must login again
- **Clear on Logout**: Remove all localStorage items

---

## 🔒 Access Control

### Admin Dashboard Protection

```typescript
// Check if user has proper role
const userRole = localStorage.getItem("userRole");
const token = localStorage.getItem("token");

if (userRole !== "admin") {
  navigate("/");  // Redirect unauthorized users
  return;
}
```

### Protected Routes
| Route | Role Required | Description |
|-------|---------------|-------------|
| `/admin-dashboard` | admin | Main admin panel |
| `/admin/grievances` | admin | View & manage all grievances |
| `/api/griviences/admin/all` | admin | Get all grievances API |
| `/api/griviences/:id/status` | admin | Update grievance status |

---

## 🛠️ Backend Configuration

### Environment Variables (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/agriportal
JWT_SECRET=AgriPortal_2024_SecureKey_a7f3b9e2c1d4m5n6o7p8q9r0s1t2u3v4
```

### Admin Credentials (Backend - auth.js)
```javascript
const ADMIN_EMAIL = "abhayingle21@gmail.com";
const ADMIN_PASSWORD = "abhay@1234";
```

⚠️ **Security Note**: Consider moving these to environment variables:
```env
ADMIN_EMAIL=abhayingle21@gmail.com
ADMIN_PASSWORD=abhay@1234
```

---

## 📋 Admin Dashboard Features

### 1. Grievance Management Table

| Column | Description |
|--------|-------------|
| **Farmer** | Name & email of the farmer who filed grievance |
| **Issue** | Title of the grievance |
| **Mobile** | Farmer's contact number |
| **Status** | Current status (Pending/In Progress/Resolved) |
| **Action** | Button to select and edit grievance |

### 2. Grievance Update Panel

When a grievance is selected, admin can:
- View full grievance details (description, images)
- Update status with dropdown menu
- Add admin notes
- Save changes

### 3. Status Flow

```
Pending ──→ In Progress ──→ Resolved
```

---

## 🔑 Logout

```typescript
// Clear all auth data
localStorage.removeItem("token");
localStorage.removeItem("userRole");

// Redirect to home
navigate("/");
```

---

## 📱 Frontend Integration

### Login Component Usage
```typescript
<Select
  onValueChange={(value) => setRole(value)}
  defaultValue="farmer"
>
  <SelectTrigger>
    <SelectValue placeholder="Select Role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="farmer">Farmer</SelectItem>
    <SelectItem value="admin">Admin</SelectItem>
  </SelectContent>
</Select>
```

### Protected Page Example
```typescript
useEffect(() => {
  const userRole = localStorage.getItem("userRole");
  
  if (userRole !== "admin") {
    navigate("/");  // Not authorized
    return;
  }
  
  // Proceed with admin operations
}, []);
```

---

## 🔓 Authentication Check Points

| Check Point | Purpose |
|------------|---------|
| **Role Selection** | Determine if logging in as admin or farmer |
| **Credentials Validation** | Verify email & password match admin credentials |
| **Token Generation** | Create secure JWT token |
| **StorageStorage** | Persist token for future requests |
| **Route Protection** | Block unauthorized access to admin pages |
| **API Authorization** | Include token in API request headers |

---

## 🚀 Testing Admin Access

### Steps to Test:
1. Go to Login page (`/login`)
2. Select role: **Admin**
3. Enter email: **abhayingle21@gmail.com**
4. Enter password: **abhay@1234**
5. Click "Login"
6. Should redirect to admin dashboard showing all grievances
7. Can select grievances and update their status

---

## 📊 Database Model

### User Model (Farmer Signup)
```javascript
{
  name: String,
  email: String,
  password: String (hashed with bcrypt),
  role: "farmer"  // Default role
}
```

### Admin Login
```javascript
// Direct credential check (not from database)
if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
  // Generate token for admin
}
```

---

## ⚠️ Security Recommendations

1. **Move admin credentials to DB**: Instead of hardcoded values, store admin users in database with hashed passwords
2. **Use environment variables**: Move ADMIN_EMAIL and ADMIN_PASSWORD to .env
3. **Add rate limiting**: Prevent brute force attacks on login endpoint
4. **Implement refresh tokens**: Use refresh token for longer sessions
5. **Enable HTTPS**: Use SSL/TLS in production
6. **Add 2FA**: Implement two-factor authentication for admin accounts
7. **Log login attempts**: Track failed login attempts for security audits

---

## 📞 Support Contacts

| Role | Email | Purpose |
|------|-------|---------|
| **Admin** | abhayingle21@gmail.com | Admin login credentials |

---

## 📝 Notes
- JWT tokens expire after 24 hours
- Admin must use valid credentials to login
- All admin actions are restricted to users with "admin" role
- Farmer accounts are created via signup, admin account is hardcoded
