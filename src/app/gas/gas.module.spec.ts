import { GasModule } from './gas.module';

describe('GasModule', () => {
  let gasModule: GasModule;

  beforeEach(() => {
    gasModule = new GasModule();
  });

  it('should create an instance', () => {
    expect(gasModule).toBeTruthy();
  });
});
