import { TestBed } from '@angular/core/testing';

import { DetenteurService } from './detenteur.service';

describe('DetenteurService', () => {
  let service: DetenteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetenteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
