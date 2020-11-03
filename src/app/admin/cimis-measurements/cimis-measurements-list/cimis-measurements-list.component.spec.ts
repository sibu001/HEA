import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CimisMeasurementsListComponent } from './cimis-measurements-list.component';

describe('CimisMeasurementsListComponent', () => {
  let component: CimisMeasurementsListComponent;
  let fixture: ComponentFixture<CimisMeasurementsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CimisMeasurementsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CimisMeasurementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
