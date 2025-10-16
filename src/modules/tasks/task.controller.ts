import { TaskService } from './task.service';
import { ITask, Status, Priority, StringNumberUndefined } from './task.types';

export class TaskController {
  private service: TaskService;

  constructor(service: TaskService) {
    this.service = service;
  }

  getAllTasks() {
    return this.service.getAllTasks();
  }

  getTaskById(id: StringNumberUndefined) {
    return this.service.getTaskById(id);
  }

  createTask(data: ITask) {
    return this.service.createTask(data);
  }

  updateTask(id: StringNumberUndefined, updates: Partial<ITask>) {
    return this.service.updateTask(id, updates);
  }

  deleteTask(id: StringNumberUndefined) {
    return this.service.deleteTask(id);
  }

  filterTasks(options: { status?: Status; priority?: Priority; createdAt?: Date }) {
    return this.service.filterTasks(options);
  }

  isTaskCompletedByDeadline(id: StringNumberUndefined) {
    return this.service.isTaskCompletedByDeadline(id);
  }
}

