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

            expect(newItem).toHaveProperty('title', 'Test Todo');
            expect(newItem).toHaveProperty('description', 'Description of test todo');
            expect(newItem).toHaveProperty('status', 'to-do');
            expect(newItem).toHaveProperty('priority', 'high');
            expect(newItem).toHaveProperty('created');
            expect(newItem.created).toBeInstanceOf(Date);
            expect(newItem).toHaveProperty('deadline');
            expect(newItem.deadline).toEqual(currentDate);
        });
    });

    describe('updateItem', () => {
        const item1: TodoItem = {
            title: 'Old Item',
            description: 'Old Description',
            status: 'to-do',
            deadline: currentDate,
            priority: 'low',
            created: currentDate,
        };

        const item2: TodoItem = {
            title: 'Updated Item',
            description: 'Updated Description',
            status: 'in progress',
            deadline: currentDate,
            priority: 'high',
            created: currentDate,
        };

        it('should update the todo item if it exists', () => {
            const updatedItems = updateItem([item1], item1, item2);
            expect(updatedItems[0]).toMatchObject(item2);
        });

        it('should add a new item if no item to edit', () => {
            const updatedItems = updateItem([item1], null, item2);
            expect(updatedItems).toHaveLength(2);
            expect(updatedItems[1]).toMatchObject(item2);
        });
    });

    describe('deleteItem', () => {
        const item1: TodoItem = {
            title: 'Todo 1',
            description: 'Description 1',
            status: 'to-do',
            deadline: currentDate,
            priority: 'low',
            created: currentDate,
        };

        const item2: TodoItem = {
            title: 'Todo 2',
            description: 'Description 2',
            status: 'in progress',
            deadline: currentDate,
            priority: 'medium',
            created: currentDate,
        };

        it('should delete the item at the specified index', () => {
            const items = [item1, item2];
            const updatedItems = deleteItem(items, 0);
            expect(updatedItems).toHaveLength(1);
            expect(updatedItems[0]).toEqual(item2);
        });
    });

    describe('sortItemsByPriority', () => {
        const item1: TodoItem = {
            title: 'Todo 1',
            description: 'Description 1',
            status: 'to-do',
            deadline: currentDate,
            priority: 'medium',
            created: currentDate,
        };

        const item2: TodoItem = {
            title: 'Todo 2',
            description: 'Description 2',
            status: 'in progress',
            deadline: currentDate,
            priority: 'high',
            created: currentDate,
        };

        const item3: TodoItem = {
            title: 'Todo 3',
            description: 'Description 3',
            status: 'done',
            deadline: currentDate,
            priority: 'low',
            created: currentDate,
        };

        it('should sort items by priority (highest to lowest)', () => {
            const items = [item1, item2, item3];
            const sortedItems = sortItemsByPriority(items);
            expect(sortedItems[0]).toEqual(item2); // High priority first
            expect(sortedItems[1]).toEqual(item1); // Medium priority second
            expect(sortedItems[2]).toEqual(item3); // Low priority last
        });
    });
});