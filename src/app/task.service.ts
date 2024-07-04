import { Injectable } from '@angular/core';
import * as TaskJson from './task_sample_data.json';
import { TaskData } from './taskdata';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskList = TaskJson;

  constructor() { }

  getAllTasks() {
    return this.taskList.tasks;
  }

  deleteTask(id: number) {
    const index = this.taskList.tasks.findIndex(t => t.id === id);
    this.taskList.tasks.splice(index, 1);
  }

  getTaskByID(id: string) {
    return this.taskList.tasks.find(t => t.id == Number(id)) ?? null;
  }

  createTask(task: TaskData) {
    this.taskList.tasks.push(task);
  }
}
