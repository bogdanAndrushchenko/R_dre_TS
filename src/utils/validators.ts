import {DEFAULT_PRIORITY, DEFAULT_STATUS} from "../../constants";
import {Priority, Status, ITask} from "../modules/tasks/task.types";
import {randomUUID} from 'crypto';

export function isValidTaskStatus(status:Status): status is Status {
  return Object.values(Status).includes(status as Status);
}

export function isValidTaskPriority(priority: Priority): priority is Priority {
  return Object.values(Priority).includes(priority as Priority);
}

export function validateAndNormalizeTask(input: any): ITask {
  if (!input.title) {
    throw new Error('Task title is required and must be a string');
  }

  const status:Status = input.status && isValidTaskStatus(input.status)
    ? input.status
    : DEFAULT_STATUS;

  const priority:Priority = input.priority && isValidTaskPriority(input.priority)
    ? input.priority
    : DEFAULT_PRIORITY;

  const now = new Date();

  return {
    id: input.id || randomUUID(),
    title: input.title,
    description: input.description,
    status,
    priority,
    createdAt: input.createdAt ? new Date(input.createdAt) : now,
    deadline: input.deadline ? new Date(input.deadline) : null
  };
}

export function parseTasksFromJSON(data: unknown): ITask[] {
  if (!Array.isArray(data)) {
    throw new Error('JSON data must be an array');
  }

  return data.map((item, index) => {
    try {
      return validateAndNormalizeTask(item);
    } catch (error) {
      throw new Error(`Invalid task at index ${index}: ${(error as Error).message}`);
    }
  });
}