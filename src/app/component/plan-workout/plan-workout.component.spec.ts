import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanWorkoutComponent } from './plan-workout.component';

describe('PlanWorkoutComponent', () => {
  let component: PlanWorkoutComponent;
  let fixture: ComponentFixture<PlanWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanWorkoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
