import { useEffect, useState } from "react";
import { I_AllTasks } from "./I_AllTasks";

export const FetchTasks = () => {
    const [data, setData] = useState<I_AllTasks[]>([]);
    
    useEffect(() => {  
        async function fetchData() {
            const response = await fetch('/api/Task');
            if (response.ok) {
                const data = await response.json();
                setData(data);
            }
        }
    fetchData();
  }, [data]);

    
  return data;
};
