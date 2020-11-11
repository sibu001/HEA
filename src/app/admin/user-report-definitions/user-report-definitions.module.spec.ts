import { UserReportDefinitionsModule } from './user-report-definitions.module';

describe('UserReportDefinitionsModule', () => {
  let userReportDefinitionsModule: UserReportDefinitionsModule;

  beforeEach(() => {
    userReportDefinitionsModule = new UserReportDefinitionsModule();
  });

  it('should create an instance', () => {
    expect(userReportDefinitionsModule).toBeTruthy();
  });
});
