import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareWorkoutComponent } from './share-workout.component';

describe('ShareWorkoutComponent', () => {
  let component: ShareWorkoutComponent;
  let fixture: ComponentFixture<ShareWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareWorkoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
