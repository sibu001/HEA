import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeReportsListComponent } from './administrative-reports-list.component';

describe('AdministrativeReportsListComponent', () => {
  let component: AdministrativeReportsListComponent;
  let fixture: ComponentFixture<AdministrativeReportsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativeReportsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
