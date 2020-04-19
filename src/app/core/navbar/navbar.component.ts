import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SidenavService } from 'src/app/services/sidenav.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public authService: AuthenticationService, private route: Router, public sidenavService: SidenavService) { }

  logout() {
    this.authService.logout();
    this.route.navigate(['/login']);
  }

}
