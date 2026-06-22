import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewByBookIDComponent } from './view-by-book-id.component';

describe('ViewByBookIDComponent', () => {
  let component: ViewByBookIDComponent;
  let fixture: ComponentFixture<ViewByBookIDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewByBookIDComponent]
    });
    fixture = TestBed.createComponent(ViewByBookIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
