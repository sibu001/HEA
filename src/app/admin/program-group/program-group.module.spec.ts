import { ProgramGroupModule } from './program-group.module';

describe('ProgramGroupModule', () => {
  let programGroupModule: ProgramGroupModule;

  beforeEach(() => {
    programGroupModule = new ProgramGroupModule();
  });

  it('should create an instance', () => {
    expect(programGroupModule).toBeTruthy();
  });
});
