import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student DashBoard';

  constructor(private authService: AuthenticationService, private route: Router) {
    if (!this.authService.user$) {
      this.route.navigate(['/login']);
    } else {
      this.route.navigate(['/']);
    }
  }
}
