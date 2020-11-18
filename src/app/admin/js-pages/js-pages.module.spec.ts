import { JsPagesModule } from './js-pages.module';

describe('JsPagesModule', () => {
  let jsPagesModule: JsPagesModule;

  beforeEach(() => {
    jsPagesModule = new JsPagesModule();
  });

  it('should create an instance', () => {
    expect(jsPagesModule).toBeTruthy();
  });
});
