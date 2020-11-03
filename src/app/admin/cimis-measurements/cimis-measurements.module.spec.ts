import { CimisMeasurementsModule } from './cimis-measurements.module';

describe('CimisMeasurementsModule', () => {
  let cimisMeasurementsModule: CimisMeasurementsModule;

  beforeEach(() => {
    cimisMeasurementsModule = new CimisMeasurementsModule();
  });

  it('should create an instance', () => {
    expect(cimisMeasurementsModule).toBeTruthy();
  });
});
