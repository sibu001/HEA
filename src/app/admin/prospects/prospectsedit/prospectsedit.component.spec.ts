import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectseditComponent } from './prospectsedit.component';

describe('ProspectseditComponent', () => {
  let component: ProspectseditComponent;
  let fixture: ComponentFixture<ProspectseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
