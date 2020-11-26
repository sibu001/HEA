import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityUsageListComponent } from './electricity-usage-list.component';

describe('ElectricityUsageListComponent', () => {
  let component: ElectricityUsageListComponent;
  let fixture: ComponentFixture<ElectricityUsageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricityUsageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricityUsageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
