import { FormEvent } from "react";

export interface TodoFormProps {
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    status: "to-do" | "in progress" | "done";
    setStatus: (value: "to-do" | "in progress" | "done") => void;
    deadline: Date;
    setDeadline: (value: Date) => void;
    priority: "low" | "medium" | "high";
    setPriority: (value: "low" | "medium" | "high") => void;
    handleSubmit: (event: FormEvent) => void;
    isEditing: boolean;
    closeModal: () => void;
    existingTitles: string[] | undefined;
}