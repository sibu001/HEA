import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeReportsCallComponent } from './administrative-reports-call.component';

describe('AdministrativeReportsCallComponent', () => {
  let component: AdministrativeReportsCallComponent;
  let fixture: ComponentFixture<AdministrativeReportsCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativeReportsCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeReportsCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
