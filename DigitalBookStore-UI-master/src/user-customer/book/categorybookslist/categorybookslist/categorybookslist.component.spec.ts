import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorybookslistComponent } from './categorybookslist.component';

describe('CategorybookslistComponent', () => {
  let component: CategorybookslistComponent;
  let fixture: ComponentFixture<CategorybookslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorybookslistComponent]
    });
    fixture = TestBed.createComponent(CategorybookslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
