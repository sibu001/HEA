import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramGroupEditComponent } from './program-group-edit.component';

describe('ProgramGroupEditComponent', () => {
  let component: ProgramGroupEditComponent;
  let fixture: ComponentFixture<ProgramGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
