import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbookidComponent } from './viewbookid.component';

describe('ViewbookidComponent', () => {
  let component: ViewbookidComponent;
  let fixture: ComponentFixture<ViewbookidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewbookidComponent]
    });
    fixture = TestBed.createComponent(ViewbookidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
