import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricitySmartMeterListComponent } from './electricity-smart-meter-list.component';

describe('ElectricitySmartMeterListComponent', () => {
  let component: ElectricitySmartMeterListComponent;
  let fixture: ComponentFixture<ElectricitySmartMeterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricitySmartMeterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricitySmartMeterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
