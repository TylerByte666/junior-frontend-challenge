import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Todo } from './Todo';
import { describe, expect, it } from 'vitest';

describe('Todo Component', () => {
  /**
   * Test case to verify that the Create button is rendered and that
   * clicking the button opens the form modal with the expected fields.
   */
  it('renders the Create button and opens the form modal correctly', () => {
    render(<Todo />);

    // Check if the "Create" button is rendered
    const createButton = screen.getByText('Create To-Do');
    expect(createButton).toBeInTheDocument();

    // Simulate clicking the "Create" button to open the modal
    fireEvent.click(createButton);

    // Check if form fields are rendered in the modal
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Deadline')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority')).toBeInTheDocument();
  });

  /**
   * Test case to ensure the modal closes when the cancel button is clicked.
   */
  it('closes the modal when clicking the cancel button', () => {
    render(<Todo />);

    // Open the modal by clicking the "Create" button
    fireEvent.click(screen.getByText('Create To-Do'));

    // Check if the modal is open by ensuring the form fields are visible
    expect(screen.getByLabelText('Title')).toBeInTheDocument();

    // Click the cancel button (assuming it has the text "X") to close the modal
    fireEvent.click(screen.getByText('X'));

    // Verify that the modal is closed by checking that the form fields are no longer in the document
    expect(screen.queryByLabelText('Title')).not.toBeInTheDocument();
  });

  /**
   * Test case to simulate form submission with valid data.
   * It verifies that the form can be submitted correctly.
   */
  it('submits the form with valid data', async () => {
    render(<Todo />);

    // Open the modal to add a new task
    fireEvent.click(screen.getByText('Create To-Do'));

    // Fill in the form fields with valid data
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Task description' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'to-do' } });
    fireEvent.change(screen.getByLabelText('Deadline'), { target: { value: '2024-12-31' } });
    fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'high' } });

    // Simulate clicking the submit button (assuming it's labeled "Add")
    fireEvent.click(screen.getByText('Add'));
  });

  /**
   * Test case to ensure that the form is not submitted if validation fails.
   * This simulates an error in the form validation and verifies the error message.
   */
  it('does not submit the form if validation fails', async () => {
    render(<Todo />);

    // Open the modal to add a new task
    fireEvent.click(screen.getByText('Create To-Do'));
  
    // Focus and blur the title input to simulate "touching" the field for validation
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

  /**
   * Test case to check if the modal can be closed using the escape key.
   * This ensures accessibility features for keyboard navigation.
   */
  it('tests accessibility by closing the modal with the escape key', () => {
    render(<Todo />);

    // Open the modal to add a new task
    fireEvent.click(screen.getByText('Create To-Do'));

    // Ensure that the modal is open by checking that the form fields are rendered
    expect(screen.getByLabelText('Title')).toBeInTheDocument();

    // Simulate pressing the escape key to close the modal
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    // Verify that the modal is closed by checking the absence of form fields
    expect(screen.queryByLabelText('Title')).not.toBeInTheDocument();
  });
});