import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisecategoryDialogComponent } from './exercisecategory-dialog.component';

describe('ExercisecategoryDialogComponent', () => {
  let component: ExercisecategoryDialogComponent;
  let fixture: ComponentFixture<ExercisecategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisecategoryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExercisecategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
