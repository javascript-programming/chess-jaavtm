import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import {MatSnackBar} from '@angular/material';
import {Credentials} from '../credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../common.styles.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  credentials: Credentials;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.credentials = authService.credentials;
  }

  ngOnInit() {
  }

  login () {
    this.authService.login().subscribe((result) => {

      if (this.authService.getCredentials().isVerified()) {
        const redirect = '..';
        this.router.navigate([redirect]);
      }
    }, (error => {
      this.snackBar.open(error.message, 'Close', { duration : 1000 } );
    }));
  }

}
