import { TestBed } from '@angular/core/testing';

import { EquipementagsService } from './equipementags.service';

describe('EquipementagsService', () => {
  let service: EquipementagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipementagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
