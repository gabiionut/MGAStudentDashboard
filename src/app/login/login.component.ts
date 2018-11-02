import { AuthenticationService } from './../services/authentication.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-authentication',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthenticationService) { }

  login() {
    this.auth.login();
  }
 }
