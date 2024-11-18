import { useState, FormEvent } from "react";

interface TodoItem {
  title: string;
  description: string;
  status: "to-do" | "in progress" | "done";
  dueDate: Date;
  formattedDate: string;
  priority: "low" | "medium" | "high";
}

export const Todo = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<"to-do" | "in progress" | "done">("to-do");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newItem: TodoItem = {
      title,
      description,
      status,
      dueDate,
      formattedDate,
      priority,
    };
    setItems([...items, newItem]);
    setTitle("");
    setDescription("");
    setDueDate(new Date());
    setFormattedDate("");
    setPriority("low");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Title</p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <p>Description</p>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p>Status</p>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "to-do" | "in progress" | "done")}
        >
          <option value="to-do">To-Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <p>Due Date</p>
        <input
          type="date"
          value={formattedDate}
          onChange={(e) => setFormattedDate(e.target.value)}
        />
        <p>Priority</p>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add</button>
      </form>
      <div>
        <h2>To-Do {items.filter((item) => item.status === "to-do").length}</h2>
        {items
          .filter((item) => item.status === "to-do")
          .sort((a, b) => (a.priority > b.priority ? -1 : 1))
          .map((item, index) => (
            <div key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>{item.dueDate.toDateString()}</p>
              <p>{item.formattedDate}</p>
              <p>{item.priority}</p>
            </div>
          ))}
      </div>
      <div>
        <h2>In Progress {items.filter((item) => item.status === "in progress").length}</h2>
        {items
          .filter((item) => item.status === "in progress")
          .map((item, index) => (
            <div key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>{item.dueDate.toDateString()}</p>
              <p>{item.formattedDate}</p>
              <p>{item.priority}</p>
            </div>
          ))}
      </div>
      <div>
        <h2>Done {items.filter((item) => item.status === "done").length}</h2>
        {items
          .filter((item) => item.status === "done")
          .map((item, index) => (
            <div key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>{item.dueDate.toDateString()}</p>
              <p>{item.formattedDate}</p>
              <p>{item.priority}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
