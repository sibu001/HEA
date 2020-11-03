import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CimisStationListComponent } from './cimis-station-list.component';

describe('CimisStationListComponent', () => {
  let component: CimisStationListComponent;
  let fixture: ComponentFixture<CimisStationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CimisStationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CimisStationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
