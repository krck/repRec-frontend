import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutSelectionDialogComponent } from './workout-selection-dialog.component';

describe('WorkoutSelectionDialogComponent', () => {
  let component: WorkoutSelectionDialogComponent;
  let fixture: ComponentFixture<WorkoutSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutSelectionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
