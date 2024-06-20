import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { taskData, taskList } from '../taskdata';

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
      CreatedOn : new Date(),
      Title : this.taskForm.get("title")?.value || "-",
      Description : this.taskForm.get("description")?.value || "-",
      Status: this.taskForm.get("status")?.value || "-",
      Type : this.taskForm.get("type")?.value || "-"
    }
    
     this.taskList?.tasks.push(task);
  };
}


