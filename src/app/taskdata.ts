export interface TaskData {
    title: string;
    description: string;
    type: string;
    createdOn: string;
    status: string;
    id: number;
}

export interface TaskList{
    tasks: TaskData[];
}
