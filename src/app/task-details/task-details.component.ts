import { Component, Input, OnInit } from '@angular/core';
import * as TaskJson from '../task_sample_data.json';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',

})
export class TaskDetailsComponent implements OnInit {
  @Input() id?: string;
  constructor(private route: ActivatedRoute) { };

  taskList = TaskJson;
  curTask: any;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.curTask = this.taskList.tasks.find(t => t.id == Number(this.id));
  }

}
