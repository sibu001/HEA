import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHistoryListComponent } from './event-history-list.component';

describe('EventHistoryListComponent', () => {
  let component: EventHistoryListComponent;
  let fixture: ComponentFixture<EventHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
