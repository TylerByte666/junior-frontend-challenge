import { describe, it, expect } from 'vitest';
import { createNewItem, updateItem, deleteItem, sortItemsByPriority } from '../utils/todoHelpers';
import { TodoItem } from '../types/TodoItem';

describe('todoHelpers', () => {
    const currentDate = new Date();

    describe('createNewItem', () => {
        it('should create a new todo item with the correct properties', () => {
            const newItem = createNewItem(
                'Test Todo',
                'Description of test todo',
                'to-do',
                currentDate,
                'high'
            );

            // Validate the properties of the created todo item
            expect(newItem).toHaveProperty('uuid'); // UUID is now required
            expect(typeof newItem.uuid).toBe('string'); // Check UUID is a string
            expect(newItem).toHaveProperty('title', 'Test Todo');
            expect(newItem).toHaveProperty('description', 'Description of test todo');
            expect(newItem).toHaveProperty('status', 'to-do');
            expect(newItem).toHaveProperty('priority', 'high');
            expect(newItem).toHaveProperty('created');
            expect(newItem.created).toBeInstanceOf(Date);
            // Check that the deadline is correctly set
            expect(newItem).toHaveProperty('deadline');
            expect(newItem.deadline).toEqual(currentDate);
        });
    });

    describe('updateItem', () => {
        const item1: TodoItem = {
            uuid: '1234',
            title: 'Old Item',
            description: 'Old Description',
            status: 'to-do',
            deadline: currentDate,
            priority: 'low',
            created: currentDate,
        };

        const updatedData: Partial<TodoItem> = {
            title: 'Updated Item',
            description: 'Updated Description',
            status: 'in progress',
            priority: 'high',
        };

        it('should update the todo item if it exists', () => {
            const updatedItems = updateItem([item1], '1234', updatedData);
            // Ensure the item is updated with new values
            expect(updatedItems[0]).toMatchObject({ ...item1, ...updatedData });
        });

        it('should not modify items if UUID does not match', () => {
            const updatedItems = updateItem([item1], '5678', updatedData);
            // Ensure the item is not modified
            expect(updatedItems).toHaveLength(1);
            expect(updatedItems[0]).toEqual(item1);
        });
    });

    describe('deleteItem', () => {
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
            const updatedItems = deleteItem(items, '1234');
            // Ensure the item with UUID '1234' is deleted
            expect(updatedItems).toHaveLength(1);
            expect(updatedItems[0]).toEqual(item2);
        });

        it('should not delete any item if UUID does not match', () => {
            const items = [item1, item2];
            const updatedItems = deleteItem(items, '9999');
            // Ensure no item is deleted
            expect(updatedItems).toHaveLength(2);
        });
    });

    describe('sortItemsByPriority', () => {
        it('should sort items by priority (highest to lowest)', () => {
            const items: TodoItem[] = [
                { uuid: '1', title: 'Todo 1', priority: 'medium', description: 'Description 1', status: 'in progress', created: new Date(), deadline: new Date() },
                { uuid: '2', title: 'Todo 2', priority: 'high', description: 'Description 2', status: 'in progress', created: new Date(), deadline: new Date() },
                { uuid: '3', title: 'Todo 3', priority: 'low', description: 'Description 3', status: 'done', created: new Date(), deadline: new Date() }
            ];

            const sortedItems = sortItemsByPriority(items, 'desc');

            // Ensure sorting by priority is correct
            expect(sortedItems[0].title).toBe('Todo 2'); // high priority first
            expect(sortedItems[1].title).toBe('Todo 1'); // medium priority second
            expect(sortedItems[2].title).toBe('Todo 3'); // low priority last
        });
    });
});