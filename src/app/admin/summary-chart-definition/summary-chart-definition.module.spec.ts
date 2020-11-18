import { SummaryChartDefinitionModule } from './summary-chart-definition.module';

describe('SummaryChartDefinitionModule', () => {
  let summaryChartDefinitionModule: SummaryChartDefinitionModule;

  beforeEach(() => {
    summaryChartDefinitionModule = new SummaryChartDefinitionModule();
  });

  it('should create an instance', () => {
    expect(summaryChartDefinitionModule).toBeTruthy();
  });
});
