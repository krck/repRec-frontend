import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingYearComponent } from './training-year.component';

describe('TrainingYearComponent', () => {
  let component: TrainingYearComponent;
  let fixture: ComponentFixture<TrainingYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
