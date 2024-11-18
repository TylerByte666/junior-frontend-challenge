import { useState, useEffect, useRef } from "react";
import { TodoFormProps } from "../../types/TodoFormProps";

export const TodoForm = ({
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
    deadline,
    setDeadline,
    priority,
    setPriority,
    handleSubmit,
    isEditing,
    closeModal,
    existingTitles = []
}: TodoFormProps) => {
    const [isTitleUnique, setIsTitleUnique] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true); // Track description validity
    const prevExistingTitlesRef = useRef<string[]>([]);

    // Check if existing titles have changed and compare
    useEffect(() => {
        if (existingTitles !== prevExistingTitlesRef.current) {
            prevExistingTitlesRef.current = existingTitles;
        }

        // Only run the check for uniqueness when the title or existing titles change
        // Skip title uniqueness check if we are editing
        if (!isEditing && existingTitles && title) {
            setIsTitleUnique(!existingTitles.includes(title));
        }
    }, [title, existingTitles, isEditing]);

    // Validate the description when it changes
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
        setIsDescriptionValid(e.target.value.trim() !== ""); // Ensure it's not blank
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{isEditing ? "Edit Todo" : "Create Todo"}</h2>
                <button
                    type="button"
                    onClick={closeModal}
                    className="text-red-500"
                >
                    X
                </button>
            </div>

            <div>
                <label htmlFor="title" className="block text-sm font-medium">Title</label>
                <input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                />
                {!isTitleUnique && !isEditing && (
                    <p className="text-red-500 text-sm mt-1">Title already exists. Please choose a different title.</p>
                )}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <input
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange} // Updated handler
                    className="w-full p-2 border rounded"
                />
                {!isDescriptionValid && (
                    <p className="text-red-500 text-sm mt-1">Description cannot be blank.</p>
                )}
            </div>

            <div>
                <label htmlFor="status" className="block text-sm font-medium">Status</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "to-do" | "in progress" | "done")}
                    className="w-full p-2 border rounded"
                >
                    <option value="to-do">To-Do</option>
                    <option value="in progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>

            <div>
                <label htmlFor="deadline" className="block text-sm font-medium">Deadline</label>
                <input
                    id="deadline"
                    type="date"
                    value={deadline.toISOString().split("T")[0]}
                    onChange={(e) => setDeadline(new Date(e.target.value))}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div>
                <label htmlFor="priority" className="block text-sm font-medium">Priority</label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                    className="w-full p-2 border rounded"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <button
                disabled={!isTitleUnique || !isDescriptionValid} // Disable button if either title is not unique or description is invalid
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded"
            >
                {isEditing ? "Update" : "Add"}
            </button>
        </form>
    );
};