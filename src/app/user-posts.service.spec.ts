import { TestBed, inject } from '@angular/core/testing';

import { HandPickedService } from './hand-picked.service';

describe('HandPickedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandPickedService]
    });
  });

  it('should be created', inject([HandPickedService], (service: HandPickedService) => {
    expect(service).toBeTruthy();
  }));
});
