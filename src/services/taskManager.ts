import {validateAndNormalizeTask} from '../utils/validators';
import {IssueIdType, Priority, Status,  Task, TaskFilterOptions} from "../dto/Task";

export class TaskManager {
  private tasks: Map<IssueIdType, Task>;

  constructor(initialTasks: Task[] = []) {
    this.tasks = new Map();
    initialTasks.forEach(task => {
      this.assertDefinedId(task.id, 'Initial task id is required');
      this.tasks.set(task.id, task);
    });
  }

  private assertDefinedId(id?: IssueIdType, message = 'Task id is required'): asserts id is IssueIdType {
    if (id === undefined || id === null) {
      throw new Error(message);
    }
  }

  public loadTasks(tasks: Task[]): void {
    tasks.forEach(task => {
      this.assertDefinedId(task.id, 'Loaded task id is required');
      this.tasks.set(task.id as IssueIdType, task);
    });
  }

  public getTaskById(id: IssueIdType): Task | undefined {
    return this.tasks.get(id);
  }

  public getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  public createTask(input: unknown): Task {
    const task = validateAndNormalizeTask(input);
    this.assertDefinedId(task.id, 'Created task id is required');

    if (this.tasks.has(task.id)) {
      throw new Error(`Task with id ${task.id} already exists`);
    }

    this.tasks.set(task.id, task);
    return task;
  }

  public updateTask(id: IssueIdType, updates: Partial<Task>): Task {
    const existingTask = this.tasks.get(id);

    if (!existingTask) {
      throw new Error(`Task with id ${id} not found`);
    }

    const updatedTask = validateAndNormalizeTask({
      ...existingTask,
      ...updates,
      id,
      updatedAt: new Date()
    }) as Task;

    this.assertDefinedId(updatedTask.id, 'Updated task id is required');

    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  public deleteTask(id: IssueIdType): boolean {
    return this.tasks.delete(id);
  }

  public filterTasks(options: TaskFilterOptions): Task[] {
    return Array.from(this.tasks.values()).filter(task =>
      (!options.status || task.status === options.status) &&
      (!options.priority || task.priority === options.priority)
    );
  }

  public isTaskOverdue(id: IssueIdType, currentDate: Date = new Date()): boolean {
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