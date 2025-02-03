import { Select, Stack, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { PostTask } from "../taskAPIs/PostTask";
import { I_AllTasks } from "../taskAPIs/I_AllTasks";
import { useState, useEffect } from "react";
import { FetchTaskById } from "../taskAPIs/FetchTaskById";
import { UpdateTask } from "../taskAPIs/UpdateTask";
import { AppProps } from "../AppProps";
import { statusOptions, priorityOptions } from "../constants";

interface AddOrEditTaskProps {
    appProps: AppProps;
}

export const AddOrEditTask: React.FC<AddOrEditTaskProps> = ({ appProps }) => {
    const { edit, setEdit, taskId, setTaskId, openTaskDialog, setOpenTaskDialog, reload, setReload } = appProps;
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState('');
    const [title, setTitle] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const dueDate = formJson['dueDate'] as string
        const taskData: I_AllTasks = {
            id: taskId ?? 0,
            title: (formJson['title'] as string).trim(),
            description: (formJson['description'] as string).trim(),
            dueDate: dueDate,
            priority: formJson['priority'] as string,
            status: formJson['status'] as string,
        };
        if (taskId) {
            await UpdateTask(taskId, taskData);
            setTaskId(null);
        }
        else { await PostTask(taskData); }
        setOpenTaskDialog(false);
        setReload(!reload);
    };

    const onCloseClick = () => {
        setOpenTaskDialog(false);
        setEdit(false);
        setTaskId(null);
    }

    const [dataById, setDataById] = useState<I_AllTasks>({} as I_AllTasks);
    useEffect(() => {
        if (taskId !== null) {
            const fetchData = async () => {
                const data = await FetchTaskById(taskId);
                setDataById(data);
            };
            fetchData();
        }
    }, [taskId]);


    return (
        <Dialog open={openTaskDialog} >
            <DialogTitle>
                <Stack direction='row' justifyContent="space-between">
                    {taskId ? 'Edit Task' : 'New Task'}
                    <Button variant='outlined' onClick={() => onCloseClick()}><ClearIcon /></Button>
                </Stack>
            </DialogTitle>
            <DialogContent>
                {taskId ? <DialogContentText sx={{ mb: 2 }}>Please edit task's details.</DialogContentText> :
                    <DialogContentText sx={{ mb: 2 }}>Please add task's details.</DialogContentText>
                }
                <form onSubmit={handleSubmit}>
                    <Stack spacing={1} sx={{ minWidth: 500 }}>
                        <TextField
                            required
                            name="title"
                            label="Title"
                            multiline
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ maxLength: 100 }}
                            value={title || dataById?.title || ''}
                            defaultValue={taskId ? dataById?.title : ''}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            label="Description"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ maxLength: 250 }}
                            multiline
                            rows={3}
                            defaultValue={taskId ? dataById?.description : ''}
                            name="description"
                        />
                        <Select
                            required
                            labelId="status-label"
                            value={status || dataById.status || statusOptions[0]}
                            onChange={(e) => setStatus(e.target.value)}
                            name="status"
                        >
                            {statusOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            required
                            labelId="priority-label"
                            value={priority || dataById.priority || priorityOptions[0]}
                            onChange={(e) => setPriority(e.target.value)}
                            label="priority"
                            name="priority"
                        >
                            {priorityOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField
                            label="Due date"
                            InputLabelProps={{ shrink: true }}
                            required
                            type='date'
                            value={dueDate || dataById.dueDate?.slice(0, 10) || ''}
                            defaultValue={taskId ? dataById.dueDate?.slice(0, 10) : dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            name="dueDate"
                        />
                    </Stack>
                    <DialogActions>
                        {edit ?
                            <Button type="submit" variant='outlined'>Update</Button> :
                            <Button type="submit" variant='outlined'>Submit</Button>
                        }
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}
