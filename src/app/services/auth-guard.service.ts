import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private route: Router) { }

  canActivate() {
    return this.authService.user$.map(user => {
      if (user) {
        return true;
      }

      this.route.navigate(['/login']);
      return false;
    });
  }
}
