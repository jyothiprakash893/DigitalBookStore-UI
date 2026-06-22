import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCarouselComponent } from './book-carousel.component';

describe('BookCarouselComponent', () => {
  let component: BookCarouselComponent;
  let fixture: ComponentFixture<BookCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCarouselComponent]
    });
    fixture = TestBed.createComponent(BookCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
