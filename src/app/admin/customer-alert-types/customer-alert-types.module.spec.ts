import { CustomerAlertTypesModule } from './customer-alert-types.module';

describe('CustomerAlertTypesModule', () => {
  let customerAlertTypesModule: CustomerAlertTypesModule;

  beforeEach(() => {
    customerAlertTypesModule = new CustomerAlertTypesModule();
  });

  it('should create an instance', () => {
    expect(customerAlertTypesModule).toBeTruthy();
  });
});
