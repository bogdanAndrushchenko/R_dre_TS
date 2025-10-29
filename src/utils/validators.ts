import {DEFAULT_PRIORITY, DEFAULT_STATUS} from "../../constants";
import {Priority, Status} from "../modules/tasks/task.types";
import {randomUUID} from 'crypto';
import {Task} from "../dto/Task";

export function isValidTaskStatus(status: unknown): status is Status {
  return typeof status === 'string' && Object.values(Status).includes(status as Status);
}

export function isValidTaskPriority(priority: unknown): priority is Priority {
  return typeof priority === 'string' && Object.values(Priority).includes(priority as Priority);
}

export function validateAndNormalizeTask(input: unknown): Task {

  if (typeof input !== 'object' || input === null) {
    throw new Error('Task must be an object');
  }

  const obj = input as Record<string, unknown>;

  if (!('title' in obj) || typeof obj.title !== 'string' || !obj.title.trim()) {
    throw new Error('Task title is required and must be a non-empty string');
  }

  const status: Status =
    'status' in obj && isValidTaskStatus(obj.status)
      ? obj.status
      : DEFAULT_STATUS;

  const priority: Priority =
    'priority' in obj && isValidTaskPriority(obj.priority)
      ? obj.priority
      : DEFAULT_PRIORITY;

  let id: string;
  if ('id' in obj && typeof obj.id === 'string' && obj.id.trim()) {
    id = obj.id.trim();
  } else {
    id = randomUUID();
  }

  let description: string = '';
  if ('description' in obj) {
    if (obj.description !== undefined && obj.description !== null) {
      if (typeof obj.description !== 'string') {
        throw new Error('Task description must be a string');
      }
      description = obj.description;
    }
  }

  const now = new Date();

  let createdAt: Date;
  if ('createdAt' in obj && obj.createdAt !== undefined && obj.createdAt !== null) {
    if (!(obj.createdAt instanceof Date) && typeof obj.createdAt !== 'string' && typeof obj.createdAt !== 'number') {
      throw new Error('Task createdAt must be a Date, string, or number');
    }
    createdAt = new Date(obj.createdAt);
    if (isNaN(createdAt.getTime())) {
      throw new Error('Task createdAt is not a valid date');
    }
  } else {
    createdAt = now;
  }

  let deadline: Date | null = null;
  if ('deadline' in obj && obj.deadline !== undefined && obj.deadline !== null) {
    if (!(obj.deadline instanceof Date) && typeof obj.deadline !== 'string' && typeof obj.deadline !== 'number') {
      throw new Error('Task deadline must be a Date, string, or number');
    }
    deadline = new Date(obj.deadline);
    if (isNaN(deadline.getTime())) {
      throw new Error('Task deadline is not a valid date');
    }
  }

  return {
    id,
    title: obj.title.trim(),
    description,
    status,
    priority,
    createdAt,
    deadline
  };
}

export function parseTasksFromJSON(data: unknown): Task[] {
  if (!Array.isArray(data)) {
    throw new Error('JSON data must be an array');
  }

  return data.map((item, index) => {
    try {
      return validateAndNormalizeTask(item);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Invalid task at index ${index}: ${message}`);
    }
  });
}