import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityCredentialsComponent } from './utility-credentials.component';

describe('UtilityCredentialsComponent', () => {
  let component: UtilityCredentialsComponent;
  let fixture: ComponentFixture<UtilityCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
