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
    const [isTitleUnique, setIsTitleUnique] = useState(true); // Tracks if the title is unique
    const [isTitleValid, setIsTitleValid] = useState(true); // Ensures title is not empty
    const [isDescriptionValid, setIsDescriptionValid] = useState(true); // Ensures description is not empty
    const [isTitleTouched, setIsTitleTouched] = useState(false); // Checks if title field is interacted with
    const prevTitleRef = useRef<string>(""); // Holds the previous title for comparison
    const titleInputRef = useRef<HTMLInputElement>(null); // Ref to focus on title input when modal opens

    // Effect to handle title uniqueness
    useEffect(() => {
        if (!isEditing) {
            // When not editing, check if the title is unique
            setIsTitleUnique(!existingTitles.includes(title));
        } else {
            // When editing, allow the title to remain the same, otherwise check for uniqueness
            setIsTitleUnique(
                !existingTitles.includes(title) || title === prevTitleRef.current
            );
        }
    }, [title, existingTitles, isEditing]);

    // Effect to store the previous title when editing
    useEffect(() => {
        if (isEditing) {
            prevTitleRef.current = title;
        }
    }, [isEditing, title]);

    // Validate title to ensure it's not blank
    useEffect(() => {
        setIsTitleValid(title.trim() !== ""); // Title cannot be blank
    }, [title]);

    // Handle changes to the description field
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
        setIsDescriptionValid(e.target.value.trim() !== ""); // Ensure description is not blank
    };

    // Close modal when Escape key is pressed
    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleEscapeKey);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleEscapeKey);
        };
    }, [closeModal]);

    // Focus on the title input when the modal is opened
    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, []);

    // Track when the title field is touched (focused and interacted with)
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setIsTitleTouched(true); // Mark title as touched
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
                    onChange={handleTitleChange}
                    onBlur={() => setIsTitleTouched(true)} // Mark as touched when user leaves the input
                    required
                    ref={titleInputRef}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
                {isTitleTouched && !isTitleValid && (
                    <p className="text-red-500 text-sm mt-1">Title cannot be blank.</p>
                )}

                {/* Show error if the title is not unique */}
                {!isTitleUnique && !isEditing && (
                    <p className="text-red-500 text-sm mt-1">Title already exists. Please choose a different title.</p>
                )}

                {/* Show error if the title is not unique when editing */}
                {!isTitleUnique && isEditing && (
                    <p className="text-red-500 text-sm mt-1">This title already exists. Please choose a different title.</p>
                )}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <input
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange} // Updated handler for description change
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
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
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
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
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="priority" className="block text-sm font-medium">Priority</label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <button
                disabled={!isTitleUnique || !isTitleValid || !isDescriptionValid} // Disable button if title or description is invalid
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 disabled:bg-gray-300"
            >
                {isEditing ? "Update" : "Add"}
            </button>
        </form>
    );
};