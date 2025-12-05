# Secure Task Management System

A full-stack Task Management System with role-based access control (RBAC) built using NX monorepo, NestJS, Angular, and TypeORM.


## Quick Start

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd apps/api
npm install

# Install frontend dependencies
cd ../dashboard
npm install
```

### 2. Start Backend

```bash
cd apps/api
npm run start:dev
```

Backend runs on: **http://localhost:3000**

### 3. Start Frontend (New Terminal)

```bash
cd apps/dashboard
npm run start
```

Frontend runs on: **http://localhost:4200**

### 4. Test The System

1. Open browser: `http://localhost:4200`
2. Register new account or use test credentials
3. Create organization and start managing tasks!

---

## Features

### ✅ Core Features
- **Role-Based Access Control** - Owner, Admin, Viewer roles with proper authorization
- **JWT Authentication** - Secure token-based authentication with bcrypt password hashing
- **Task Management** - Full CRUD operations for tasks with status tracking
- **Organization Hierarchy** - Multi-tenant organization support
- **Audit Logging** - Track all user actions and changes
- **Responsive Dashboard** - Mobile-friendly UI with Tailwind CSS

### ✅ Advanced Features
- Task categorization and filtering
- Task status management (Todo → InProgress → Done)
- Progress visualization with completion percentage
- User-scoped access control based on roles
- Real-time state management with NgRx
- Task reordering functionality

---

## Tech Stack

### Backend
- **NestJS 11.1.9** - Modern Node.js framework
- **TypeORM 0.3.28** - ORM for database management
- **SQLite** - Default database (PostgreSQL supported)
- **JWT (@nestjs/jwt)** - Token-based authentication
- **Bcrypt** - Password hashing (10 rounds)
- **Passport** - Authentication middleware

### Frontend
- **Angular 15.2** - Progressive web framework
- **NgRx 16+** - State management
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Reactive Forms** - Powerful form handling
- **RxJS** - Reactive programming

### DevOps
- **NX** - Monorepo management
- **TypeScript 4.9** - Type safety
- **Jest** - Unit testing (optional)

---

## Complete Setup Guide

### Prerequisites
- Node.js 16+ installed
- npm 8+ installed
- Git (optional)

### Step 1: Navigate to Project Root
```bash
cd c:\Users\Assam\Desktop\Ahsan\task-managment\task-management
```

### Step 2: Install Root Dependencies
```bash
npm install
```

### Step 3: Install Backend Dependencies
```bash
cd apps/api
npm install
cd ../..
```

### Step 4: Install Frontend Dependencies
```bash
cd apps/dashboard
npm install
cd ../..
```

### Step 5: Setup Environment Variables
Create `.env` file in project root:
```bash
JWT_SECRET=your-super-secret-jwt-key-change-in-production
DB_TYPE=sqlite
DB_DATABASE=db.sqlite
API_PORT=3000
NODE_ENV=development
```

### Step 6: Start Backend (Terminal 1)
```bash
cd apps/api
npm run start:dev
```
Expected output: `Server running on port 3000`

### Step 7: Start Frontend (Terminal 2)
```bash
cd apps/dashboard
npm run start
```
Expected output: `Application bundle generated successfully`

### Step 8: Access Application
- Open browser: `http://localhost:4200`
- Should see login page

---

## Testing The Application

### Test 1: User Registration
1. Click "Create Account" on login page
2. Fill in:
   - Name: Test User
   - Email: testuser@example.com
   - Password: TestPass123
   - Organization: Test Org
3. Click "Register"
4. Should redirect to login

### Test 2: User Login
1. Enter email: testuser@example.com
2. Enter password: TestPass123
3. Click "Login"
4. Should redirect to dashboard

### Test 3: Create Task
1. Click "Create Task" button
2. Fill in:
   - Title: "Setup Project"
   - Description: "Configure development environment"
   - Category: "Setup"
3. Click "Create"
4. Task should appear in list

### Test 4: Change Task Status
1. Find task in list
2. Click status dropdown
3. Select "In Progress" or "Done"
4. Status badge should update

### Test 5: View Audit Logs (Owner/Admin Only)
1. Click "Audit Log" tab
2. See all user actions
3. Includes: User, Action, Resource, Timestamp

---

## API Endpoints

### Authentication Endpoints
```
POST   /auth/login              - User login
POST   /auth/register           - User registration
```

### Tasks Endpoints (JWT Required)
```
GET    /tasks                   - List accessible tasks (scoped by role)
POST   /tasks                   - Create new task
GET    /tasks/:id               - Get task details
PUT    /tasks/:id               - Update task
DELETE /tasks/:id               - Delete task
PUT    /tasks/:id/status        - Change task status (TODO/IN_PROGRESS/DONE)
PUT    /tasks/reorder           - Reorder tasks
```

### Audit Log Endpoints (Owner/Admin Only)
```
GET    /audit-log               - View organization audit logs
```

### Organizations Endpoints
```
GET    /organizations           - List organizations
POST   /organizations           - Create organization
GET    /organizations/:id       - Get organization details
PUT    /organizations/:id       - Update organization
DELETE /organizations/:id       - Delete organization
```

### Users Endpoints (JWT Required)
```
GET    /users                   - List users
POST   /users/register          - Register user
GET    /users/:id               - Get user details
```

---

## Database Schema

### Users Table
```
id (PK)          → Unique identifier
name             → User full name
email (Unique)   → User email address
password         → Hashed password (bcrypt)
role             → OWNER | ADMIN | VIEWER
organizationId   → Foreign key to Organization
createdAt        → Timestamp
updatedAt        → Timestamp
```

### Organizations Table
```
id (PK)          → Unique identifier
name (Unique)    → Organization name
description      → Organization description
createdAt        → Timestamp
updatedAt        → Timestamp
```

### Tasks Table
```
id (PK)          → Unique identifier
title            → Task title
description      → Task description
status           → TODO | IN_PROGRESS | DONE
category         → Task category
order            → Task display order
ownerId (FK)     → User who owns the task
organizationId   → Organization that owns the task
createdAt        → Timestamp
updatedAt        → Timestamp
```

### AuditLog Table
```
id (PK)          → Unique identifier
userId (FK)      → User who performed the action
action           → CREATE | UPDATE | DELETE | STATUS_CHANGE
resource         → Task | User | Organization
resourceId       → ID of the affected resource
details          → Additional information
organizationId   → Organization context
createdAt        → Timestamp
```

---

## Access Control (RBAC)

### Owner Role
- ✅ Create tasks
- ✅ View all organization tasks
- ✅ Edit all tasks
- ✅ Delete any task
- ✅ View audit logs
- ✅ Manage users
- ✅ Manage organization

### Admin Role
- ✅ Create tasks
- ✅ View all organization tasks
- ✅ Edit all tasks
- ✅ Delete any task
- ✅ View audit logs
- ❌ Cannot manage users
- ❌ Cannot manage organization

### Viewer Role
- ✅ Create own tasks
- ✅ View only own tasks
- ✅ Edit only own tasks
- ✅ Delete own tasks
- ❌ Cannot view other users' tasks
- ❌ Cannot view audit logs
- ❌ Cannot perform admin actions

---

## Running Tests

### Backend Unit Tests
```bash
cd apps/api
npm run test              # Run all tests
npm run test:watch       # Watch mode
npm run test:cov         # With coverage report
```

### Frontend Unit Tests
```bash
cd apps/dashboard
npm run test              # Run all tests
npm run test:watch       # Watch mode
```

### E2E Testing (Manual)
See "Testing The Application" section above

---

## Building for Production

### Build Backend
```bash
cd apps/api
npm run build
npm start
```

### Build Frontend
```bash
cd apps/dashboard
npm run build
```

Output in: `dist/dashboard/`

---

## Troubleshooting

### Issue: Backend won't start
```bash
# Solution: Clear node_modules and reinstall
cd apps/api
rm -r node_modules
npm install
npm run start:dev
```

### Issue: Port 3000 already in use
```bash
# Find process using port 3000 (Windows PowerShell)
Get-Process | Where-Object {$_.handles -like "*3000*"}

# Kill the process
Stop-Process -Id [PID] -Force
```

### Issue: Port 4200 already in use
```bash
# Find and kill process
Get-Process | Where-Object {$_.handles -like "*4200*"}
Stop-Process -Id [PID] -Force
```

### Issue: CORS errors
Ensure backend has CORS enabled. Check `apps/api/src/main.ts`:
```typescript
app.enableCors({
  origin: 'http://localhost:4200',
  credentials: true,
});
```

### Issue: Database file not found
```bash
# SQLite database will be created automatically
# If stuck, delete db.sqlite and restart
rm db.sqlite
npm run start:dev
```

### Issue: JWT token expired
- Clear browser localStorage and re-login
- Or increase JWT expiration in `apps/api/src/auth/auth.service.ts`

### Issue: Cannot login after registration
- Verify email/password match on login
- Check browser console for error details
- Check backend logs for specific error message

---

## Project Structure

```
task-management/
├── apps/
│   ├── api/                          ← Backend NestJS Application
│   │   ├── src/
│   │   │   ├── auth/                 ← Authentication & JWT
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   ├── jwt.guard.ts
│   │   │   │   ├── roles.guard.ts
│   │   │   │   └── decorators/
│   │   │   ├── users/                ← User Management
│   │   │   │   ├── user.entity.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   └── users.controller.ts
│   │   │   ├── tasks/                ← Task Management
│   │   │   │   ├── task.entity.ts
│   │   │   │   ├── tasks.service.ts
│   │   │   │   └── tasks.controller.ts
│   │   │   ├── organizations/        ← Organization Management
│   │   │   │   ├── organization.entity.ts
│   │   │   │   ├── organizations.service.ts
│   │   │   │   └── organizations.controller.ts
│   │   │   ├── audit/                ← Audit Logging
│   │   │   │   ├── audit-log.entity.ts
│   │   │   │   ├── audit.service.ts
│   │   │   │   └── audit.controller.ts
│   │   │   ├── app.module.ts         ← Root Module
│   │   │   └── main.ts               ← Bootstrap
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── dashboard/                    ← Frontend Angular Application
│       ├── src/
│       │   ├── app/
│       │   │   ├── services/         ← API Services
│       │   │   │   ├── auth.service.ts
│       │   │   │   ├── task.service.ts
│       │   │   │   └── audit.service.ts
│       │   │   ├── store/            ← NgRx State Management
│       │   │   │   ├── auth/
│       │   │   │   └── tasks/
│       │   │   ├── pages/            ← Page Components
│       │   │   │   ├── login/
│       │   │   │   └── dashboard/
│       │   │   ├── components/       ← Reusable Components
│       │   │   │   ├── tasks/
│       │   │   │   └── audit-log/
│       │   │   ├── guards/           ← Route Guards
│       │   │   ├── app.module.ts
│       │   │   └── app-routing.module.ts
│       │   ├── environments/
│       │   └── main.ts
│       ├── package.json
│       └── tsconfig.json
│
├── libs/
│   └── data/
│       └── interfaces.ts             ← Shared DTOs & Interfaces
│
├── nx.json
├── package.json
├── tsconfig.base.json
└── README.md                         ← This file
```

---

## Security Notes

### Implemented Security
- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT token-based authentication (24-hour expiration)
- ✅ Role-based authorization on all endpoints
- ✅ Organization-scoped access control
- ✅ Audit logging of all actions
- ✅ CORS configured for development

### Production Recommendations
- 🔒 Change JWT_SECRET in production
- 🔒 Use environment secrets management system
- 🔒 Implement JWT refresh token rotation
- 🔒 Add rate limiting on auth endpoints
- 🔒 Enable HTTPS/TLS in production
- 🔒 Switch to PostgreSQL for production
- 🔒 Add input validation & sanitization
- 🔒 Implement CSRF protection
- 🔒 Set secure cookies (HttpOnly, SameSite)
- 🔒 Add two-factor authentication

---

## Performance Optimization

- Database query optimization with TypeORM
- Lazy loading of Angular modules
- NgRx for efficient state management
- Indexed database columns for queries
- HTTP interceptor for JWT attachment

---

## Common Commands Reference

```bash
# Backend Development
npm run start:dev         # Start with watch mode
npm run build             # Build for production
npm run test              # Run tests
npm run test:cov          # Run with coverage

# Frontend Development
npm run start             # Start dev server
npm run build             # Build for production
npm run test              # Run tests
npm run lint              # Run linter

# Project Management
npm run nx:graph          # View dependency graph
npm run nx:affected       # Check affected projects
```

---

## FAQ

**Q: How do I change the database?**
A: Update `.env` to use PostgreSQL:
```
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=taskdb
```

**Q: How do I reset the database?**
A: Delete `db.sqlite` and restart backend.

**Q: How long are JWT tokens valid?**
A: 24 hours by default. Change in `auth.service.ts`

**Q: Can I modify roles?**
A: Yes, update `UserRole` enum in `libs/data/interfaces.ts`

**Q: How do I enable HTTPS?**
A: Use environment variable and reconfigure in `main.ts`

---

## Support & Debugging

### Enable Debug Logging
```typescript
// In main.ts
app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);
```

### Check Backend Health
```bash
curl http://localhost:3000/health
```

### View Frontend Bundle
```bash
cd apps/dashboard
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/dashboard/stats.json
```

---

## Next Steps

1. ✅ Start backend: `cd apps/api && npm run start:dev`
2. ✅ Start frontend: `cd apps/dashboard && npm run start`
3. ✅ Register and create first task
4. ✅ Test role-based access
5. ✅ Review audit logs

---

## Contributing

- Follow TypeScript strict mode
- Use consistent naming conventions
- Add tests for new features
- Update documentation
- Follow commit message conventions

---

## License

MIT License - Feel free to use this project for personal or commercial purposes.

---

**Built with ❤️ using NX, NestJS, and Angular**

For more information:
- [NestJS Documentation](https://docs.nestjs.com)
- [Angular Documentation](https://angular.io)
- [NX Documentation](https://nx.dev)
- [TypeORM Documentation](https://typeorm.io)
