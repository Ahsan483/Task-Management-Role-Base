export enum UserRole {
  OWNER = 'Owner',
  ADMIN = 'Admin',
  VIEWER = 'Viewer',
}

export enum TaskStatus {
  TODO = 'Todo',
  IN_PROGRESS = 'InProgress',
  DONE = 'Done',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  organizationId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  category?: string;
  order: number;
  ownerId: number;
  organizationId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: number;
  userId: number;
  action: string;
  resource: string;
  resourceId: number;
  details?: string;
  // optional user object for convenience in UI templates
  user?: User | null;
  organizationId: number;
  createdAt: Date;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  category?: string;
  status?: TaskStatus;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  category?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  organizationId: number;
}
