import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsersService, OrgUser } from '../../services/users.service';
import { Observable } from 'rxjs';
import { User } from 'libs/data/interfaces';
import { AuthState } from '../../store/auth/auth.state';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  private usersService = inject(UsersService);
  private store = inject(Store);
  private fb = inject(FormBuilder);

  users: OrgUser[] = [];
  user$: Observable<User | null> = this.store.select(
    (state: { auth: AuthState }) => state.auth.user
  );
  loading = false;
  error: string | null = null;
  showAdminForm = false;
  adminForm: FormGroup;
  selectedUserRole: { userId: number; newRole: string } | null = null;

  constructor() {
    this.adminForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;
    this.usersService.getOrganizationUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load users';
        this.loading = false;
      },
    });
  }

  createAdmin(): void {
    if (this.adminForm.valid) {
      this.usersService.registerAdmin(this.adminForm.value).subscribe({
        next: () => {
          this.adminForm.reset();
          this.showAdminForm = false;
          this.loadUsers();
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to create admin';
        },
      });
    }
  }

  changeRole(userId: number, currentRole: string): void {
    const newRole = currentRole === 'Admin' ? 'Viewer' : 'Admin';
    if (confirm(`Change user role to ${newRole}?`)) {
      this.usersService.changeUserRole(userId, newRole).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to change role';
        },
      });
    }
  }

  getRoleBadgeColor(role: string): string {
    switch (role) {
      case 'Owner':
        return 'bg-purple-100 text-purple-800';
      case 'Admin':
        return 'bg-blue-100 text-blue-800';
      case 'Viewer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
