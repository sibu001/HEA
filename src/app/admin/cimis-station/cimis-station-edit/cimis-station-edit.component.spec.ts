import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CimisStationEditComponent } from './cimis-station-edit.component';

describe('CimisStationEditComponent', () => {
  let component: CimisStationEditComponent;
  let fixture: ComponentFixture<CimisStationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CimisStationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CimisStationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
