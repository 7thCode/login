import { TestBed } from '@angular/core/testing';

import { GensimService } from './gensim.service';

describe('GensimService', () => {
  let service: GensimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GensimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
