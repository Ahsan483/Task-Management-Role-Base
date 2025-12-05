export interface TaskState {
  tasks: any[];
  loading: boolean;
  error: string | null;
}

export const initialTaskState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};
