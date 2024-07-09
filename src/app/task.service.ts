import { Injectable } from '@angular/core';
import * as TaskJson from './task_sample_data.json';
import { TaskData, TaskList } from './taskdata';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskListSubject: BehaviorSubject<TaskData[]> = new BehaviorSubject<TaskData[]>(TaskJson.tasks);

  taskList$: Observable<TaskData[]> = this.taskListSubject.asObservable();

  get taskList() {
    return this.taskListSubject.getValue();
  }

  set taskList(newTasks: TaskData[]) {
    this.taskListSubject.next(newTasks);
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
