import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComparisonGroupsBatchAddComponent } from './customer-comparison-groups-batch-add.component';

describe('CustomerComparisonGroupsBatchAddComponent', () => {
  let component: CustomerComparisonGroupsBatchAddComponent;
  let fixture: ComponentFixture<CustomerComparisonGroupsBatchAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerComparisonGroupsBatchAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComparisonGroupsBatchAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
