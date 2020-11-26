import { TestBed, inject } from '@angular/core/testing';

import { TrendingDefinitionService } from './trending-definition.service';

describe('TrendingDefinitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrendingDefinitionService]
    });
  });

  it('should be created', inject([TrendingDefinitionService], (service: TrendingDefinitionService) => {
    expect(service).toBeTruthy();
  }));
});
