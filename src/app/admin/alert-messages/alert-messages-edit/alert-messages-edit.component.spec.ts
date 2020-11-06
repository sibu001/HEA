import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMessagesEditComponent } from './alert-messages-edit.component';

describe('AlertMessagesEditComponent', () => {
  let component: AlertMessagesEditComponent;
  let fixture: ComponentFixture<AlertMessagesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertMessagesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertMessagesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
