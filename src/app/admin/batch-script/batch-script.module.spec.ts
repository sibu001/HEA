import { BatchScriptModule } from './batch-script.module';

describe('BatchScriptModule', () => {
  let batchScriptModule: BatchScriptModule;

  beforeEach(() => {
    batchScriptModule = new BatchScriptModule();
  });

  it('should create an instance', () => {
    expect(batchScriptModule).toBeTruthy();
  });
});
