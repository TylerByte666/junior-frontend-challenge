import { TodoItem } from "../types/TodoItem";

export const createNewItem = (
    title: string,
    description: string,
    status: "to-do" | "in progress" | "done",
    deadline: Date,
    priority: "low" | "medium" | "high"
) => {
    return {
        title,
        description,
        status,
        deadline,
        created: new Date(),
        priority,
    };
};

export const updateItem = (
    items: TodoItem[],
    editTodo: TodoItem | null,
    newItem: TodoItem
) => {
    if (editTodo) {
        return items.map((item) =>
            item === editTodo ? { ...item, ...newItem } : item
        );
    }
    return [...items, newItem];
};

export const deleteItem = (items: TodoItem[], index: number) => {
    return items.filter((_, i) => i !== index);
};

export const sortItemsByPriority = (items: TodoItem[]) => {
    const priorityMap = { low: 1, medium: 2, high: 3 };

  return items.sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);
};