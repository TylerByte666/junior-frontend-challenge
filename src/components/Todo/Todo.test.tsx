import { render, screen } from '@testing-library/react';
import { Todo } from './Todo';
import { describe, expect, it } from 'vitest';

describe('Todo Component', () => {
  it('renders the todo item form correctly', () => {
    render(<Todo />);

    // Check if form fields are rendered
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Deadline')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority')).toBeInTheDocument();
  });
})
