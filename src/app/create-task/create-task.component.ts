import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { taskData, taskList } from '../taskdata';
import { generate } from 'rxjs';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  
  taskList: taskList = {
    tasks :[]
  };

  taskForm= new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });
  
  CreateTask(){
    let task: taskData = {
      createdOn : new Date(),
      title : this.taskForm.get("title")?.value ?? "-",
      description : this.taskForm.get("description")?.value ?? "-",
      status: this.taskForm.get("status")?.value ?? "-",
      type : this.taskForm.get("type")?.value ?? "-",
      id : Math.floor(Math.random() * (999999 - 9999) + 9999),
    }
    
     this.taskList?.tasks.push(task);
  };
}


