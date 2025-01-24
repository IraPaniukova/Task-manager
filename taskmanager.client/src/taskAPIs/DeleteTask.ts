

export const DeleteTask = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`/api/Task/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

        console.log("Task deleted successfully");
    } catch (error) {
        console.error("Error:", error);
    }
};
