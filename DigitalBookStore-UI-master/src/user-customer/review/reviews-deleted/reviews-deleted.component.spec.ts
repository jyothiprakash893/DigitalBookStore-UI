import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsDeletedComponent } from './reviews-deleted.component';

describe('ReviewsDeletedComponent', () => {
  let component: ReviewsDeletedComponent;
  let fixture: ComponentFixture<ReviewsDeletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewsDeletedComponent]
    });
    fixture = TestBed.createComponent(ReviewsDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
