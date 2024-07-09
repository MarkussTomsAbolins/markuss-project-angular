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
  constructor(private route: ActivatedRoute, private taskService: TaskService) { };

  taskList = TaskJson;
  curTask: TaskData | null = null;

  ngOnInit() {
    var id = this.route.snapshot.params['id'];
    this.curTask = this.taskService.getTaskByID(id);
  }

}
