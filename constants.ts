import {Priority, Status} from "./src/dto/Task";

export const DEFAULT_STATUS: Status = Status.TODO;
export const DEFAULT_PRIORITY: Priority = Priority.MEDIUM;
export const STATUS_VALUES = ["todo", "in_progress", "done"] as const;
export const PRIORITY_VALUES = ["low", "medium", "high"] as const;
