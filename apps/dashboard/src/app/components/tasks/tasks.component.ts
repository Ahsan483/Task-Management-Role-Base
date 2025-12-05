/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TasksActions from '../../store/tasks/tasks.actions';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'libs/data/interfaces';
import { AuthState } from '../../store/auth/auth.state';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})

export class TasksComponent implements OnInit {
  private storeService = inject(Store);
  taskForm: FormGroup;
  tasks$ = this.storeService.select((state: any) => state.tasks.tasks);
  loading$ = this.storeService.select((state: any) => state.tasks.loading);
  error$ = this.storeService.select((state: any) => state.tasks.error);
  user$: Observable<User | null> = this.storeService.select(
    (state: { auth: AuthState }) => state.auth.user
  );
  showForm = false;
  selectedStatus = 'all';
  statusOptions = ['Todo', 'InProgress', 'Done'];

  constructor(private fb: FormBuilder, private store: Store) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['General'],
      status: ['Todo'],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(TasksActions.loadTasks());
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  setFilter(status: string): void {
    this.selectedStatus = status;
  }

  createTask(): void {
    if (this.taskForm.valid) {
      this.store.dispatch(TasksActions.createTask({ task: this.taskForm.value }));
      this.taskForm.reset({ category: 'General', status: 'Todo' });
      this.showForm = false;
    }
  }

  onStatusChange(taskId: number, event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    this.store.dispatch(TasksActions.changeTaskStatus({ id: taskId, status }));
  }

  updateTaskStatus(taskId: number, status: string): void {
    this.store.dispatch(TasksActions.changeTaskStatus({ id: taskId, status }));
  }

  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.store.dispatch(TasksActions.deleteTask({ id: taskId }));
    }
  }

  getFilteredTasks(tasks: any[]): any[] {
    if (this.selectedStatus === 'all') {
      return tasks;
    }
    return tasks.filter((t) => t.status === this.selectedStatus);
  }

  getProgressPercentage(tasks: any[]): number {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.status === 'Done').length;
    return Math.round((completed / tasks.length) * 100);
  }

  getCompletedCount(tasks: any[]): number {
    return tasks.filter((t) => t.status === 'Done').length;
  }

  canEditTask(task: any, user: User): boolean {
    if (user.role === 'Owner') return true;
    if (user.role === 'Admin') return true;
    if (user.role === 'Viewer') return task.ownerId === user.id;
    return false;
  }

  canDeleteTask(task: any, user: User): boolean {
    if (user.role === 'Owner') return true;
    if (user.role === 'Admin') return true;
    if (user.role === 'Viewer') return task.ownerId === user.id;
    return false;
  }

  clearError(): void {
    this.store.dispatch(TasksActions.clearError());
  }
}

