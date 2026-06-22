import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBannersComponent } from './book-banners.component';

describe('BookBannersComponent', () => {
  let component: BookBannersComponent;
  let fixture: ComponentFixture<BookBannersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookBannersComponent]
    });
    fixture = TestBed.createComponent(BookBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
