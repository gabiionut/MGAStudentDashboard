import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent {

  user: User = new User();
  password: string;
  currentUserUid: string;
  constructor(
    public auth: AuthenticationService,
    ) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  hide = true;
  register = false;
  login = true;

  showRegister() {
    this.register = true;
    this.login = false;
  }

  showLogin() {
    this.register = false;
    this.login = true;
  }

  add() {
    this.auth.register(this.user.email, this.password);
  }

  loginEmail() {
    this.auth.loginWithEmailPassword(this.user.email, this.password);
  }
}
