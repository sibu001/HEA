import { ElectricityModule } from './electricity.module';

describe('ElectricityModule', () => {
  let electricityModule: ElectricityModule;

  beforeEach(() => {
    electricityModule = new ElectricityModule();
  });

  it('should create an instance', () => {
    expect(electricityModule).toBeTruthy();
  });
});
