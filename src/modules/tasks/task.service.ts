import { Task, Subtask, Bug, Story, Epic, ITask, Status, Priority, StringNumberUndefined } from './task.types';
import { validateAndNormalizeTask } from '../../utils/validators';

export class TaskService {
  private tasks: Task[] = [];

  constructor(initialTasks: ITask[] = []) {
    this.tasks = initialTasks.map(t => new Task(validateAndNormalizeTask(t) as ITask));
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: StringNumberUndefined): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  createTask(data: ITask): Task {
    const validTask = validateAndNormalizeTask(data) as ITask;
    const task = new Task(validTask);
    this.tasks.push(task);
    return task;
  }

  updateTask(id: StringNumberUndefined, updates: Partial<ITask>): Task | undefined {
    const idx = this.tasks.findIndex(task => task.id === id);
    if (idx === -1) return undefined;
    const updated = { ...this.tasks[idx], ...updates };
    const validTask = validateAndNormalizeTask(updated) as ITask;
    this.tasks[idx] = new Task(validTask);
    return this.tasks[idx];
  }

  deleteTask(id: StringNumberUndefined): boolean {
    const idx = this.tasks.findIndex(task => task.id === id);
    if (idx === -1) return false;
    this.tasks.splice(idx, 1);
    return true;
  }

  filterTasks(options: { status?: Status; priority?: Priority; createdAt?: Date }): Task[] {
    return this.tasks.filter(task => {
      if (options.status && task.status !== options.status) return false;
      if (options.priority && task.priority !== options.priority) return false;
      if (options.createdAt && new Date(task.createdAt as string).toDateString() !== options.createdAt.toDateString()) return false;
      return true;
    });
  }

  isTaskCompletedByDeadline(id: StringNumberUndefined): boolean | undefined {
    const task = this.getTaskById(id);
    if (!task || !task.deadline) return undefined;
    if (task.status !== Status.DONE) return false;
    const completedDate = new Date(task.updatedAt || task.createdAt || '');
    return completedDate <= new Date(task.deadline as string);
  }
}

