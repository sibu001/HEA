import { TestBed, inject } from '@angular/core/testing';

import { SystemMeasurementService } from './system-measurement.service';

describe('SystemMeasurementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemMeasurementService]
    });
  });

  it('should be created', inject([SystemMeasurementService], (service: SystemMeasurementService) => {
    expect(service).toBeTruthy();
  }));
});
