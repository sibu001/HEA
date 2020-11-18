import { KeyIndicatorModule } from './key-indicator.module';

describe('KeyIndicatorModule', () => {
  let keyIndicatorModule: KeyIndicatorModule;

  beforeEach(() => {
    keyIndicatorModule = new KeyIndicatorModule();
  });

  it('should create an instance', () => {
    expect(keyIndicatorModule).toBeTruthy();
  });
});
