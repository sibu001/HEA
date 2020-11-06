import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMessagesListComponent } from './alert-messages-list.component';

describe('AlertMessagesListComponent', () => {
  let component: AlertMessagesListComponent;
  let fixture: ComponentFixture<AlertMessagesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertMessagesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertMessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
