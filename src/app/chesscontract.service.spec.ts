import { TestBed } from '@angular/core/testing';

import { ChesscontractService } from './chesscontract.service';

describe('ChesscontractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChesscontractService = TestBed.get(ChesscontractService);
    expect(service).toBeTruthy();
  });
});
