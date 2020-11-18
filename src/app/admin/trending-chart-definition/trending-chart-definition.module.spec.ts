import { TrendingChartDefinitionModule } from './trending-chart-definition.module';

describe('TrendingChartDefinitionModule', () => {
  let trendingChartDefinitionModule: TrendingChartDefinitionModule;

  beforeEach(() => {
    trendingChartDefinitionModule = new TrendingChartDefinitionModule();
  });

  it('should create an instance', () => {
    expect(trendingChartDefinitionModule).toBeTruthy();
  });
});
