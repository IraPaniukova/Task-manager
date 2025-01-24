export interface AppProps {
    edit: boolean;
    setEdit: (value: boolean) => void;
    taskId: number | null;
    setTaskId: (value: number | null) => void;
    openAddTaskDialog: boolean
    setOpenTaskDialog: (value: boolean) => void;
    statusFiter: boolean;
    setStatusFiter: (value: boolean) => void;
    priorityFiter: boolean;
    setPriorityFiter: (value: boolean) => void;
    dueDateFiter: boolean;
    setDueDateFiter: (value: boolean) => void;
    status: string;
    setStatus: (value: string) => void;
    priority: string;
    setPriority: (value: string) => void;

}