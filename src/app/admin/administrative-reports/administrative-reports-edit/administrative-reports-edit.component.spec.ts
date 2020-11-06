import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeReportsEditComponent } from './administrative-reports-edit.component';

describe('AdministrativeReportsEditComponent', () => {
  let component: AdministrativeReportsEditComponent;
  let fixture: ComponentFixture<AdministrativeReportsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativeReportsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeReportsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
