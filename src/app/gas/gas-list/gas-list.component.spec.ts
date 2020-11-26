import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasListComponent } from './gas-list.component';

describe('GasListComponent', () => {
  let component: GasListComponent;
  let fixture: ComponentFixture<GasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
