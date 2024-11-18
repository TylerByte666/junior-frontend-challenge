import { useState, FormEvent } from "react";
import { TodoItem } from "../../types/TodoItem";
import { createNewItem, updateItem, deleteItem, sortItemsByPriority } from "../../utils/todoHelpers";

export const Todo = () => {
  // State to manage the list of to-do items
  const [items, setItems] = useState<TodoItem[]>([]);

  // State to manage individual input fields in the form
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<"to-do" | "in progress" | "done">("to-do");
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  // States for editing an existing to-do item
  const [editTodo, setEditTodo] = useState<TodoItem | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Handle form submission (add new or update existing item)
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newItem: TodoItem = createNewItem(title, description, status, deadline, priority);

    if (isEditing && editTodo) {
      // Update existing item
      const updatedItems = updateItem(items, editTodo, newItem);
      setItems(updatedItems);
    } else {
      // Add new item
      setItems([...items, newItem]);
    }

    // Reset form fields after submission
    setTitle("");
    setDescription("");
    setDeadline(new Date());
    setPriority("low");
    setIsEditing(false);
    setEditTodo(null);
  };

  // Handle item deletion based on index
  const handleDelete = (index: number) => {
    const updatedItems = deleteItem(items, index);
    setItems(updatedItems);
  };

  // Populate form with item data for editing
  const handleEdit = (index: number) => {
    const itemToEdit = items[index];
    setEditTodo(itemToEdit);
    setTitle(itemToEdit.title);
    setDescription(itemToEdit.description);
    setStatus(itemToEdit.status);
    setDeadline(itemToEdit.deadline);
    setPriority(itemToEdit.priority);
    setIsEditing(true);
  };

  // Dynamic todo status handling
  const statuses: ("to-do" | "in progress" | "done")[] = ["to-do", "in progress", "done"];

  // Render the UI with dynamic status filtering
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Title</p>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        <p>Description</p>
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
        <p>Status</p>
        <select value={status} onChange={(e) => setStatus(e.target.value as "to-do" | "in progress" | "done")}>
          <option value="to-do">To-Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <p>Deadline</p>
        <input
          type="date"
          value={deadline.toISOString().split("T")[0]}
          onChange={(e) => setDeadline(new Date(e.target.value))}
        />
        <p>Priority</p>
        <select value={priority} onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>

      {/* Dynamically render items based on status */}
      {statuses.map((statusItem) => (
        <div key={statusItem}>
          <h2>{statusItem.charAt(0).toUpperCase() + statusItem.slice(1)} {items.filter((item) => item.status === statusItem).length}</h2>
          {sortItemsByPriority(items)
            .filter((item: TodoItem) => item.status === statusItem)
            .map((item: TodoItem, index: number) => (
              <div key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>Created: {item.created.toDateString()}</p>
                <p>Deadline: {item.deadline.toDateString()}</p>
                <p>{item.priority}</p>
                <button onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};