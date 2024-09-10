import { Injectable } from '@angular/core';
import { TaskData, TaskList } from './taskdata';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskListSubject: BehaviorSubject<TaskData[]> = new BehaviorSubject<TaskData[]>([]);

  taskList$: Observable<TaskData[]> = this.taskListSubject.asObservable();

  url = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

  get taskList() {
    return this.taskListSubject.getValue();
  }

  set taskList(newTasks: TaskData[]) {
    this.taskListSubject.next(newTasks);
  }

  deleteTask(id: number) {
    this.http.delete(this.url+`/removeTask/${id}`)
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
    return this.http.get<TaskData>(this.url + `/task/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching task:', error);
          return [null];
        })
      );
  }

  createTask(task: TaskData) {
    this.http.post(this.url + `/createTask`, task)
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

  loadTasksFromAPI() {
    this.http.get<TaskList>(this.url + "/allTasks/")
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
