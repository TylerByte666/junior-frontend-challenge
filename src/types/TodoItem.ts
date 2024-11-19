/**
 * Represents a single todo item in the system.
 * Each todo item has various properties that define its characteristics
 * such as title, description, status, priority, and dates.
 */
export interface TodoItem {
    /**
     * A unique identifier for the todo item.
     * Typically used to reference and manage the item within a collection.
     */
    uuid: string;

    /**
     * The title or name of the todo item.
     * This is a short, descriptive string that represents the task.
     */
    title: string;

    /**
     * A detailed description of the todo item.
     * Provides more context about the task or what needs to be done.
     */
    description: string;

    /**
     * The current status of the todo item.
     * Possible values:
     * - "to-do" (task is yet to be started)
     * - "in progress" (task is being worked on)
     * - "done" (task is completed)
     */
    status: "to-do" | "in progress" | "done";

    /**
     * The deadline date for the todo item.
     * Represents the date and time by which the task should be completed.
     */
    deadline: Date;

    /**
     * The date when the todo item was created.
     * This is usually the time when the task was initially added.
     */
    created: Date;

    /**
     * The priority of the todo item.
     * Possible values:
     * - "low" (low priority)
     * - "medium" (medium priority)
     * - "high" (high priority)
     */
    priority: "low" | "medium" | "high";
}