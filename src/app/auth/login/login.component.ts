import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(public authService: AuthService, public router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login () {
    this.authService.login().subscribe((result) => {

      if (this.authService.credentials.isVerified()) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '..';
        this.router.navigate([redirect]);
      }
    }, (error => {
      this.snackBar.open(error.message, 'Close' );
    }));
  }

}
