import { I_AllTasks } from "./I_AllTasks";

export const FetchTasksByStatus = async (status: string): Promise<I_AllTasks[]> => {
    try {
        const response = await fetch(`api/TaskSearch/status/${status}`);
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
