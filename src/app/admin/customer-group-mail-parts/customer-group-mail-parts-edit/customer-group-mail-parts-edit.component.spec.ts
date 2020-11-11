import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupMailPartsEditComponent } from './customer-group-mail-parts-edit.component';

describe('CustomerGroupMailPartsEditComponent', () => {
  let component: CustomerGroupMailPartsEditComponent;
  let fixture: ComponentFixture<CustomerGroupMailPartsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerGroupMailPartsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupMailPartsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
