import { TodoItem } from "../types/TodoItem";
import { v4 as uuidv4 } from "uuid";

/**
 * Creates a new Todo item with a unique identifier and given properties.
 *
 * @param title - The title of the Todo item.
 * @param description - A brief description of the Todo item.
 * @param status - The current status of the Todo item (e.g., "to-do", "in progress", "done").
 * @param deadline - The deadline date of the Todo item.
 * @param priority - The priority level of the Todo item (e.g., "low", "medium", "high").
 * @returns A new Todo item with a unique UUID and the provided details.
 */
export const createNewItem = (
    title: string,
    description: string,
    status: "to-do" | "in progress" | "done",
    deadline: Date,
    priority: "low" | "medium" | "high"
): TodoItem => {
    return {
        uuid: uuidv4(), // Generate a unique UUID for each new Todo item
        title,           
        description,   
        status,         
        deadline,       
        created: new Date(), 
        priority,        
    };
};

/**
 * Updates an existing Todo item identified by its UUID with new data.
 * Allows for partial updates by only changing the provided fields.
 *
 * @param items - The current list of Todo items.
 * @param uuid - The unique identifier (UUID) of the Todo item to update.
 * @param newItem - The new properties to update in the Todo item.
 * @returns The updated list of Todo items with the changes applied to the specified item.
 */
export const updateItem = (
    items: TodoItem[],
    uuid: string, 
    newItem: Partial<TodoItem> // Partial type to allow for updating specific fields without requiring the entire Todo item
) => {
    return items.map((item) =>
        item.uuid === uuid ? { ...item, ...newItem } : item
    );
};

/**
 * Deletes a Todo item from the list based on its UUID.
 *
 * @param items - The current list of Todo items.
 * @param uuid - The UUID of the Todo item to be deleted.
 * @returns A new list of Todo items with the specified item removed.
 */
export const deleteItem = (items: TodoItem[], uuid: string) => {
    return items.filter((item) => item.uuid !== uuid); // Filter out the item with the matching UUID
};

/**
 * Sorts a list of Todo items based on their priority level.
 * The sorting can be done in ascending ("asc") or descending ("desc") order.
 *
 * @param items - The list of Todo items to sort.
 * @param direction - The direction of sorting: "asc" for ascending or "desc" for descending. Defaults to "asc".
 * @returns The sorted list of Todo items according to their priority.
 */
export const sortItemsByPriority = (
    items: TodoItem[],
    direction: "asc" | "desc" = "asc" // Optional parameter, default is ascending order
) => {
    return [...items].sort((a, b) => {
        // Define the priority levels in the order of low to high
        const priorities = ["low", "medium", "high"];
        const priorityA = priorities.indexOf(a.priority); // Get the index of the priority for item A
        const priorityB = priorities.indexOf(b.priority); // Get the index of the priority for item B

        // Sort based on the direction: ascending or descending
        if (direction === "asc") {
            return priorityA - priorityB;
        } else {
            return priorityB - priorityA;
        }
    });
};