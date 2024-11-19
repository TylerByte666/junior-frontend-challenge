import { describe, it, expect } from 'vitest';
import { createNewItem, updateItem, deleteItem, sortItemsByPriority } from '../utils/todoHelpers';
import { TodoItem } from '../types/TodoItem';

// Grouping tests related to todoHelper functions
describe('todoHelpers', () => {
    // Creating a fixed date to use in tests
    const currentDate = new Date();

    // Group of tests for the createNewItem function
    describe('createNewItem', () => {
        it('should create a new todo item with the correct properties', () => {
            // Calling the function to create a new Todo item
            const newItem = createNewItem(
                'Test Todo',
                'Description of test todo',
                'to-do',
                currentDate,
                'high'
            );

            // Validating the properties of the created todo item
            expect(newItem).toHaveProperty('uuid'); // Ensure the item has a UUID
            expect(typeof newItem.uuid).toBe('string'); // UUID should be a string
            expect(newItem).toHaveProperty('title', 'Test Todo'); // The title should be "Test Todo"
            expect(newItem).toHaveProperty('description', 'Description of test todo'); // The description should match
            expect(newItem).toHaveProperty('status', 'to-do'); // Status should be "to-do"
            expect(newItem).toHaveProperty('priority', 'high'); // Priority should be "high"
            expect(newItem).toHaveProperty('created'); // Ensure the creation date is set
            expect(newItem.created).toBeInstanceOf(Date); // Ensure the creation date is a Date object
            expect(newItem).toHaveProperty('deadline'); // Ensure the deadline is present
            expect(newItem.deadline).toEqual(currentDate); // Check that the deadline matches the provided date
        });
    });

    // Group of tests for the updateItem function
    describe('updateItem', () => {
        // Initial todo item before update
        const item1: TodoItem = {
            uuid: '1234',
            title: 'Old Item',
            description: 'Old Description',
            status: 'to-do',
            deadline: currentDate,
            priority: 'low',
            created: currentDate,
        };

        // Data to update the existing todo item
        const updatedData: Partial<TodoItem> = {
            title: 'Updated Item',
            description: 'Updated Description',
            status: 'in progress',
            priority: 'high',
        };

        it('should update the todo item if it exists', () => {
            // Call updateItem to update the item with matching UUID
            const updatedItems = updateItem([item1], '1234', updatedData);

            // Verify the updated item matches the expected changes
            expect(updatedItems[0]).toMatchObject({ ...item1, ...updatedData });
        });

        it('should not modify items if UUID does not match', () => {
            // Try to update with a non-matching UUID
            const updatedItems = updateItem([item1], '5678', updatedData);

            // Ensure that the item remains unchanged
            expect(updatedItems).toHaveLength(1); // No items were removed
            expect(updatedItems[0]).toEqual(item1); // The item should remain unchanged
        });
    });

    // Group of tests for the deleteItem function
    describe('deleteItem', () => {
        // Sample todo items to work with
        const item1: TodoItem = {
            uuid: '1234',
            title: 'Todo 1',
            description: 'Description 1',
            status: 'to-do',
            deadline: currentDate,
            priority: 'low',
            created: currentDate,
        };

        const item2: TodoItem = {
            uuid: '5678',
            title: 'Todo 2',
            description: 'Description 2',
            status: 'in progress',
            deadline: currentDate,
            priority: 'medium',
            created: currentDate,
        };

        it('should delete the item with the specified UUID', () => {
            const items = [item1, item2];

            // Call deleteItem to remove item with UUID '1234'
            const updatedItems = deleteItem(items, '1234');

            // Verify that only the item with UUID '1234' is deleted
            expect(updatedItems).toHaveLength(1); // Only 1 item should remain
            expect(updatedItems[0]).toEqual(item2); // The remaining item should be 'Todo 2'
        });

        it('should not delete any item if UUID does not match', () => {
            const items = [item1, item2];

            // Try deleting an item with a non-matching UUID
            const updatedItems = deleteItem(items, '9999');

            // Verify that no item was deleted
            expect(updatedItems).toHaveLength(2); // Both items should remain
        });
    });

    // Group of tests for the sortItemsByPriority function
    describe('sortItemsByPriority', () => {
        it('should sort items by priority (highest to lowest)', () => {
            // List of Todo items with various priorities
            const items: TodoItem[] = [
                { uuid: '1', title: 'Todo 1', priority: 'medium', description: 'Description 1', status: 'in progress', created: new Date(), deadline: new Date() },
                { uuid: '2', title: 'Todo 2', priority: 'high', description: 'Description 2', status: 'in progress', created: new Date(), deadline: new Date() },
                { uuid: '3', title: 'Todo 3', priority: 'low', description: 'Description 3', status: 'done', created: new Date(), deadline: new Date() }
            ];

            // Call sortItemsByPriority with descending order
            const sortedItems = sortItemsByPriority(items, 'desc');

            // Check the order of the items based on priority
            expect(sortedItems[0].title).toBe('Todo 2'); // high priority first
            expect(sortedItems[1].title).toBe('Todo 1'); // medium priority second
            expect(sortedItems[2].title).toBe('Todo 3'); // low priority last
        });
    });
});