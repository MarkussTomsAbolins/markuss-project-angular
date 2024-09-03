import { Injectable } from '@angular/core';
//import * as TaskJson from './task_sample_data.json';
import { TaskData, TaskList } from './taskdata';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskListSubject: BehaviorSubject<TaskData[]> = new BehaviorSubject<TaskData[]>([]);

  taskList$: Observable<TaskData[]> = this.taskListSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTasksFromAPI();
  }

  get taskList() {
    return this.taskListSubject.getValue();
  }

  set taskList(newTasks: TaskData[]) {
    this.taskListSubject.next(newTasks);
  }

  deleteTask(id: number) {
    this.http.delete(`http://localhost:3001/removeTask/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting task:', error);
          return [];
        })
      )
      .subscribe({
        next: () => {
          this.taskList = this.taskList.filter(item => item.id !== id);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  getTaskByID(id: string): Observable<TaskData | null> {
    return this.http.get<TaskData>(`http://localhost:3001/task/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching task:', error);
          return [null];
        })
      );
  }

  createTask(task: TaskData) {
    this.http.post(`http://localhost:3001/createTask`, task)
      .pipe(
        catchError((error) => {
          console.error('Error creating task:', error);
          return [];
        })
      )
      .subscribe({
        next: () => {
          this.taskList = [...this.taskList, task];
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  private loadTasksFromAPI() {
    this.http.get<TaskList>("http://localhost:3001/allTasks/")
      .pipe(
        catchError((error) => {
          console.error('Error fetching tasks from API:', error);
          return [];
        })
      )
      .subscribe({
        next: (response: TaskList) => {
          this.taskList = response.tasks;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Task loading complete');
        }
      });
  }
}
