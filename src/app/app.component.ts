import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { User } from 'firebase';
import { UserService } from './services/user.service';
import { LoaderService } from './core/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Student DashBoard';
  currentUser: User;
  showLoader: boolean;
  constructor(
    public authService: AuthenticationService,
    private route: Router,
    private userService: UserService,
    private loaderService: LoaderService
    ) {

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
  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }
}
