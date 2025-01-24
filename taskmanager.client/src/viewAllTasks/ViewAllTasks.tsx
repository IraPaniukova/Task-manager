
import { Button, Typography, Stack, Tooltip, Select, MenuItem } from "@mui/material";
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

interface ViewAllTasksProps {
    appProps: AppProps;
}

export const ViewAllTasks: React.FC<ViewAllTasksProps> = ({appProps}) => {
    const { edit, setEdit, taskId, setTaskId, openAddTaskDialog, setOpenTaskDialog, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, dueDateFiter, setDueDateFiter, status, setStatus,priority, setPriority } = appProps;


    const tasks = FetchTasks();
    if (tasks.length === 0) {
        return <Typography>Loading tasks...</Typography>;
    }
    const headers = ['#', 'Task', 'Description', 'Due Date', 'Priority', 'Status'];

    
    const onEditClick = (id:number) => {
        setOpenTaskDialog(true);
        setEdit(true);
        setTaskId(id);
    }

    return (
        <Stack spacing={2}>
            <Stack direction='row' justifyContent="space-between">
                <Typography variant='h5'>My List of Tasks</Typography>
                <Select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    {priorityOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    value={status_hmm}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                <Button onClick={()=>setOpenTaskDialog(true)}> Add new</Button>
            </Stack>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                    <TableHead >
                        {headers.map((key) => (
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }} key={key}>{key}</TableCell>
                        ))}
                        <TableCell sx={{ backgroundColor: '#f5f5f5' }} />

                    </TableHead>
                    {tasks.map((task) => (
                        <TableRow key={task.id}>
                            {Object.keys(task).map((key) =>
                                <TableCell key={key}>
                                    {key === 'dueDate' || key == 'createdDate' ?
                                        new Date(task[key]).toLocaleDateString() :
                                        task[key] as React.ReactNode}
                                </TableCell>
                            )}
                            <TableCell>
                                <Tooltip title={`Edit task ${task.title}`} arrow>
                                    <Button onClick={()=>onEditClick(task.id)}>
                                        <ModeEditIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title={`Delete task ${task.title}`} arrow>
                                    <Button
                                        onClick={()=> DeleteTask(task.id)}
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