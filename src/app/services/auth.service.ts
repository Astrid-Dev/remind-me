import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import {docData} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private afStore: AngularFirestore,
    private ngFireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    let temp = localStorage.getItem('user');
    if(temp){
      this.userData = JSON.parse(temp);
    }
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        console.log(user);
        localStorage.setItem('user', JSON.stringify(this.userData));
        const userRef: any = this.afStore.doc(`users/${user.uid}`).ref;
        docData(userRef).subscribe((data) =>{
          if(data){
            console.log(data);
            this.userData = {...this.userData, ...data};
            localStorage.setItem('user', JSON.stringify(this.userData));
          }
        })
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  // Login in with email/password
  SignIn(email: string, password: string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  RegisterUser(email: string, password: string) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.currentUser.then((user) => {
      return user && user.sendEmailVerification().then(() => {
        this.router.navigate(['login']);
      });
    });
  }

  // Recover password
  PasswordRecover(passwordResetEmail: string) {
    return this.ngFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is logged in
  get isLoggedIn(): boolean {
    const temp = localStorage.getItem('user');
    const user = temp ? JSON.parse(temp) : null;
    return user && user.emailVerified;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const temp = localStorage.getItem('user');
    const user = temp ? JSON.parse(temp) : null;
    return user && user.emailVerified;
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Sign in with Twitter
  TwitterAuth() {
    return this.AuthLogin(new auth.TwitterAuthProvider());
  }

  // Auth providers
  AuthLogin(provider: any) {
    return this.ngFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/app/reminders']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Store user in localStorage
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );

    return userRef.set({...user}, {
      merge: true,
    });
  }

  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}