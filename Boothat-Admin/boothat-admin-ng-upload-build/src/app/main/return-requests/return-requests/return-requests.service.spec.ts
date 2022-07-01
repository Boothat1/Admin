import { TestBed } from '@angular/core/testing';

import { ReturnRequestsService } from './return-requests.service';

describe('ReturnRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReturnRequestsService = TestBed.get(ReturnRequestsService);
    expect(service).toBeTruthy();
  });
});
