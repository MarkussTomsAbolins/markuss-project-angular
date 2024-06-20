import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDisplayerComponent } from './task-displayer.component';

describe('TaskDisplayerComponent', () => {
  let component: TaskDisplayerComponent;
  let fixture: ComponentFixture<TaskDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDisplayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
