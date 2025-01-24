export interface I_AllTasks {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  [key: string]: string | number | Date;
};
