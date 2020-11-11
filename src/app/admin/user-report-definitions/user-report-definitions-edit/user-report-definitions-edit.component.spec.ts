import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportDefinitionsEditComponent } from './user-report-definitions-edit.component';

describe('UserReportDefinitionsEditComponent', () => {
  let component: UserReportDefinitionsEditComponent;
  let fixture: ComponentFixture<UserReportDefinitionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReportDefinitionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReportDefinitionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
