import { FormEvent } from "react";

/**
 * The properties (props) required by the TodoForm component.
 * These props provide the necessary data and handlers to control
 * the todo form's state and interactions.
 */
export interface TodoFormProps {
    /**
     * The current title of the todo item.
     * This value is bound to the input field in the form.
     */
    title: string;

    /**
     * Function to update the title of the todo item.
     * This is typically called when the user changes the title input field.
     */
    setTitle: (value: string) => void;

    /**
     * The current description of the todo item.
     * This value is bound to the description input field in the form.
     */
    description: string;

    /**
     * Function to update the description of the todo item.
     * This is typically called when the user changes the description input field.
     */
    setDescription: (value: string) => void;

    /**
     * The current status of the todo item.
     * Possible values:
     * - "to-do" (task has not been started yet)
     * - "in progress" (task is being worked on)
     * - "done" (task is completed)
     */
    status: "to-do" | "in progress" | "done";

    /**
     * Function to update the status of the todo item.
     * This is typically called when the user selects a new status for the task.
     */
    setStatus: (value: "to-do" | "in progress" | "done") => void;

    /**
     * The current deadline for the todo item.
     * This value is bound to the date input field in the form.
     */
    deadline: Date;

    /**
     * Function to update the deadline of the todo item.
     * This is typically called when the user selects a new deadline date.
     */
    setDeadline: (value: Date) => void;

    /**
     * The current priority of the todo item.
     * Possible values:
     * - "low" (low priority)
     * - "medium" (medium priority)
     * - "high" (high priority)
     */
    priority: "low" | "medium" | "high";

    /**
     * Function to update the priority of the todo item.
     * This is typically called when the user selects a new priority level.
     */
    setPriority: (value: "low" | "medium" | "high") => void;

    /**
     * Function that handles the form submission.
     * This is called when the user submits the form, either to create or update a todo item.
     */
    handleSubmit: (event: FormEvent) => void;

    /**
     * A flag indicating whether the form is in edit mode.
     * If true, the form is used to edit an existing todo item.
     */
    isEditing: boolean;

    /**
     * Function to close the modal.
     * This is called when the user decides to cancel the action or close the form.
     */
    closeModal: () => void;

    /**
     * An array of existing todo titles.
     * This is used to check if the title entered by the user already exists.
     * This can help prevent duplicates.
     */
    existingTitles: string[] | undefined;
}