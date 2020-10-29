import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComparisonGroupsBatchRemoveComponent } from './customer-comparison-groups-batch-remove.component';

describe('CustomerComparisonGroupsBatchRemoveComponent', () => {
  let component: CustomerComparisonGroupsBatchRemoveComponent;
  let fixture: ComponentFixture<CustomerComparisonGroupsBatchRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerComparisonGroupsBatchRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComparisonGroupsBatchRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
