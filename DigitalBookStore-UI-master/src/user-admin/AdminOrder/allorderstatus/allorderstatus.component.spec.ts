import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllorderstatusComponent } from './allorderstatus.component';

describe('AllorderstatusComponent', () => {
  let component: AllorderstatusComponent;
  let fixture: ComponentFixture<AllorderstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllorderstatusComponent]
    });
    fixture = TestBed.createComponent(AllorderstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
