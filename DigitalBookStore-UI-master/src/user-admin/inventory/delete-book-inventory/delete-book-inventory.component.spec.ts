import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookInventoryComponent } from './delete-book-inventory.component';

describe('DeleteBookInventoryComponent', () => {
  let component: DeleteBookInventoryComponent;
  let fixture: ComponentFixture<DeleteBookInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteBookInventoryComponent]
    });
    fixture = TestBed.createComponent(DeleteBookInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
