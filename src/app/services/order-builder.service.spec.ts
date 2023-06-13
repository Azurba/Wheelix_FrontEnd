import { TestBed } from '@angular/core/testing';

import { OrderBuilderService } from './order-builder.service';

describe('OrderBuilderService', () => {
  let service: OrderBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
