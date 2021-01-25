import { TestBed } from '@angular/core/testing';

import { AddToCartsService } from './add-to-carts.service';

describe('AddToCartsService', () => {
  let service: AddToCartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToCartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
