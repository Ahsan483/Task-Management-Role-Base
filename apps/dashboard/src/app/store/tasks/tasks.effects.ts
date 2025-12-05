/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as TasksActions from './tasks.actions';
import { TasksService } from '../../services/task.service';

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions, private tasksService: TasksService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      mergeMap(() =>
        this.tasksService.getTasks().pipe(
          map(tasks => TasksActions.loadTasksSuccess({ tasks })),
          catchError(err => of(TasksActions.loadTasksFailure({ error: err.message })))
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTask),
      mergeMap(({ task }) =>
        this.tasksService.createTask(task).pipe(
          map(task => TasksActions.createTaskSuccess({ task })),
          catchError(err => of(TasksActions.createTaskFailure({ error: err.message })))
        )
      )
    )
  );

  changeStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.changeTaskStatus),
      mergeMap(({ id, status }) =>
        this.tasksService.updateTaskStatus(id, status).pipe(
          map(task => TasksActions.changeTaskStatusSuccess({ task })),
          catchError(err => of(TasksActions.changeTaskStatusFailure({ error: err.message })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      mergeMap(({ id }) =>
        this.tasksService.deleteTask(id).pipe(
          map(() => TasksActions.deleteTaskSuccess({ id })),
          catchError(err => of(TasksActions.deleteTaskFailure({ error: err.message })))
        )
      )
    )
  );
}
