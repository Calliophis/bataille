import { TestBed } from '@angular/core/testing';

import { AuthService } from '../services/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a token', () => {
    expect(service.getToken()).toEqual('MySecret2024!');
  })
});
