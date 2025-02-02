
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import App from '../App';

vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
            { "id": 1, "title": "Work on app", "description": "Work harder", "dueDate": "2025-02-16T00:00:00", "priority": "High", "status": "Completed" },
            { "id": 3, "title": "Relax", "description": "Do not work", "dueDate": "2025-02-24T00:00:00", "priority": "Low", "status": "InProgress" }
        ]),
    })
));

describe('ViewAllTasks', () => {
    beforeAll(() => {
        render(<App />);
    });
    it('renders Loading tasks phrase', () => {

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
    const values = ['Work on app', 'Do not work', '16/02/2025', '24/02/2025', 'High', 'Low', 'Completed', 'InProgress'];
    it.each(values)('renders table title', async (value) => {

        await waitFor(() => expect(screen.getByText(value)).toBeDefined());
    });

});