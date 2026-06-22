import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsByUserIdComponent } from './reviews-by-user-id.component';

describe('ReviewsByUserIdComponent', () => {
  let component: ReviewsByUserIdComponent;
  let fixture: ComponentFixture<ReviewsByUserIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewsByUserIdComponent]
    });
    fixture = TestBed.createComponent(ReviewsByUserIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
