import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CreateTaskComponent} from './create-task/create-task.component';
import { TaskDisplayerComponent } from './task-displayer/task-displayer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateTaskComponent, TaskDisplayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'markuss-project';
}
