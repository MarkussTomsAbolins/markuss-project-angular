import { Routes } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDisplayerComponent } from './task-displayer/task-displayer.component';
import { LandingComponent } from './landing/landing.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

export const routes: Routes = [
    { path: '', component: LandingComponent},
    { path: 'create-task', component: CreateTaskComponent },
    { path: 'task-displayer', component: TaskDisplayerComponent },
    {path: 'task-details/:id', component: TaskDetailsComponent}
];
