import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateReviewComponent } from './add-update-review.component';

describe('AddUpdateReviewComponent', () => {
  let component: AddUpdateReviewComponent;
  let fixture: ComponentFixture<AddUpdateReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateReviewComponent]
    });
    fixture = TestBed.createComponent(AddUpdateReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
