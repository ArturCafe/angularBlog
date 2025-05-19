import { TestBed } from '@angular/core/testing';

import { SideboardService } from './sideboard.service';

describe('SideboardService', () => {
  let service: SideboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
