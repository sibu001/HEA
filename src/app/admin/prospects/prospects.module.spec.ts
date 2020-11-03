import { ProspectsModule } from './prospects.module';

describe('ProspectsModule', () => {
  let prospectsModule: ProspectsModule;

  beforeEach(() => {
    prospectsModule = new ProspectsModule();
  });

  it('should create an instance', () => {
    expect(prospectsModule).toBeTruthy();
  });
});
