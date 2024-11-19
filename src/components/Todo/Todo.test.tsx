import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Todo } from './Todo';
import { describe, expect, it } from 'vitest';

describe('Todo Component', () => {
  it('renders the Create button and opens the form modal correctly', () => {
    render(<Todo />);

    // Check if the "Create" button is rendered
    const createButton = screen.getByText('Create To-Do');
    expect(createButton).toBeInTheDocument();

    // Simulate clicking the "Create" button
    fireEvent.click(createButton);

    // Check if form fields are rendered in the modal
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Deadline')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority')).toBeInTheDocument();
  });

  it('closes the modal when clicking the cancel button', () => {
    render(<Todo />);

    // Open the modal by clicking the "Create" button
    fireEvent.click(screen.getByText('Create To-Do'));

    // Check if the modal is open by ensuring the fields are visible
    expect(screen.getByLabelText('Title')).toBeInTheDocument();

    // Click the cancel button to close the modal (adjust based on your component)
    fireEvent.click(screen.getByText('X'));

    // Verify that the modal is closed by checking the absence of form fields
    expect(screen.queryByLabelText('Title')).not.toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<Todo />);

    // Open the modal
    fireEvent.click(screen.getByText('Create To-Do'));

    // Fill in the form
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Task description' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'to-do' } });
    fireEvent.change(screen.getByLabelText('Deadline'), { target: { value: '2024-12-31' } });
    fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'high' } });

    // Simulate form submission (assuming there's a submit button with text "Add")
    fireEvent.click(screen.getByText('Add'));
  });

  it('does not submit the form if validation fails', async () => {
    render(<Todo />);

    // Open the modal
    fireEvent.click(screen.getByText('Create To-Do'));
  
    // Focus and blur the title input to simulate "touching" the field
    const titleInput = screen.getByLabelText(/title/i); // Adjust if the label is different
    fireEvent.focus(titleInput);
    fireEvent.blur(titleInput);
  
    // Simulate form submission by clicking the "Add" button
    fireEvent.click(screen.getByText('Add'));
  
    // Wait for the validation error message to appear
    await waitFor(() => {
      expect(screen.getByText('Title cannot be blank.')).toBeInTheDocument();
    });
  });

  it('tests accessibility by closing the modal with the escape key', () => {
    render(<Todo />);

    // Open the modal
    fireEvent.click(screen.getByText('Create To-Do'));

    // Check that the modal opened
    expect(screen.getByLabelText('Title')).toBeInTheDocument();

    // Close the modal using the escape key
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    // Verify that the modal is closed
    expect(screen.queryByLabelText('Title')).not.toBeInTheDocument();
  });
});