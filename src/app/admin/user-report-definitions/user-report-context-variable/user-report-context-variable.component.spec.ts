import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportContextVariableComponent } from './user-report-context-variable.component';

describe('UserReportContextVariableComponent', () => {
  let component: UserReportContextVariableComponent;
  let fixture: ComponentFixture<UserReportContextVariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReportContextVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReportContextVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
