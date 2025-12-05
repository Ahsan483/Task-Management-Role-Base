/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from 'libs/data/interfaces';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Failed to fetch tasks:', error);
        return throwError(() => error);
      })
    );
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Failed to create task:', error);
        return throwError(() => error);
      })
    );
  }

  updateTaskStatus(id: number, status: string): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}/status`, { status }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Failed to update task status:', error);
        return throwError(() => error);
      })
    );
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Failed to delete task:', error);
        return throwError(() => error);
      })
    );
  }
}
