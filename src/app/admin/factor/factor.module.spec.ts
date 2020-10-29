import { FactorModule } from './factor.module';

describe('FactorModule', () => {
  let factorModule: FactorModule;

  beforeEach(() => {
    factorModule = new FactorModule();
  });

  it('should create an instance', () => {
    expect(factorModule).toBeTruthy();
  });
});
