import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCrudComponent } from './tasks-crud.component';

describe('TasksCrudComponent', () => {
  let component: TasksCrudComponent;
  let fixture: ComponentFixture<TasksCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
