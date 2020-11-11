import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportDefinitionsComponent } from './user-report-definitions.component';

describe('UserReportDefinitionsComponent', () => {
  let component: UserReportDefinitionsComponent;
  let fixture: ComponentFixture<UserReportDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReportDefinitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReportDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
