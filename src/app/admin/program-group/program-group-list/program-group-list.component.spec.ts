import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramGroupListComponent } from './program-group-list.component';

describe('ProgramGroupListComponent', () => {
  let component: ProgramGroupListComponent;
  let fixture: ComponentFixture<ProgramGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
