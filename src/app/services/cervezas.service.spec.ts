import { TestBed } from '@angular/core/testing';

import { CervezasService } from './cervezas.service';

describe('CervezasService', () => {
  let service: CervezasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CervezasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
