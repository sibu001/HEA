import { ViewConfigurationModule } from './view-configuration.module';

describe('ViewConfigurationModule', () => {
  let viewConfigurationModule: ViewConfigurationModule;

  beforeEach(() => {
    viewConfigurationModule = new ViewConfigurationModule();
  });

  it('should create an instance', () => {
    expect(viewConfigurationModule).toBeTruthy();
  });
});
