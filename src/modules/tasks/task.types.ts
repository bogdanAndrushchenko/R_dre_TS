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
export type CreateUpdateAtType = string | Date | undefined;
export type IssueIdType = string | number | undefined;

export interface ITask {
  id?: IssueIdType;
  title: string;
  description: string;
  createdAt?: CreateUpdateAtType;
  status: Status;
  priority: Priority;
  deadline?: DeadlineType;
  updatedAt?: CreateUpdateAtType;
}

export class Task implements ITask {
  id?: IssueIdType;
  title: string;
  description: string;
  createdAt?: CreateUpdateAtType;
  status: Status;
  priority: Priority;
  deadline?: DeadlineType;
  updatedAt?: CreateUpdateAtType;

  constructor(data: ITask) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.status = data.status;
    this.priority = data.priority;
    this.deadline = data.deadline ?? null;
    this.updatedAt = data.updatedAt;
  }

  getTaskInfo() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      priority: this.priority,
      createdAt: this.createdAt,
      deadline: this.deadline,
      updatedAt: this.updatedAt
    };
  }
}

export class Subtask extends Task {
  parentId: IssueIdType;
  constructor(data: ITask & { parentId: IssueIdType }) {
    super(data);
    this.parentId = data.parentId;
  }
  getTaskInfo() {
    return { ...super.getTaskInfo(), parentId: this.parentId };
  }
}

export class Bug extends Task {
  severity: string;
  constructor(data: ITask & { severity: string }) {
    super(data);
    this.severity = data.severity;
  }
  getTaskInfo() {
    return { ...super.getTaskInfo(), severity: this.severity };
  }
}

export class Story extends Task {
  storyPoints: number;
  constructor(data: ITask & { storyPoints: number }) {
    super(data);
    this.storyPoints = data.storyPoints;
  }
  getTaskInfo() {
    return { ...super.getTaskInfo(), storyPoints: this.storyPoints };
  }
}

export class Epic extends Task {
  children: IssueIdType[];
  constructor(data: ITask & { children: IssueIdType[] }) {
    super(data);
    this.children = data.children;
  }
  getTaskInfo() {
    return { ...super.getTaskInfo(), children: this.children };
  }
}
