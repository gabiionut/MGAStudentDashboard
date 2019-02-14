import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { User } from 'firebase';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Student DashBoard';
  currentUser: User;

  constructor(public authService: AuthenticationService, private route: Router, private userService: UserService) {

    this.authService.user$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.userService.save(user);
        this.route.navigate(['/']);
      } else {
        this.route.navigate(['/login']);
      }
    });
  }
}
