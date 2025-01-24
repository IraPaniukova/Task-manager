
import { useState } from 'react';
import './App.css';
import { ViewAllTasks } from './viewAllTasks/ViewAllTasks';
import { AddOrEditTask } from './addOrEditTask/AddOrEditTask';



function App() {
    const [openAddTaskDialog, setOpenTaskDialog] = useState(false);
    const [edit, setEdit] = useState(false);
    const [taskId, setTaskId] = useState<number | null>(null);

    return (
        <>
            <ViewAllTasks setOpenTaskDialog={setOpenTaskDialog} setEdit={setEdit} setTaskId={setTaskId} />
            {openAddTaskDialog && <AddOrEditTask setOpenTaskDialog={setOpenTaskDialog} openAddTaskDialog={openAddTaskDialog} setEdit={setEdit} edit={edit} taskId={taskId} setTaskId={setTaskId} />}
        </>
    );


}

export default App;