import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealOfTheDayComponent } from './deal-of-the-day.component';

describe('DealOfTheDayComponent', () => {
  let component: DealOfTheDayComponent;
  let fixture: ComponentFixture<DealOfTheDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DealOfTheDayComponent]
    });
    fixture = TestBed.createComponent(DealOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
