import { useState, FormEvent } from "react";
import { TodoForm } from "./TodoForm";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<TodoItem | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // State for sorting direction for the "To-Do" column
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Handle form submission (create or update)
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newItem = createNewItem(title, description, status, deadline, priority);
    if (isEditing && editTodo) {
      // Update existing item      
      setItems(updateItem(items, editTodo, newItem));
    } else {
      // Add new item
      setItems([...items, newItem]);
    }
    resetForm();
  };

  // Reset the form and close the modal
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("to-do");
    setDeadline(new Date());
    setPriority("low");
    setIsEditing(false);
    setEditTodo(null);
    setIsModalOpen(false);
  };

  // Handle closing the modal
  const closeModal = () => {
    resetForm();
  };

  // Handle item deletion
  const handleDelete = (index: number) => {
    setItems(deleteItem(items, index));
  };

  // Handle item editing
  const handleEdit = (title: string) => {
    const itemToEdit = items.find((item) => item.title === title);

    if (itemToEdit) {
      setEditTodo(itemToEdit);
      setTitle(itemToEdit.title);
      setDescription(itemToEdit.description);
      setStatus(itemToEdit.status);
      setDeadline(itemToEdit.deadline);
      setPriority(itemToEdit.priority);
      setIsEditing(true);
      setIsModalOpen(true); // Open the modal
    }
  };

  // Extract existing titles from the items state
  const existingTitles = items.map(item => item.title);

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-200 p-4 mb-4 rounded shadow-md">
        <div className="flex items-center">
          {/* You can add any additional toolbar items here in the future */}
        </div>
        <button
          onClick={() => {
            resetForm(); // Reset form to prevent residual editing state
            setIsModalOpen(true);
          }}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition duration-300"
        >
          Create To-Do
        </button>
      </div>

      {/* Modal for Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="p-6 bg-white rounded transition-transform transform ease-in-out duration-300 w-96 max-w-3xl">
            <TodoForm
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              status={status}
              setStatus={setStatus}
              deadline={deadline}
              setDeadline={setDeadline}
              priority={priority}
              setPriority={setPriority}
              handleSubmit={handleSubmit}
              isEditing={isEditing}
              closeModal={closeModal}
              existingTitles={existingTitles}
            />
          </div>
        </div>
      )}

      {/* Render Todo Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["to-do", "in progress", "done"].map((statusItem) => (
          <div key={statusItem} className="p-4 bg-gray-100 rounded shadow">
            <h2 className="text-xl font-bold mb-4">
              {statusItem.charAt(0).toUpperCase() + statusItem.slice(1)} (
              {items.filter((item) => item.status === statusItem).length})
              {statusItem === "to-do" && items.filter((item) => item.status === "to-do").length > 0 && (
                <button
                  onClick={() =>
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                  }
                  className="ml-2 text-sm text-blue-500"
                >
                  Sort by Priority {sortDirection === 'asc' ? '↓' : '↑'}
                </button>
              )}
            </h2>
            {statusItem === "to-do" ? (
              sortItemsByPriority(
                items.filter((item) => item.status === statusItem),
                sortDirection
              ).map((item, index) => (
                <div
                  key={index}
                  className={`mb-4 p-4 rounded shadow ${new Date(item.deadline) < new Date() ? "bg-red-100" : "bg-white"}`}
                >
                  <h3 className="text-lg font-semibold underline">{item.title}</h3>
                  <p className="font-light">{item.description}</p>
                  <p>Priority: {item.priority}</p>
                  <p>Deadline: {item.deadline.toLocaleDateString()}</p>
                  <p>Created: {item.created.toLocaleDateString()}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(item.title)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              items
                .filter((item) => item.status === statusItem)
                .map((item, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-4 rounded shadow ${new Date(item.deadline) < new Date() ? "bg-red-100" : "bg-white"}`}
                  >
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="font-light">{item.description}</p>
                    <p>Priority: {item.priority}</p>
                    <p>Deadline: {item.deadline.toLocaleDateString()}</p>
                    <p>Created: {item.created.toLocaleDateString()}</p>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(item.title)} // Open modal for editing
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};