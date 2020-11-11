import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportContentPartComponent } from './user-report-content-part.component';

describe('UserReportContentPartComponent', () => {
  let component: UserReportContentPartComponent;
  let fixture: ComponentFixture<UserReportContentPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReportContentPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReportContentPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
