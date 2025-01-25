
import { useState } from 'react';
import './App.css';
import { ViewAllTasks } from './viewAllTasks/ViewAllTasks';
import { AddOrEditTask } from './addOrEditTask/AddOrEditTask';
import { AppProps } from './AppProps';

function App() {
    const [openTaskDialog, setOpenTaskDialog] = useState(false);
    const [edit, setEdit] = useState(false);
    const [taskId, setTaskId] = useState<number | null>(null);

    const appProps: AppProps = {
        edit, setEdit,
        taskId, setTaskId,
        openTaskDialog, setOpenTaskDialog
    };

    return (
        <>
            <ViewAllTasks appProps={appProps} />
            {openTaskDialog && <AddOrEditTask appProps={appProps} />}
        </>
    );
}

export default App;