import { AuthenticationService } from './../services/authentication.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-authentication',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: AuthenticationService) { }

  login() {
    this.auth.login();
  }
 }
