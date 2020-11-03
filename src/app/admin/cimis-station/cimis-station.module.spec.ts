import { CimisStationModule } from './cimis-station.module';

describe('CimisStationModule', () => {
  let cimisStationModule: CimisStationModule;

  beforeEach(() => {
    cimisStationModule = new CimisStationModule();
  });

  it('should create an instance', () => {
    expect(cimisStationModule).toBeTruthy();
  });
});
