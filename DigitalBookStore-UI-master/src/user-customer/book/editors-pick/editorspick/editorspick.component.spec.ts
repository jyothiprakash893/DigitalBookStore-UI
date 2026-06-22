import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorspickComponent } from './editorspick.component';

describe('EditorspickComponent', () => {
  let component: EditorspickComponent;
  let fixture: ComponentFixture<EditorspickComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorspickComponent]
    });
    fixture = TestBed.createComponent(EditorspickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
