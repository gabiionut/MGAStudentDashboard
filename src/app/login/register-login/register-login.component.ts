import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent {

  user: User = new User();
  password: string;
  currentUser;
  constructor(
    public auth: AuthenticationService,
    public route: Router,
    public userService: UserService,
    ) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  hide = true;
  register = false;
  login = true;

  add() {
    this.auth.register(this.user.email, this.password);

    this.auth.user$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.userService.saveEmailPassword(user, this.user);
        this.auth.sendVerification(user);
        this.route.navigate(['/']);
      } else {
        this.route.navigate(['/login']);
      }
    });

  }

  loginEmail() {
    this.auth.loginWithEmailPassword(this.user.email, this.password);
  }
}
