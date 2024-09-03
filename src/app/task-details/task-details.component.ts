import { Component, Input, OnInit } from '@angular/core';
import * as TaskJson from '../task_sample_data.json';
import { ActivatedRoute } from '@angular/router';
import { TaskData } from '../taskdata';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',

})

export class TaskDetailsComponent implements OnInit {
  curTask: TaskData | null = null;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.taskService.getTaskByID(id).subscribe({
      next: (task) => {
        this.curTask = task;
      },
      error: (error) => {
        console.error('Error fetching task:', error);
        this.curTask = null;
      }
    });
  }
}
