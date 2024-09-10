import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskData } from '../taskdata';
import { TaskService } from '../task.service';
import { takeUntil } from "rxjs/operators"
import { Subject } from "rxjs"

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',

})

export class TaskDetailsComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();
  curTask: TaskData | null = null;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.taskService.getTaskByID(id).pipe(takeUntil(this.componentDestroyed$)).subscribe({
      next: (task) => {
        this.curTask = task;
      },
      error: (error) => {
        console.error('Error fetching task:', error);
      }
    });
  }
}
