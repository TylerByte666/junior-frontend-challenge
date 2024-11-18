import { useState, FormEvent } from "react";

interface TodoItem {
  title: string;
  description: string;
  status: "to-do" | "in progress" | "done";
  deadline: Date;
  created: Date;
  priority: "low" | "medium" | "high";
}

export const Todo = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<"to-do" | "in progress" | "done">("to-do");
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [editTodo, setEditTodo] = useState<TodoItem | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Function to handle form submission (Add or Edit)
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newItem: TodoItem = {
      title,
      description,
      status,
      deadline,
      created: new Date(),
      priority,
    };

    if (isEditing && editTodo) {
      // Update existing item by replacing it 
      // with the updated item
      const updatedItems = items.map((item) =>
        item === editTodo ? { ...item, ...newItem } : item
      );
      setItems(updatedItems);
    } else {
      // Add new item
      setItems([...items, newItem]);
    }

    // Reset form after submit
    setTitle("");
    setDescription("");
    setDeadline(new Date());
    setPriority("low");
    setIsEditing(false);
    setEditTodo(null);
  };

  const handleDelete = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Handle todo edit
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
  
      {statuses.map((statusItem) => (
        <div key={statusItem}>
          <h2>{statusItem.charAt(0).toUpperCase() + statusItem.slice(1)} {items.filter((item) => item.status === statusItem).length}</h2>
          {items
            .filter((item) => item.status === statusItem)
            .map((item, index) => (
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