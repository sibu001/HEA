import { WaterUsageHistoryModule } from './water-usage-history.module';

describe('WaterUsageHistoryModule', () => {
  let waterUsageHistoryModule: WaterUsageHistoryModule;

  beforeEach(() => {
    waterUsageHistoryModule = new WaterUsageHistoryModule();
  });

  it('should create an instance', () => {
    expect(waterUsageHistoryModule).toBeTruthy();
  });
});
