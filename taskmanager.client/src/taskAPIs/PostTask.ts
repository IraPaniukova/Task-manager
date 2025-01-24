import { I_AllTasks } from "./I_AllTasks";

export const PostTask = async (task: I_AllTasks) => {
  try {
    const response = await fetch("/api/Task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Failed to create item");
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};
