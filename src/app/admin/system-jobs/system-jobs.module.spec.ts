import { SystemJobsModule } from './system-jobs.module';

describe('SystemJobsModule', () => {
  let systemJobsModule: SystemJobsModule;

  beforeEach(() => {
    systemJobsModule = new SystemJobsModule();
  });

  it('should create an instance', () => {
    expect(systemJobsModule).toBeTruthy();
  });
});
