import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingWeekComponent } from './training-week.component';

describe('TrainingWeekComponent', () => {
  let component: TrainingWeekComponent;
  let fixture: ComponentFixture<TrainingWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingWeekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
