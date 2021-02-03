import { TestBed } from '@angular/core/testing';

import { AllTypeService } from './all-type.service';

describe('AllTypeService', () => {
  let service: AllTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
