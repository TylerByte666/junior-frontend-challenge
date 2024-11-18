import { render, screen, fireEvent } from '@testing-library/react';
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
})
