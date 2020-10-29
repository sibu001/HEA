import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComparisonGroupsListComponent } from './customer-comparison-groups-list.component';

describe('CustomerComparisonGroupsListComponent', () => {
  let component: CustomerComparisonGroupsListComponent;
  let fixture: ComponentFixture<CustomerComparisonGroupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerComparisonGroupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComparisonGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
