import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportPreviewComponent } from './user-report-preview.component';

describe('UserReportPreviewComponent', () => {
  let component: UserReportPreviewComponent;
  let fixture: ComponentFixture<UserReportPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReportPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReportPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
