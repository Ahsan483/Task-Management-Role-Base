import { createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { Task } from 'libs/data/interfaces';

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export const initialTasksState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const tasksReducer = createReducer(
  initialTasksState,
  on(TasksActions.loadTasks, state => ({ ...state, loading: true, error: null })),
  on(TasksActions.loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks, loading: false, error: null })),
  on(TasksActions.loadTasksFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(TasksActions.createTask, state => ({ ...state, error: null })),
  on(TasksActions.createTaskSuccess, (state, { task }) => ({ ...state, tasks: [...state.tasks, task], error: null })),
  on(TasksActions.createTaskFailure, (state, { error }) => ({ ...state, error })),

  on(TasksActions.changeTaskStatus, state => ({ ...state, error: null })),
  on(TasksActions.changeTaskStatusSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? task : t)),
    error: null,
  })),
  on(TasksActions.changeTaskStatusFailure, (state, { error }) => ({ ...state, error })),

  on(TasksActions.deleteTask, state => ({ ...state, error: null })),
  on(TasksActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== id),
    error: null,
  })),
  on(TasksActions.deleteTaskFailure, (state, { error }) => ({ ...state, error })),
  
  on(TasksActions.clearError, state => ({ ...state, error: null }))
);


