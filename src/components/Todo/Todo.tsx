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
    event.preventDefault();  // Prevent the default form submission behavior

    // Create a new todo item with the current form data
    const newItem = createNewItem(title, description, status, deadline, priority);

    if (isEditing && editTodo) {
      // If editing, update the existing todo item
      setItems(updateItem(items, editTodo.uuid, newItem));
    } else {
      // If creating, add the new item to the list
      setItems([...items, newItem]);
    }

    // Reset the form fields and close the modal after submission
    resetForm();
  };

  // Reset the form fields and close the modal
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

  // Handle closing the modal without saving
  const closeModal = () => {
    resetForm(); // Reset the form and close the modal
  };

  // Handle item deletion by its UUID
  const handleDelete = (uuid: string) => {
    setItems(deleteItem(items, uuid));  // Remove the item from the list
  };

  // Handle editing an item by setting it in the form
  const handleEdit = (title: string) => {
    // Find the item to edit based on its title
    const itemToEdit = items.find((item) => item.title === title);

    if (itemToEdit) {
      // Pre-fill the form with the existing values of the item
      setEditTodo(itemToEdit);
      setTitle(itemToEdit.title);
      setDescription(itemToEdit.description);
      setStatus(itemToEdit.status);
      setDeadline(itemToEdit.deadline);
      setPriority(itemToEdit.priority);
      setIsEditing(true);
      setIsModalOpen(true); // Open the modal for editing
    }
  };

  // Extract existing titles from the items state (for validation in the form)
  const existingTitles = items.map(item => item.title);

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-200 p-4 mb-4 rounded shadow-md">
        {/* Toolbar section, where you can add additional buttons or items */}
        <div className="flex items-center">
          {/* Add any additional toolbar content here */}
        </div>

        {/* Button to open the modal for creating a new to-do */}
        <button
          onClick={() => {
            resetForm(); // Reset form to prevent residual editing state
            setIsModalOpen(true); // Open the modal to create a new to-do
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
            {/* TodoForm component handles the form inputs and submission */}
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
              existingTitles={existingTitles}  // Pass existing titles for validation
            />
          </div>
        </div>
      )}

      {/* Render Todo Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["to-do", "in progress", "done"].map((statusItem) => (
          <div key={statusItem} className="p-4 bg-gray-100 rounded shadow">
            <h2 className="text-xl font-bold mb-4">
              {/* Display the column title and number of items */}
              {statusItem.charAt(0).toUpperCase() + statusItem.slice(1)} (
              {items.filter((item) => item.status === statusItem).length})

              {/* Show sort button for 'To-Do' column */}
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

            {/* Render todo items with sorting for "to-do" */}
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
                    {/* Delete and Edit buttons for each item */}
                    <button
                      onClick={() => handleDelete(item.uuid)}  // Handle deletion
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
            ) : (
              // Similar rendering for 'In Progress' and 'Done' items
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
                        onClick={() => handleDelete(item.uuid)}  // Handle deletion
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