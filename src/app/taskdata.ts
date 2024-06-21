export interface taskData {
    title: string;
    description: string;
    type: string;
    createdOn: Date;
    status: string;
    id: number;
}

export interface taskList{
    tasks: Array<taskData>;
}
