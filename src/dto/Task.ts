export enum Status {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  CANCELLED = 'cancelled'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export type stringDateNull = string | Date | null;
export type stringDateUndefined = string | Date | undefined;
export type stringNumberUndefined = string | number | undefined;

export interface Task {
  id?: stringNumberUndefined;
  title: string;
  description: string;
  createdAt?: stringDateUndefined;
  status?: Status;
  priority: Priority;
  deadline?: stringDateNull;
  updatedAt?: stringDateUndefined;
}

export interface TaskFilterOptions {
  status?: Status;
  priority?: Priority;
  createdAt?: Date;
  deadline?: stringDateNull;
}
