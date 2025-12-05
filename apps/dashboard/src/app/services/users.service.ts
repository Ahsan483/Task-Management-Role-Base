/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface OrgUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  getOrganizationUsers(): Observable<OrgUser[]> {
    return this.http.get<OrgUser[]>(`${this.baseUrl}/organization-users`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Failed to fetch organization users:', error);
        return throwError(() => error);
      })
    );
  }

  changeUserRole(userId: number, newRole: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/change-user-role`, { userId, newRole }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Failed to change user role:', error);
        return throwError(() => error);
      })
    );
  }

  registerAdmin(data: { email: string; password: string; name: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-admin`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Failed to register admin:', error);
        return throwError(() => error);
      })
    );
  }
}
