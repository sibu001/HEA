import { CustomerGroupMailPartsModule } from './customer-group-mail-parts.module';

describe('CustomerGroupMailPartsModule', () => {
  let customerGroupMailPartsModule: CustomerGroupMailPartsModule;

  beforeEach(() => {
    customerGroupMailPartsModule = new CustomerGroupMailPartsModule();
  });

  it('should create an instance', () => {
    expect(customerGroupMailPartsModule).toBeTruthy();
  });
});
