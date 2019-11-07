import { TestBed } from '@angular/core/testing';

import { OdooConnector } from './odoo-connector.service';

describe('OdooConnector', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OdooConnector = TestBed.get(OdooConnector);
    expect(service).toBeTruthy();
  });
});
