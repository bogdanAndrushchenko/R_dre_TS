import { TaskManager } from './services/taskManager';
import { parseTasksFromJSON } from './utils/validators';
import {Priority, Status} from "./dto/Task";
import * as fs from 'fs';
import * as path from 'path';

async function loadTasksFromFile(): Promise<TaskManager> {
  try {
    const tasksPath = path.resolve(process.cwd(), 'tasks.json');
    const jsonData = JSON.parse(fs.readFileSync(tasksPath, 'utf-8'));
    const tasks = parseTasksFromJSON(jsonData);
    return new TaskManager(tasks);
  } catch (error) {
    throw new Error(`Failed to load tasks: ${(error as Error).message}`);
  }
}

export async function exampleUsage(): Promise<void> {
  const manager = await loadTasksFromFile();

  // Get task by ID
  const task = manager.getTaskById(1);
  console.log('Task 1:', task);

  // Create new task
  const newTask = manager.createTask({
    title: 'New feature implementation',
    description: 'Implement user authentication',
    priority: Priority.URGENT,
    deadline: new Date('2025-10-20')
  });
  console.log('Created task:', newTask);

  // Update task
  const updated = manager.updateTask(1, {
    status: Status.DONE,
  });
  console.log('Updated task:', updated);

  // Filter tasks
  const todoTasks = manager.filterTasks({
    status: Status.TODO,
    priority: Priority.HIGH
  });
  console.log('TODO tasks with high priority:', todoTasks);

  // Check overdue tasks
  const overdue = manager.getOverdueTasks();
  console.log('Overdue tasks:', overdue);

  // Check if specific task is overdue
  const isOverdue = manager.isTaskOverdue(2);
  console.log('Task 2 is overdue:', isOverdue);

  // Delete task
  const deleted = manager.deleteTask(1);
  console.log('Task deleted:', deleted);
}