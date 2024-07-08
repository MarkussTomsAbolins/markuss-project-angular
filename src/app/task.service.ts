import { Injectable } from '@angular/core';
import * as TaskJson from './task_sample_data.json';
import { TaskData, TaskList } from './taskdata';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskList: TaskList["tasks"];

  constructor() {
    this.taskList = TaskJson.tasks;
   }

  getAllTasks() {
    return this.taskList;
  }

  deleteTask(id: number) {
    this.taskList = this.taskList.filter(item => item.id !== id);
  }

  getTaskByID(id: string) {
    return this.taskList.find(t => t.id == Number(id)) ?? null;
  }

  createTask(task: TaskData) {
    this.taskList.push(task);
  }
}
