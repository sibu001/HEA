import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialTypeEditComponent } from './credential-type-edit.component';

describe('CredentialTypeEditComponent', () => {
  let component: CredentialTypeEditComponent;
  let fixture: ComponentFixture<CredentialTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
