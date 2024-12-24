import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOptionsExercisecategoryComponent } from './admin-options-exercisecategory.component';

describe('AdminOptionsExercisecategoryComponent', () => {
  let component: AdminOptionsExercisecategoryComponent;
  let fixture: ComponentFixture<AdminOptionsExercisecategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOptionsExercisecategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminOptionsExercisecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
