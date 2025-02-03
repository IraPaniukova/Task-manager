
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
            { "id": 1, "title": "Title1", "description": "Description1", "dueDate": "2025-02-16T00:00:00", "priority": "High", "status": "Completed" },
            { "id": 3, "title": "Title2", "description": "Description2", "dueDate": "2025-02-24T00:00:00", "priority": "Low", "status": "InProgress" }
        ]),
    })
));

describe('ViewAllTasks', () => {
    beforeAll(() => {
        render(<App />);
    });

    it('renders loading phrase', () => {
        const textElement = screen.getByText(/Loading tasks.../i);
        expect(textElement).toBeDefined();
    });

    it('renders page title', async () => {
        const textElement = await screen.findByText(/My List of Tasks/i);
        expect(textElement).toBeDefined();
    });

    const titles = ['#', 'Task', 'Description', 'Due Date', 'Priority', 'Status']
    it.each(titles)('renders table title', async (title) => {
        const textElement = await screen.findByText(title);
        expect(textElement).toBeDefined();
    });

    const values = ['Title1', 'Title2', 'Description1', 'Description2', '16/02/2025', '24/02/2025', 'High', 'Low', 'Completed', 'InProgress'];
    it.each(values)('renders table values', async (value) => {
        await waitFor(() => expect(screen.getByText(value)).toBeDefined());
    });

    const items = ['Clear filters', 'Add task', 'Edit task 1', 'Delete task 1', 'Edit task 3', 'Delete task 3', 'Choose due date', 'Choose priority', 'Choose status']
    it.each(items)('renders all buttons and filters', async (item) => {
        const element = await screen.getByLabelText(item);
        expect(element).toBeDefined();
    });
});
