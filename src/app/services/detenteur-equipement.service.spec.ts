import { TestBed } from '@angular/core/testing';

import { DetenteurEquipementService } from './detenteur-equipement.service';

describe('DetenteurEquipementService', () => {
  let service: DetenteurEquipementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetenteurEquipementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
