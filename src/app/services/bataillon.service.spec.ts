import { TestBed } from '@angular/core/testing';

import { BataillonService } from './bataillon.service';

describe('BataillonService', () => {
  let service: BataillonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BataillonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
