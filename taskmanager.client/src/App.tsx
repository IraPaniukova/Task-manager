
import { useState } from 'react';
import './App.css';
import { ViewAllTasks } from './viewAllTasks/ViewAllTasks';
import { AddOrEditTask } from './addOrEditTask/AddOrEditTask';
import { AppProps } from './AppProps';

function App() {
    const [openTaskDialog, setOpenTaskDialog] = useState(false);
    const [edit, setEdit] = useState(false);
    const [taskId, setTaskId] = useState<number | null>(null);
    const [reload, setReload] = useState(false);

    const appProps: AppProps = {
        edit, setEdit,
        taskId, setTaskId,
        openTaskDialog, setOpenTaskDialog,
        reload, setReload
    };

    return (
        <>
            <ViewAllTasks appProps={appProps} />
            {openTaskDialog && <AddOrEditTask appProps={appProps} />}
        </>
    );
}

export default App;