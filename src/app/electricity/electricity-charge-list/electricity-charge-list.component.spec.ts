import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityChargeListComponent } from './electricity-charge-list.component';

describe('ElectricityChargeListComponent', () => {
  let component: ElectricityChargeListComponent;
  let fixture: ComponentFixture<ElectricityChargeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricityChargeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricityChargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
