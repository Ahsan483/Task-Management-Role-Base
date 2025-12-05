# 🎯 Complete Instructions: How to Run Backend & Frontend

This guide provides step-by-step instructions to run the entire Task Management System on your Windows machine.

---

## 📋 Prerequisites Check

Before starting, verify you have:
- [ ] Node.js 16 or higher installed
- [ ] npm 8 or higher installed
- [ ] 2 terminal windows available
- [ ] Ports 3000 and 4200 available

### Check Node and npm Version
```powershell
node --version    # Should show v16+
npm --version     # Should show 8+
```

---

## 🔧 Full Installation & Setup

### Step 1: Navigate to Project Root

```powershell
cd c:\Users\Assam\Desktop\Ahsan\task-managment\task-management
```

### Step 2: Install Root Dependencies

```powershell
npm install
```

⏳ **Wait for completion** (~1-2 minutes)

**Expected output:**
```
added 150+ packages
```

### Step 3: Install Backend Dependencies

```powershell
cd apps/api
npm install
cd ../..
```

⏳ **Wait for completion** (~2-3 minutes)

**Expected output:**
```
added 200+ packages
```

### Step 4: Install Frontend Dependencies

```powershell
cd apps/dashboard
npm install
cd ../..
```

⏳ **Wait for completion** (~3-5 minutes)

**Expected output:**
```
added 300+ packages
```

---

## 🚀 Running the Application

### Terminal 1: Start Backend Server

1. **Open Terminal 1** (PowerShell)
2. **Run these commands:**

```powershell
cd c:\Users\Assam\Desktop\Ahsan\task-managment\task-management
cd apps/api
npm run start:dev
```

3. **Expected output:**
```
[Nest] 12345 - 01/15/2024, 10:30:00 AM     LOG [NestFactory] Starting Nest application...
Backend running on http://localhost:3000
```

✅ **Backend is now running!**

### Terminal 2: Start Frontend Server

1. **Open Terminal 2** (NEW PowerShell window)
2. **Run these commands:**

```powershell
cd c:\Users\Assam\Desktop\Ahsan\task-managment\task-management
cd apps/dashboard
npm run start
```

3. **Expected output:**
```
✔ Compiled successfully with 0 warnings
✔ browser application bundle generated successfully (45.67 MB)
```

✅ **Frontend is now running!**

---

## 🌐 Access the Application

1. **Open your web browser**
2. **Go to:** `http://localhost:4200`
3. **You should see:** Login page with "Sign In" and "Create Account" buttons

---

## 📝 Create Your First Account

### Step 1: Register New User

1. Click **"Create Account"** link (bottom of login page)
2. Fill in the registration form:
   - **Name:** `John Doe`
   - **Email:** `john@example.com`
   - **Password:** `SecurePass123!`
   - **Organization:** `Acme Corporation`
3. Click **"Register"** button

✅ You should see: "Registration successful. Please login."

### Step 2: Login to Dashboard

1. Enter email: `john@example.com`
2. Enter password: `SecurePass123!`
3. Click **"Login"** button

✅ You should be redirected to the **Dashboard**

---

## ✨ Test Core Features

### Feature 1: Create a Task

1. In the Dashboard, click **"Create Task"** button
2. Fill in the form:
   - **Title:** `Setup Development Environment`
   - **Description:** `Install and configure all necessary tools`
   - **Category:** `Setup`
   - **Status:** `TODO`
3. Click **"Create"** button

✅ Task appears in the task list below

### Feature 2: Change Task Status

1. Find your newly created task in the list
2. Click the **Status Dropdown** (showing "TODO")
3. Select **"In Progress"**

✅ Status badge updates to "In Progress" (yellow color)

### Feature 3: Complete a Task

1. Click the status dropdown again
2. Select **"Done"**

✅ Status badge updates to "Done" (green color)

### Feature 4: Delete a Task

1. Find a task in the list
2. Click the **Red "Delete" button** on the right
3. Confirm deletion

✅ Task disappears from the list

### Feature 5: Create More Tasks

1. Create at least 3 tasks with different statuses
2. Notice the **Progress Bar** at the top updates

### Feature 6: View Audit Log

If you have Admin/Owner role:
1. Click **"Audit Log"** tab
2. See all user actions tracked:
   - User who performed the action
   - Action type (CREATE, UPDATE, DELETE)
   - Resource affected (Task, User, Organization)
   - Timestamp

---

## 🔑 Testing Different Roles

### Setup Multiple Test Accounts

Create 2-3 different user accounts with different roles:

1. **Account 1 - Owner**
   - Email: `owner@example.com`
   - Organization: Same as first account
   - Role: Owner (can see all tasks and audit logs)

2. **Account 2 - Admin**
   - Email: `admin@example.com`
   - Organization: Same
   - Role: Admin (can see all tasks and audit logs)

3. **Account 3 - Viewer**
   - Email: `viewer@example.com`
   - Organization: Same
   - Role: Viewer (can only see own tasks)

### Test RBAC (Role-Based Access Control)

**Login with Viewer account:**
- Should only see tasks they created
- Cannot see other users' tasks
- Cannot access Audit Log tab

**Login with Owner/Admin account:**
- Should see all organization tasks
- Can access Audit Log tab
- Can see who created each task

---

## 🐛 Troubleshooting

### Issue: Backend Won't Start

**Error:** `Port 3000 already in use`

**Solution:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Try again
npm run start:dev
```

### Issue: Frontend Won't Start

**Error:** `Port 4200 already in use`

**Solution:**
```powershell
# Find process using port 4200
netstat -ano | findstr :4200

# Kill the process
taskkill /PID <PID> /F

# Try again
npm run start
```

### Issue: Database File Missing

**Error:** Database doesn't exist or is corrupted

**Solution:**
```powershell
cd apps/api

# Delete old database
rm db.sqlite

# Restart backend (will create new database)
npm run start:dev
```

### Issue: Modules Not Found

**Error:** `Cannot find module '@nestjs/...'`

**Solution:**
```powershell
# Go to backend directory
cd apps/api

# Reinstall dependencies
rm -r node_modules
npm install

# Try again
npm run start:dev
```

### Issue: CORS Errors in Frontend

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**What it means:** Backend isn't allowing frontend to make requests

**Solution:**
1. Make sure backend is running (see Backend Server output)
2. Check `apps/api/src/main.ts` has `app.enableCors()`
3. Restart both frontend and backend

### Issue: Login Not Working

**Error:** `Invalid credentials` even with correct password

**Check:**
1. Is backend running? (Terminal 1)
2. Can you see `POST /auth/login` in backend terminal?
3. Check browser console (F12) for error details
4. Verify email/password are correct

---

## 📊 API Testing (Optional)

Test API endpoints directly using curl or Postman:

### Test 1: Register User
```powershell
$body = @{
    name = "Test User"
    email = "test@api.com"
    password = "Test123!"
    organizationId = 1
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

### Test 2: Login User
```powershell
$body = @{
    email = "test@api.com"
    password = "Test123!"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

### Test 3: Get Tasks (requires token)
```powershell
$headers = @{ Authorization = "Bearer <YOUR_JWT_TOKEN>" }

Invoke-WebRequest -Uri "http://localhost:3000/tasks" `
  -Method GET `
  -Headers $headers
```

---

## 🎓 Understanding the Architecture

### Backend Flow

```
User Request
    ↓
Angular Component
    ↓
Auth Service (localStorage)
    ↓
HTTP Request with JWT
    ↓
NestJS Controller
    ↓
JWT Guard (verify token)
    ↓
Roles Guard (check role)
    ↓
Service Layer (business logic)
    ↓
Database (TypeORM)
    ↓
Response back to Frontend
    ↓
NgRx Store (state update)
    ↓
Component Re-render
```

### Database Structure

```
Organizations (table)
    ├── Users (1:N)
    │   ├── Tasks (1:N)
    │   └── AuditLogs (1:N)
    └── Tasks (1:N)
```

### Authorization Levels

```
Public Routes:
├── POST /auth/register
└── POST /auth/login

Authenticated Routes (All JWT-protected):
├── GET /tasks
├── POST /tasks
├── PUT /tasks/:id/status
└── GET /users

Admin/Owner Only Routes:
└── GET /audit-log
```

---

## 📚 File Structure Overview

```
Backend:
apps/api/src/
├── auth/               ← Authentication & JWT
├── users/              ← User management
├── tasks/              ← Task management
├── organizations/      ← Organization management
├── audit/              ← Audit logging
└── app.module.ts       ← Root module

Frontend:
apps/dashboard/src/app/
├── services/           ← API services
├── store/              ← NgRx state management
├── pages/              ← Full page components
├── components/         ← Reusable components
└── guards/             ← Route protection
```

---

## ✅ Complete Workflow Checklist

Before considering setup complete:

- [ ] Backend running on port 3000
- [ ] Frontend running on port 4200
- [ ] Can access http://localhost:4200
- [ ] Can register new account
- [ ] Can login with new account
- [ ] Dashboard shows after login
- [ ] Can create a task
- [ ] Can change task status
- [ ] Can view task list
- [ ] Logout works properly
- [ ] Can login again
- [ ] Can see audit logs (if Admin/Owner)

---

## 🎉 Congratulations!

Your full-stack Task Management System is now running!

### What you can do now:

1. **Create Tasks** - Add tasks with titles and descriptions
2. **Manage Status** - Change tasks from TODO → IN_PROGRESS → DONE
3. **Track Progress** - See completion percentage
4. **View Audit Logs** - See who did what and when (Admin/Owner only)
5. **Multi-User** - Create multiple accounts and test RBAC

### Next Steps:

1. Explore the UI and all features
2. Read `README.md` for complete documentation
3. Check `COMPLETION_CHECKLIST.md` for what's implemented
4. Review security best practices in README.md
5. Consider deployment for production use

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Install all deps | `npm install && cd apps/api && npm install && cd ../dashboard && npm install` |
| Start backend | `cd apps/api && npm run start:dev` |
| Start frontend | `cd apps/dashboard && npm run start` |
| View backend logs | Check Terminal 1 |
| View frontend logs | Check Terminal 2 |
| Access app | `http://localhost:4200` |
| Backend API | `http://localhost:3000` |

---

**Happy coding! 🚀**
