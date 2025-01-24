import { I_AllTasks } from "./I_AllTasks";

export const FetchTasksByPriorityDueDate = async (dueDate: string): Promise<I_AllTasks[]> => {
    try {
        const dateObj = new Date(dueDate); 
        const formattedDate = dateObj.toISOString().split('T')[0]; // Converted to yyyy-mm-dd
        const response = await fetch(`api/TaskSearch/dueDate/${formattedDate}`);
        if (!response.ok) {
            throw new Error('Failed to get task');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching task:', error);
        return [] as I_AllTasks[];
    }
};
