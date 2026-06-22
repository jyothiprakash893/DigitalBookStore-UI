import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReturnProcessComponent } from './admin-return-process.component';

describe('AdminReturnProcessComponent', () => {
  let component: AdminReturnProcessComponent;
  let fixture: ComponentFixture<AdminReturnProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReturnProcessComponent]
    });
    fixture = TestBed.createComponent(AdminReturnProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
