import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupMailPartsListComponent } from './customer-group-mail-parts-list.component';

describe('CustomerGroupMailPartsListComponent', () => {
  let component: CustomerGroupMailPartsListComponent;
  let fixture: ComponentFixture<CustomerGroupMailPartsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerGroupMailPartsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupMailPartsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
