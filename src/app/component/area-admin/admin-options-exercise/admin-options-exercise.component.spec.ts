import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOptionsExerciseComponent } from './admin-options-exercise.component';

describe('AdminOptionsExerciseComponent', () => {
  let component: AdminOptionsExerciseComponent;
  let fixture: ComponentFixture<AdminOptionsExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOptionsExerciseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminOptionsExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
