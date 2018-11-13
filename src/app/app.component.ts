import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student DashBoard';
  currentUser: User;

  constructor(public authService: AuthenticationService, private route: Router, private userService: UserService) {

    this.authService.user$.subscribe(user => {
      if (user) {
        this.userService.save(user);
        this.route.navigate(['/']);
      } else {
        this.route.navigate(['/login']);
      }
    });
  }
}
