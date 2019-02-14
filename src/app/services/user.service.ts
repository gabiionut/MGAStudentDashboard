import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../core/models/user.model';
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

  saveEmailPassword(userF: firebase.User, user: User) {
    this.db.object('/users/' + userF.uid).update({
      name: user.name,
      email: user.email,
      ui: userF.uid
    });
  }
}
