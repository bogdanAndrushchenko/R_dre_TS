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

export type DeadlineType = string | Date | null;
export type CreateAtType = string | Date;
export type IssueIdType = string;

export interface Task {
  id?: IssueIdType;
  title: string;
  description: string;
  createdAt?: CreateAtType;
  status?: Status;
  priority: Priority;
  deadline?: DeadlineType;
  updatedAt?: Date;
}

export interface TaskFilterOptions {
  status?: Status;
  priority?: Priority;
  createdAt?: CreateAtType;
  deadline?: DeadlineType;
}
