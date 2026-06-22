import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditReviewComponent } from './view-edit-review.component';

describe('ViewEditReviewComponent', () => {
  let component: ViewEditReviewComponent;
  let fixture: ComponentFixture<ViewEditReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEditReviewComponent]
    });
    fixture = TestBed.createComponent(ViewEditReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
