import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      ui: user.uid
    });
  }

  saveEmailPassword(user: firebase.User, name) {
    this.db.object('/users/' + user.uid).update({
      name: name,
    });
  }
}
