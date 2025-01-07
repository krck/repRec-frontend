import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanWorkoutDetailsComponent } from './plan-workout-details.component';

describe('PlanWorkoutDetailsComponent', () => {
  let component: PlanWorkoutDetailsComponent;
  let fixture: ComponentFixture<PlanWorkoutDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanWorkoutDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanWorkoutDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
