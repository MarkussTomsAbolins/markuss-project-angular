import { Injectable } from '@angular/core';
import { TaskData, TaskList } from './taskdata';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskListSubject: BehaviorSubject<TaskData[]> = new BehaviorSubject<TaskData[]>([]);

  taskList$: Observable<TaskData[]> = this.taskListSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  get taskList() {
    return this.taskListSubject.getValue();
  }

  set taskList(newTasks: TaskData[]) {
    this.taskListSubject.next(newTasks);
  }

  deleteTask(id: number) {
    this.http.delete(environment.apiUrl + `/removeTask/${id}`)
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
    return this.http.get<TaskData>(environment.apiUrl + `/task/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching task:', error);
          return [null];
        })
      );
  }

  createTask(task: TaskData) {
    this.http.post(environment.apiUrl + `/createTask`, task)
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

  async loadTasksFromAPI() {
    try {
      const response: TaskList = await firstValueFrom(
        this.http.get<TaskList>(environment.apiUrl + "/allTasks/").pipe(
          catchError((error) => {
            console.error('Error from BE:', error);
            throw error;
          })
        )
      );
      this.taskList = response.tasks;
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
