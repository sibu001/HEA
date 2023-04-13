import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsEditComponent } from './logs-edit.component';

describe('LogsEditComponent', () => {
  let component: LogsEditComponent;
  let fixture: ComponentFixture<LogsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
