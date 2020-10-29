import { CustomerEventModule } from './customer-event.module';

describe('CustomerEventModule', () => {
  let customerEventModule: CustomerEventModule;

  beforeEach(() => {
    customerEventModule = new CustomerEventModule();
  });

  it('should create an instance', () => {
    expect(customerEventModule).toBeTruthy();
  });
});
