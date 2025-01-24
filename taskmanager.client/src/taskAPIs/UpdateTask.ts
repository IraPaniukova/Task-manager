import { I_AllTasks } from "./I_AllTasks";

export const UpdateTask = async (id:number,task: I_AllTasks) => {
    try {
        const response = await fetch(`/api/Task/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error("Failed to update item");
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
};
