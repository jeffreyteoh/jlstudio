import { TestBed } from '@angular/core/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let afAuthMock: any;
  let routerMock: any;

  beforeEach(() => {
    afAuthMock = jasmine.createSpyObj('AngularFireAuth', ['currentUser']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AngularFireAuth, useValue: afAuthMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true if the user is authenticated', () => {
      afAuthMock.currentUser = Promise.resolve({ uid: 'testUserId' });

      const result = authGuard.canActivate(new ActivatedRouteSnapshot(), <
        RouterStateSnapshot
      >{
        url: 'testUrl',
      });

      expect(result).toBeTrue();
    });

    it('should return false and navigate to the signin page if the user is not authenticated', async () => {
      afAuthMock.currentUser = Promise.resolve(null);

      const result = await authGuard.canActivate(new ActivatedRouteSnapshot(), <
        RouterStateSnapshot
      >{ url: 'testUrl' });

      expect(result).toBeFalse();
      expect(routerMock.navigate).toHaveBeenCalledWith(['signin']);
    });
  });

  // Write more test cases for other methods or scenarios in AuthGuard if needed
});
