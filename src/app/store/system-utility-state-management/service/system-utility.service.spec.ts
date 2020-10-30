import { TestBed, inject } from '@angular/core/testing';

import { SystemUtilityService } from './system-utility.service';

describe('SystemUtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemUtilityService]
    });
  });

  it('should be created', inject([SystemUtilityService], (service: SystemUtilityService) => {
    expect(service).toBeTruthy();
  }));
});
