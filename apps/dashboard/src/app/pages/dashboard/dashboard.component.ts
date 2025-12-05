import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TasksComponent } from 'src/app/components/tasks/tasks.component';
import { AuditLogComponent } from 'src/app/components/audit-log/audit-log.component';
import { UsersComponent } from 'src/app/components/users/users.component';
import { Observable } from 'rxjs';
import { User } from 'libs/data/interfaces';
import { AuthState } from '../../store/auth/auth.state';
import * as TasksActions from '../../store/tasks/tasks.actions';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TasksComponent, AuditLogComponent, UsersComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private store = inject(Store) as Store<{ auth: AuthState }>;
  private authService = inject(AuthService);
  private router = inject(Router);

  activeTab = 'tasks';
  user$: Observable<User | null> = this.store.select(
    (state: { auth: AuthState }) => state.auth.user
  );

  ngOnInit(): void {
    this.store.dispatch(TasksActions.loadTasks());
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  logout(): void {
    this.authService.logout();
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}
