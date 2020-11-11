import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHistoryEditComponent } from './event-history-edit.component';

describe('EventHistoryEditComponent', () => {
  let component: EventHistoryEditComponent;
  let fixture: ComponentFixture<EventHistoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventHistoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventHistoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
