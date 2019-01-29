import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  email: string;

  constructor(
    public auth: AuthenticationService,
    private route: Router,
    private snackBar: MatSnackBar,
    ) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  ngOnInit() {
  }

  resetPassword() {
    this.auth.resetPassword(this.email);

    this.snackBar.open('A fost trimis un email de resetare a parolei ✔️', null, {duration: 3000});

    setTimeout(() => {
      this.route.navigate(['/login']);
  }, 4000);
  }
}
