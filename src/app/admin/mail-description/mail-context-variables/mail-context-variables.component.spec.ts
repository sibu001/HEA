import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailContextVariablesComponent } from './mail-context-variables.component';

describe('MailContextVariablesComponent', () => {
  let component: MailContextVariablesComponent;
  let fixture: ComponentFixture<MailContextVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailContextVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailContextVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
