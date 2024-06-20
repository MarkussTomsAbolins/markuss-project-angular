import { Component } from '@angular/core';
import * as TaskJson from './task_sample_data.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-displayer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-displayer.component.html',
  styleUrl: './task-displayer.component.scss'
})
export class TaskDisplayerComponent {
  TaskList = TaskJson;

  DeleteTask(t:any){
    const index = this.TaskList.tasks.indexOf(t);
    this.TaskList.tasks.splice(index, 1);
  }
}
