import { CredentialTypeModule } from './credential-type.module';

describe('CredentialTypeModule', () => {
  let credentialTypeModule: CredentialTypeModule;

  beforeEach(() => {
    credentialTypeModule = new CredentialTypeModule();
  });

  it('should create an instance', () => {
    expect(credentialTypeModule).toBeTruthy();
  });
});
