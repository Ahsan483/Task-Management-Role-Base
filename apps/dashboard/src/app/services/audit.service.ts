/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuditLog } from 'libs/data/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  private baseUrl = 'http://localhost:3000/audit-log';
  private errorSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  getLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(this.baseUrl).pipe(
      tap(() => this.errorSubject.next(null)),
      catchError((error: HttpErrorResponse) => {
        const errorMsg = error.error?.message || error.message || 'Failed to fetch audit logs';
        this.errorSubject.next(errorMsg);
        console.error('Failed to fetch audit logs:', error);
        return throwError(() => error);
      })
    );
  }

  getError(): Observable<string | null> {
    return this.errorSubject.asObservable();
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}


