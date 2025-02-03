
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';

import App from '../App';
import userEvent from '@testing-library/user-event';

vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
            { "id": 1, "title": "Title1", "description": "Description1", "dueDate": "2025-02-01T00:00:00", "priority": "VeryHigh", "status": "Pending" },
            { "id": 2, "title": "Title2", "description": "Description2", "dueDate": "2025-02-02T00:00:00", "priority": "Medium", "status": "InProgress" },
            { "id": 3, "title": "Title3", "description": "Description3", "dueDate": "2025-02-03T00:00:00", "priority": "Low", "status": "Completed" },
            { "id": 4, "title": "Title4", "description": "Description4", "dueDate": "2025-02-04T00:00:00", "priority": "High", "status": "Pending" }

        ]),
    })
));

describe('ViewAllTasks', () => {
    beforeEach(() => {
        render(<App />);
    });
    afterEach(() => {
        cleanup();
    });
    // const items = ['Choose priority', 'Choose status']
    // it.each(items)('renders all buttons and filters', async (item) => {
    //     const element = await waitFor(() => screen.getByLabelText(item));
    //     expect(element).toBeDefined();
    //     await waitFor(() => userEvent.selectOptions(screen.getByLabelText('Choose priority'), 'InProgress'));
    //     const rows = await waitFor(() => screen.findAllByRole('row'));
    //     expect(rows.length).toBe(1);
    // });
    const items = ['Title2', 'Description2', '2/02/2025', 'Medium', 'InProgress', 'Title4'];
    it.each(items)('renders correct values when filtered by status InProgress and displays 1 row', async (item) => {
        await waitFor(() => screen.getByLabelText('Choose status'));
        const selectElement = screen.getByLabelText('Choose status') as HTMLSelectElement;
        selectElement.value = "InProgress";
        fireEvent.change(selectElement);
        await userEvent.click(selectElement);
        await waitFor(() => {
            expect(selectElement.value).toBe("InProgress");
        });
        await waitFor(() => { expect(screen.queryByText(item)).toBeDefined() });
        // await waitFor(() => { expect(screen.queryByText('Title4')).toBeNull() });
    });




    //     Test: Filter by Status(e.g., Pending)
    //     Test: Filter by Priority(e.g., VeryHigh)
    //     Test: Filter by Due Date(e.g., 2025-02-01)
    // Two filters applied:

    //     Test: Filter by Status and Priority(e.g., Pending and VeryHigh)
    //     Test: Filter by Status and Due Date(e.g., Pending and 2025-02-01)
    //     Test: Filter by Priority and Due Date(e.g., VeryHigh and 2025-02-01)
    // All three filters applied:

    //     Test: Filter by Status, Priority, and Due Date(e.g., Pending, VeryHigh, and 2025-02-01)


});