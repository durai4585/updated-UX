import { TestBed, inject } from '@angular/core/testing';

import { DribbblePostService } from './dribbble-post.service';

describe('DribbblePostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DribbblePostService]
    });
  });

  it('should be created', inject([DribbblePostService], (service: DribbblePostService) => {
    expect(service).toBeTruthy();
  }));
});
