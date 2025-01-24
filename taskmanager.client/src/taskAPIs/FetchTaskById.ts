import { I_AllTasks } from "./I_AllTasks";

export const FetchTaskById = async (id: number): Promise<I_AllTasks> => {
    try {
        const response = await fetch(`/api/Task/${id}`);
        if (!response.ok) {
            throw new Error('Failed to get task');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching task:', error);
        return {} as I_AllTasks;
    }
};
