import { Component, OnInit, inject } from '@angular/core';
import { AuditService } from '../../services/audit.service';
import { Observable } from 'rxjs';
import { AuditLog, User } from 'libs/data/interfaces';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.state';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css'],
})
export class AuditLogComponent implements OnInit {
  logs$: Observable<AuditLog[]>;
  user$: Observable<User | null>;
  error$: Observable<string | null>;
  private auditService = inject(AuditService);

  constructor(auditService: AuditService, private store: Store<{ auth: AuthState }>) {
    this.auditService = auditService;
    this.logs$ = this.auditService.getLogs();
    this.user$ = this.store.select((state: { auth: AuthState }) => state.auth.user);
    this.error$ = this.auditService.getError();
  }

  ngOnInit(): void {}

  isAccessAllowed(user: User): boolean {
    return user.role === 'Owner' || user.role === 'Admin';
  }

  formatDate(date: any): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleString();
  }

  getActionColor(action: string): string {
    switch (action.toUpperCase()) {
      case 'CREATE':
        return 'bg-green-100 text-green-800';
      case 'UPDATE':
        return 'bg-blue-100 text-blue-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  clearError(): void {
    this.auditService.clearError();
  }
}

