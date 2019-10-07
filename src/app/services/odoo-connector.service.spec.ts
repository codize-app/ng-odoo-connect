import { TestBed } from '@angular/core/testing';

import { OdooConnectorService } from './odoo-connector.service';

describe('OdooConnectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OdooConnectorService = TestBed.get(OdooConnectorService);
    expect(service).toBeTruthy();
  });
});
