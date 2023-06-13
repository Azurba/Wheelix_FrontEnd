import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { orderBuilderGuard } from './order-builder.guard';

describe('orderBuilderGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => orderBuilderGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
