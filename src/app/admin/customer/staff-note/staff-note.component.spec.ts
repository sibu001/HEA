import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffNoteComponent } from './staff-note.component';

describe('StaffNoteComponent', () => {
  let component: StaffNoteComponent;
  let fixture: ComponentFixture<StaffNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
