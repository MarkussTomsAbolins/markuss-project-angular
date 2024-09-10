import { ChangeDetectorRef, Component } from '@angular/core';
import * as TaskJson from '../task_sample_data.json';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';
import { TaskData } from '../taskdata';


@Component({
  selector: 'app-task-displayer',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, RouterOutlet],
  templateUrl: './task-displayer.component.html',
  styleUrl: './task-displayer.component.scss'
})
export class TaskDisplayerComponent {

  taskList$: Observable<TaskData[]> = this.taskService.taskList$;



  constructor(private taskService: TaskService) {
    this.taskService.taskList$.subscribe({
      next: (tasks: TaskData[]) => {
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.taskService.loadTasksFromAPI();
  };

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }


}
