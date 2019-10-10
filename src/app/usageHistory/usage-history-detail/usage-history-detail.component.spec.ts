import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageHistoryDetailComponent } from './usage-history-detail.component';

describe('UsageHistoryDetailComponent', () => {
  let component: UsageHistoryDetailComponent;
  let fixture: ComponentFixture<UsageHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
