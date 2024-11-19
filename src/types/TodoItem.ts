export interface TodoItem {
    uuid: string;
    title: string;
    description: string;
    status: "to-do" | "in progress" | "done";
    deadline: Date;
    created: Date;
    priority: "low" | "medium" | "high";
}