import { Typography, Select, Stack, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { PostTask } from "../taskAPIs/PostTask";
import { I_AllTasks } from "../taskAPIs/I_AllTasks";
import { useState, useEffect } from "react";
import { FetchTaskById } from "../taskAPIs/FetchTaskById";
import { UpdateTask } from "../taskAPIs/UpdateTask";


interface AddOrEditTaskProps {
    setOpenTaskDialog: (value: boolean) => void;
    openAddTaskDialog: boolean
    setEdit: (value: boolean) => void;
    edit: boolean
    taskId: number|null
    setTaskId: (value: number | null) => void;
}

export const AddOrEditTask: React.FC<AddOrEditTaskProps> = ({ setOpenTaskDialog, openAddTaskDialog, setEdit, edit, taskId, setTaskId }) => {
   
    const statusOptions = ["Pending", "InProgress", "Complete"];
    const priorityOptions = ["VeryHigh", "High", "Medium", "Low", "Skip"];
    const [status, setStatus] = useState<string>("");
    const [priority, setPriority] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const dueDate = formJson['dueDate'] as string
        const [day, month, year] = dueDate.split('/');
        const formattedDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`).toISOString();
        const taskData: I_AllTasks = {
            id: taskId ?? 0,
            title: (formJson['title'] as string).trim(),
            description: (formJson['description'] as string).trim(),
            dueDate: formattedDate,
            priority: formJson['priority'] as string,
            status: formJson['status'] as string,
        };
        if (taskId) { await UpdateTask(taskId,taskData); }
        else {  await PostTask(taskData); }
        setOpenTaskDialog(false);
    };
    const [date, setDate] = useState('');
    const [isDateValid, setIsDateValid] = useState(true);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setDate(input);
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        setIsDateValid(regex.test(input));
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
        <Dialog open={openAddTaskDialog} >
            <DialogTitle>Add new task</DialogTitle>
            <DialogContent>
                {taskId ? <DialogContentText>Please edit task's details.</DialogContentText> :
                    <DialogContentText>Please add task's details.</DialogContentText>
                }
                <form onSubmit={handleSubmit}>
                    <Stack spacing={1} sx={{ minWidth: 500 }}>
                        {taskId ?
                            <Typography variant="caption">Title*: Current: {taskId ? (dataById ? dataById.title : '') : ''}</Typography>:
                            <Typography variant="caption">Title*: </Typography>}

                        <TextField
                            required
                            name="title"
                        />
                        <Typography variant="caption">Description:</Typography>
                        <TextField
                            multiline
                            rows={3}
                            defaultValue={taskId ? (dataById ? dataById.description : '') : ''}                           
                            name="description"
                        />
                        {taskId ?
                            <Typography variant="caption">Status*: Current: {taskId ? (dataById ? dataById.status : '') : ''}</Typography> :
                            <Typography variant="caption">Status*:</Typography>}
                        <Select
                            required
                            labelId="status-label"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            name="status"
                        >
                            {statusOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                        {taskId?
                            <Typography variant="caption">Priority*: Current: { taskId?(dataById? dataById.priority : '') : ''}</Typography>:
                        <Typography variant="caption">Priority*:</Typography>}
                        <Select
                            required
                            labelId="priority-label"
                            value={priority}
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
                        {taskId ? <Typography variant="caption">Due Date (dd/mm/yyyy)*:
                            Current: {taskId ? (dataById ? dataById.dueDate?.slice(0, 10) : '') : ''}</Typography> :
                            <Typography variant="caption">Due Date (dd/mm/yyyy)*:</Typography>}
                        <TextField
                            required
                            value={date}
                            onChange={handleDateChange}
                            error={!isDateValid}
                            helperText={!isDateValid ? "Maintain the date format, please" : ""}
                            name="dueDate"

                        />
                    </Stack>
                    <DialogActions>
                        <Button onClick={() => onCloseClick()}><ClearIcon /></Button>
                        {edit ?
                            <Button type="submit">Update</Button> :
                            <Button type="submit">Submit</Button>                  
                       }
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}
