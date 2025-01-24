
import { useState } from 'react';
import './App.css';
import { ViewAllTasks } from './viewAllTasks/ViewAllTasks';
import { AddOrEditTask } from './addOrEditTask/AddOrEditTask';
import { AppProps } from './AppProps';



function App() {
    const [openAddTaskDialog, setOpenTaskDialog] = useState(false);
    const [edit, setEdit] = useState(false);
    const [taskId, setTaskId] = useState<number | null>(null);
    const [statusFiter, setStatusFiter] = useState(false);
    const [priorityFiter, setPriorityFiter] = useState(false);
    const [dueDateFiter, setDueDateFiter] = useState(false);

    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");

    const appProps: AppProps = {
        edit, setEdit,
        taskId, setTaskId,
        openAddTaskDialog, setOpenTaskDialog,
        statusFiter, setStatusFiter,
        priorityFiter, setPriorityFiter,
        dueDateFiter, setDueDateFiter,
        status, setStatus,
        priority, setPriority
    };

    return (
        <>
            <ViewAllTasks appProps={appProps} />
            {openAddTaskDialog && <AddOrEditTask appProps={appProps} />}
        </>
    );
}

export default App;