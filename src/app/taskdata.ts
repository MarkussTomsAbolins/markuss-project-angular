export interface taskData {
    Title: string;
    Description: string;
    Type: string;
    CreatedOn: Date;
    Status: string;
}

export interface taskList{
    tasks: Array<taskData>;
}
