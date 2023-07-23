import { Injectable, NgZone } from '@angular/core';
import {User}  from '../model/user.model';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public toastService: ToastService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);

        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        this.toastService.show(error.message, { type: 'danger' });
      });
  }

  // Sign up with email/password
  async SignUp(email: string, password: string, name?: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = result.user;

      if (user) {
        await user.updateProfile({
          displayName: name,
        });
      }

      await this.SendVerificationMail();
      this.SetUserData(user);
      this.router.navigate(['dashboard']);
    } catch (error: any) {
      this.toastService.show(error.message, { type: 'danger' });
    }
  }
  // Send email verificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.toastService.show('Password reset email sent, check your inbox.', {
          type: 'success',
        })
      })
      .catch((error) => {
        this.toastService.show(error.message, { type: 'danger' });
      });
  }
  // Returns true when user is looged in and email is verified
   isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  async GoogleAuth() {
    try {
      const res: any = await this.AuthLogin(new auth.GoogleAuthProvider());
      if (res) {
        this.router.navigate(['dashboard']);
      }
    } catch (error: any) {
      this.toastService.show(error.message, { type: 'danger' });
    }
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.toastService.show(error.message, { type: 'danger' });
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['signin']);
    });
  }
}
