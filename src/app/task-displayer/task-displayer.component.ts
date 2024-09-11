import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';
import { TaskList } from '../taskdata';


@Component({
  selector: 'app-task-displayer',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, RouterOutlet],
  templateUrl: './task-displayer.component.html',
  styleUrl: './task-displayer.component.scss'
})
export class TaskDisplayerComponent {

  taskList$: Observable<TaskList>;

  constructor(private taskService: TaskService) {
    this.taskList$ = this.taskService.loadTasksFromAPI();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }


}
