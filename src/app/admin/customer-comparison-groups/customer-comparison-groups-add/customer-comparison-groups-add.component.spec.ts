import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComparisonGroupsAddComponent } from './customer-comparison-groups-add.component';

describe('CustomerComparisonGroupsAddComponent', () => {
  let component: CustomerComparisonGroupsAddComponent;
  let fixture: ComponentFixture<CustomerComparisonGroupsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerComparisonGroupsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComparisonGroupsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
