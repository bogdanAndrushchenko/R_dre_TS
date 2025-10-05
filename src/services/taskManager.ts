import {validateAndNormalizeTask} from '../utils/validators';
import {Priority, Status, stringNumberUndefined, Task, TaskFilterOptions} from "../dto/Task";

export class TaskManager {
  private tasks: Map<stringNumberUndefined, Task>;

  constructor(initialTasks: Task[] = []) {
    this.tasks = new Map(initialTasks.map(task => [task.id, task]));
  }

  public loadTasks(tasks: Task[]): void {
    tasks.forEach(task => {
      this.tasks.set(task.id, task);
    });
  }

  public getTaskById(id: stringNumberUndefined): Task | undefined {
    return this.tasks.get(id);
  }

  public getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  public createTask(input: Task): Task {
    const task = validateAndNormalizeTask(input);

    if (this.tasks.has(task.id)) {
      throw new Error(`Task with id ${task.id} already exists`);
    }

    this.tasks.set(task.id, task);
    return task;
  }

  public updateTask(id: stringNumberUndefined, updates: Partial<Task>): Task {
    const existingTask = this.tasks.get(id);

    if (!existingTask) {
      throw new Error(`Task with id ${id} not found`);
    }

    const updatedTask = validateAndNormalizeTask({
      ...existingTask,
      ...updates,
      id,
      updatedAt: new Date()
    });

    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  public deleteTask(id: stringNumberUndefined): boolean {
    return this.tasks.delete(id);
  }

  public filterTasks(options: TaskFilterOptions): Task[] {
    let filtered = Array.from(this.tasks.values());

    if (options.status) {
      filtered = filtered.filter(task => task.status === options.status);
    }

    if (options.priority) {
      filtered = filtered.filter(task => task.priority === options.priority);
    }

    return filtered;
  }

  public isTaskOverdue(id: stringNumberUndefined, currentDate: Date = new Date()): boolean {
    const task = this.tasks.get(id);

    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    if (!task.deadline) {
      return false;
    }

    return task.status !== Status.DONE && currentDate > new Date(task.deadline);
  }

  public getOverdueTasks(currentDate: Date = new Date()): Task[] {
    return Array.from(this.tasks.values()).filter(task =>
      task.deadline &&
      task.status !== Status.DONE &&
      currentDate > task.deadline
    );
  }

  public getTasksByStatus(status: Status): Task[] {
    return this.filterTasks({status});
  }

  public getTasksByPriority(priority: Priority): Task[] {
    return this.filterTasks({priority});
  }
}