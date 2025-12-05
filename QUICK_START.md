# 🚀 Quick Start Guide

Get the Task Management System running in 5 minutes!

## Prerequisites
- Node.js 16+
- npm 8+
- 2 Terminal windows

---

## Windows PowerShell Commands

### Step 1: Install Dependencies

```powershell
# Navigate to project root
cd c:\Users\Assam\Desktop\Ahsan\task-managment\task-management

# Install all dependencies
npm install; cd apps/api; npm install; cd ..; cd dashboard; npm install; cd ../..
```

⏱️ **Wait 2-3 minutes for installation to complete**

---

### Step 2: Start Backend (Terminal 1)

```powershell
cd apps/api
npm run start:dev
```

✅ **Expected output:**
```
Backend running on http://localhost:3000
```

---

### Step 3: Start Frontend (Terminal 2 - NEW WINDOW)

```powershell
cd apps/dashboard
npm run start
```

✅ **Expected output:**
```
✔ browser application bundle generated successfully
```

---

## 4️⃣ Access Application

Open your browser: **http://localhost:4200**

---

## 5️⃣ Create Test Account

### Register
1. Click "Create Account"
2. Fill in the form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `Test123!`
   - Organization: `Test Company`
3. Click "Register"

### Login
1. Enter email: `test@example.com`
2. Enter password: `Test123!`
3. Click "Login"

---

## ✨ Start Using!

### Create a Task
1. Click "Create Task" button
2. Enter:
   - Title: `Complete Project Setup`
   - Description: `Setup development environment`
   - Category: `Setup`
3. Click "Create"

### Change Task Status
1. Click status dropdown on any task
2. Select: `In Progress` or `Done`
3. Status updates automatically

### View Audit Log
- Click "Audit Log" tab (if you're Admin/Owner)
- See all user actions tracked

---

## 🐛 Troubleshooting

### Port 3000 Already In Use?
```powershell
# Find and kill process
Get-Process -Name node | Where-Object {$_.Port -eq 3000} | Stop-Process -Force
```

### Port 4200 Already In Use?
```powershell
Get-Process -Name ng | Stop-Process -Force
```

### Database Issues?
```powershell
# Delete old database and restart
cd apps/api
rm db.sqlite
npm run start:dev
```

### Dependencies Won't Install?
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -r node_modules apps/api/node_modules apps/dashboard/node_modules

# Reinstall
npm install; cd apps/api; npm install; cd ..; cd dashboard; npm install; cd ../..
```

---

## 📋 Test Checklist

- [ ] Backend running on port 3000
- [ ] Frontend running on port 4200
- [ ] Can register new account
- [ ] Can login successfully
- [ ] Can create tasks
- [ ] Can change task status
- [ ] Can view dashboard

---

## 📚 Full Documentation

See **README.md** for complete documentation including:
- API endpoints
- Database schema
- RBAC explanation
- Production deployment
- Security best practices

---

## 💡 Tips

- **Auto-reload**: Both backend and frontend reload on file changes
- **Network Tab**: Open DevTools (F12) → Network to see API calls
- **Console Errors**: Check browser console (F12) for frontend errors
- **Backend Logs**: Watch terminal 1 for backend errors

---

**You're all set! Happy coding! 🎉**
