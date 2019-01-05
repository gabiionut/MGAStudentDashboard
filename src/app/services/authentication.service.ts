import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  user$: Observable<firebase.User>;
  constructor(
     public afAuth: AngularFireAuth,
     private route: ActivatedRoute,
     public snackBar: MatSnackBar
     ) {
    this.user$ = afAuth.authState;
   }
   // Login with Google
  login() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  // Register with email and password

  register(email, password) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
     // this.snackBar.open('A aparut o erare in timpul creerii contului! Incercati mai tarziu ❌', null, {duration: 4000});
    });
  }

  // login with email
  loginWithEmailPassword(email, password) {
    this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
      // this.snackBar.open('A aparut o erare in timpul creerii contului! Incercati mai tarziu ❌', null, {duration: 4000});

    });
  }

  sendVerification(user) {
    user = firebase.auth().currentUser;
    user.sendEmailVerification();
  }
}
