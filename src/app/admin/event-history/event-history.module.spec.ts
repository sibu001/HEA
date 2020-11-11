import { EventHistoryModule } from './event-history.module';

describe('EventHistoryModule', () => {
  let eventHistoryModule: EventHistoryModule;

  beforeEach(() => {
    eventHistoryModule = new EventHistoryModule();
  });

  it('should create an instance', () => {
    expect(eventHistoryModule).toBeTruthy();
  });
});
