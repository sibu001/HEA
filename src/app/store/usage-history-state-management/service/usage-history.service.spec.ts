import { TestBed, inject } from '@angular/core/testing';

import { UsageHistoryService } from './usage-history.service';

describe('UsageHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsageHistoryService]
    });
  });

  it('should be created', inject([UsageHistoryService], (service: UsageHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
