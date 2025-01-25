
import { TextField, Button, Typography, Stack, Tooltip, Select, MenuItem } from "@mui/material";
import { FetchTasks } from "../taskAPIs/FetchTasks";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import { DeleteTask } from "../taskAPIs/DeleteTask";
import { AppProps } from "../AppProps";
import { priorityOptions, statusOptions } from "../constants";
import { useState } from "react";

interface ViewAllTasksProps {
    appProps: AppProps;
}

export const ViewAllTasks: React.FC<ViewAllTasksProps> = ({ appProps }) => {
    const { setEdit, setTaskId, setOpenTaskDialog} = appProps;
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");   
    const [dueDate, setDueDate] = useState('');

    const tasks = FetchTasks();
    if (tasks.length === 0) {
        return <Typography>Loading tasks...</Typography>;
    }
    const headers = ['#', 'Task', 'Description', 'Due Date', 'Priority', 'Status'];

    const filteredTasks = tasks.filter(task => (status ? task.status === status : true))
        .filter(task => (priority ? task.priority === priority : true))
        .filter(task => (dueDate ? task.dueDate.slice(0, 10) === dueDate: true));

    const onEditClick = (id: number) => {
        setOpenTaskDialog(true);
        setEdit(true);
        setTaskId(id);
    }

    return (
        
        <Stack spacing={2}>
            <Typography variant='h3' sx={{ pb: 3, color: 'primary.main' }}>My List of Tasks</Typography>
            <Stack direction='row' justifyContent="space-between" sx={{ height: 40, boxShadow: 3, p:1 }}  >       
                <TextField sx={{ '& .MuiInputBase-root': {height: '40px',},  }} 
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}           
                    name="dueDate"
                />
                <Select
                    displayEmpty
                    value={priority||''}
                    onChange={(e) => setPriority(e.target.value)}
                    sx={{ minWidth: 120 }}  
                >
                    <MenuItem value=''>All priorities</MenuItem>
                    {priorityOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    displayEmpty
                    value={status||''}
                    onChange={(e) => setStatus(e.target.value)}
                    sx={{ minWidth: 120 }}  
                >
                    <MenuItem value=''>All statuses</MenuItem>
                    {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                <Button variant='outlined' onClick={() => setOpenTaskDialog(true)}> Add new</Button>
            </Stack>
            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                    <TableHead >
                        {headers.map((key) => (
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }} key={key}>{key}</TableCell>
                        ))}
                        <TableCell sx={{ backgroundColor: '#f5f5f5' }} />
                    </TableHead>

                    {(status || priority || dueDate ? filteredTasks : tasks).map((task) => (
                        <TableRow key={task.id}>
                            {Object.keys(task).map((key) =>
                                <TableCell key={key}>
                                    {key === 'dueDate'  ?
                                        new Date(task[key]).toLocaleDateString() :
                                        task[key] as React.ReactNode}
                                </TableCell>
                            )}
                            <TableCell>
                                <Tooltip title={`Edit task ${task.title}`} arrow>
                                    <Button onClick={() => onEditClick(task.id)}>
                                        <ModeEditIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title={`Delete task ${task.title}`} arrow>
                                    <Button
                                        onClick={() => DeleteTask(task.id)}
                                    >
                                        <ClearIcon />
                                    </Button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}

                    <TableBody>
                    </TableBody>
                </Table>
            </TableContainer >
        </Stack>
    );
};