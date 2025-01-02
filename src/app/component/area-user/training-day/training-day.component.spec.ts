import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDayComponent } from './training-day.component';

describe('TrainingDayComponent', () => {
  let component: TrainingDayComponent;
  let fixture: ComponentFixture<TrainingDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
