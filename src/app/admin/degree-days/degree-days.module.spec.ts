import { DegreeDaysModule } from './degree-days.module';

describe('DegreeDaysModule', () => {
  let degreeDaysModule: DegreeDaysModule;

  beforeEach(() => {
    degreeDaysModule = new DegreeDaysModule();
  });

  it('should create an instance', () => {
    expect(degreeDaysModule).toBeTruthy();
  });
});
