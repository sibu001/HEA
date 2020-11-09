import { TestBed, inject } from '@angular/core/testing';

import { AdministrativeService } from './administrative.service';

describe('AdministrativeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrativeService]
    });
  });

  it('should be created', inject([AdministrativeService], (service: AdministrativeService) => {
    expect(service).toBeTruthy();
  }));
});
