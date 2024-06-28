import { Component } from '@angular/core';
import * as TaskJson from '../task_sample_data.json';
import { CommonModule } from '@angular/common';
import { taskData } from '../taskdata';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-task-displayer',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, RouterOutlet],
  templateUrl: './task-displayer.component.html',
  styleUrl: './task-displayer.component.scss'
})
export class TaskDisplayerComponent {
  taskList = TaskJson;

  deleteTask(id: number) {
    const index = this.taskList.tasks.findIndex(t => t.id === id);
    this.taskList.tasks.splice(index, 1);
  }
}
