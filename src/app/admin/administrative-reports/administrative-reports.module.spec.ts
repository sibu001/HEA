import { AdministrativeReportsModule } from './administrative-reports.module';

describe('AdministrativeReportsModule', () => {
  let administrativeReportsModule: AdministrativeReportsModule;

  beforeEach(() => {
    administrativeReportsModule = new AdministrativeReportsModule();
  });

  it('should create an instance', () => {
    expect(administrativeReportsModule).toBeTruthy();
  });
});
