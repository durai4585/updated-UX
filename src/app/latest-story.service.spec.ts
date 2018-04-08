import { TestBed, inject } from '@angular/core/testing';

import { LatestStoryService } from './latest-story.service';

describe('LatestStoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LatestStoryService]
    });
  });

  it('should be created', inject([LatestStoryService], (service: LatestStoryService) => {
    expect(service).toBeTruthy();
  }));
});
