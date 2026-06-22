import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsByBookIdComponent } from './reviews-by-book-id.component';

describe('ReviewsByBookIdComponent', () => {
  let component: ReviewsByBookIdComponent;
  let fixture: ComponentFixture<ReviewsByBookIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewsByBookIdComponent]
    });
    fixture = TestBed.createComponent(ReviewsByBookIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
