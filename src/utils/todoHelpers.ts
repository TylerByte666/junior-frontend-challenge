import { TodoItem } from "../types/TodoItem";
import { v4 as uuidv4 } from "uuid"; // Import the UUID generator

// Create a new todo with a unique identifier
export const createNewItem = (
    title: string,
    description: string,
    status: "to-do" | "in progress" | "done",
    deadline: Date,
    priority: "low" | "medium" | "high"
): TodoItem => {
    return {
        uuid: uuidv4(), // Generate a unique UUID
        title,
        description,
        status,
        deadline,
        created: new Date(),
        priority,
    };
};

// Update an existing todo identified by its UUID
export const updateItem = (
    items: TodoItem[],
    uuid: string, // Use UUID to identify the item to edit
    newItem: Partial<TodoItem> // Partial to allow updating specific fields
) => {
    return items.map((item) =>
        item.uuid === uuid ? { ...item, ...newItem } : item
    );
};

// Delete a todo identified by its UUID
export const deleteItem = (items: TodoItem[], uuid: string) => {
    return items.filter((item) => item.uuid !== uuid);
};

// Sort todos by priority
export const sortItemsByPriority = (
    items: TodoItem[],
    direction: "asc" | "desc" = "asc"
) => {
    return [...items].sort((a, b) => {
        const priorities = ["low", "medium", "high"];
        const priorityA = priorities.indexOf(a.priority);
        const priorityB = priorities.indexOf(b.priority);

        if (direction === "asc") {
            return priorityA - priorityB;
        } else {
            return priorityB - priorityA;
        }
    });
};