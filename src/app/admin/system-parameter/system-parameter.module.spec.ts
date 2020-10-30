import { SystemParameterModule } from './system-parameter.module';

describe('SystemParameterModule', () => {
  let systemParameterModule: SystemParameterModule;

  beforeEach(() => {
    systemParameterModule = new SystemParameterModule();
  });

  it('should create an instance', () => {
    expect(systemParameterModule).toBeTruthy();
  });
});
