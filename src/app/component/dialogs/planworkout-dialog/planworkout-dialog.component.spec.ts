import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanworkoutDialogComponent } from './planworkout-dialog.component';

describe('PlanworkoutDialogComponent', () => {
  let component: PlanworkoutDialogComponent;
  let fixture: ComponentFixture<PlanworkoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanworkoutDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanworkoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
