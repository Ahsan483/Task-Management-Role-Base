import { createAction, props } from '@ngrx/store';
import { Task } from 'libs/data/interfaces';

export const loadTasks = createAction('[Tasks] Load Tasks');
export const loadTasksSuccess = createAction('[Tasks] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Tasks] Load Tasks Failure', props<{ error: string }>());

export const createTask = createAction('[Tasks] Create Task', props<{ task: Task }>());
export const createTaskSuccess = createAction('[Tasks] Create Task Success', props<{ task: Task }>());
export const createTaskFailure = createAction('[Tasks] Create Task Failure', props<{ error: string }>());

export const changeTaskStatus = createAction('[Tasks] Change Task Status', props<{ id: number; status: string }>());
export const changeTaskStatusSuccess = createAction('[Tasks] Change Task Status Success', props<{ task: Task }>());
export const changeTaskStatusFailure = createAction('[Tasks] Change Task Status Failure', props<{ error: string }>());

export const deleteTask = createAction('[Tasks] Delete Task', props<{ id: number }>());
export const deleteTaskSuccess = createAction('[Tasks] Delete Task Success', props<{ id: number }>());
export const deleteTaskFailure = createAction('[Tasks] Delete Task Failure', props<{ error: string }>());

export const clearError = createAction('[Tasks] Clear Error');
