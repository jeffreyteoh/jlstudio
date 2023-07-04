import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import * as auth from 'firebase/auth';

describe('AuthService', () => {
  let authService: AuthService;
  let afAuthMock: any;
  let routerMock: any;

  beforeEach(() => {
    afAuthMock = jasmine.createSpyObj('AngularFireAuth', ['signInWithPopup', 'signOut']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: afAuthMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('GoogleAuth', () => {
    it('should call AuthLogin with GoogleAuthProvider', () => {
      authService.GoogleAuth();
      expect(authService.AuthLogin).toHaveBeenCalledWith(jasmine.any(auth.GoogleAuthProvider));
    });

    it('should navigate to dashboard after successful login', (done: DoneFn) => {
      authService.GoogleAuth().then(() => {
        expect(routerMock.navigate).toHaveBeenCalledWith(['dashboard']);
        done();
      });
    });
  });

  describe('SignOut', () => {
    it('should call signOut method of AngularFireAuth', () => {
      authService.SignOut();
      expect(afAuthMock.signOut).toHaveBeenCalled();
    });

    it('should remove user from localStorage', (done: DoneFn) => {
      authService.SignOut().then(() => {
        expect(localStorage.removeItem).toHaveBeenCalledWith('user');
        done();
      });
    });

    it('should navigate to signin page after sign out', (done: DoneFn) => {
      authService.SignOut().then(() => {
        expect(routerMock.navigate).toHaveBeenCalledWith(['signin']);
        done();
      });
    });
  });

  // Write more test cases for other methods in AuthService if needed
});
