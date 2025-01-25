export interface AppProps {
  edit: boolean;
  setEdit: (value: boolean) => void;
  taskId: number | null;
  setTaskId: (value: number | null) => void;
  openTaskDialog: boolean;
  setOpenTaskDialog: (value: boolean) => void;
}
