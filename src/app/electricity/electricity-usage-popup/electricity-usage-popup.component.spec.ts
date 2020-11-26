import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityUsagePopupComponent } from './electricity-usage-popup.component';

describe('ElectricityUsagePopupComponent', () => {
  let component: ElectricityUsagePopupComponent;
  let fixture: ComponentFixture<ElectricityUsagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricityUsagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricityUsagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
