import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanworkoutexerciseDialogComponent } from './planworkoutexercise-dialog.component';

describe('PlanworkoutexerciseDialogComponent', () => {
  let component: PlanworkoutexerciseDialogComponent;
  let fixture: ComponentFixture<PlanworkoutexerciseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanworkoutexerciseDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanworkoutexerciseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
