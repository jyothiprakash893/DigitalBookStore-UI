import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebookComponent } from './deletebook.component';

describe('DeletebookComponent', () => {
  let component: DeletebookComponent;
  let fixture: ComponentFixture<DeletebookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletebookComponent]
    });
    fixture = TestBed.createComponent(DeletebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
