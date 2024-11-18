import { FormEvent } from "react";

interface TodoFormProps {
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
}

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
}: TodoFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
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
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
        {isEditing ? "Update" : "Add"}
      </button>
    </form>
  );
};