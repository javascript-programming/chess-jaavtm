import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Credentials} from '../credentials';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  hide = true;
  credentials: Credentials;

  constructor(public authService: AuthService, public router: Router, private snackBar: MatSnackBar) {
    authService.credentials.subscribe(credentials => {
      this.credentials = credentials;
    });
  }

  ngOnInit() {
  }

  createPlayer () {
    this.authService.create().subscribe((result) => {

      if (this.authService.getCredentials().isVerified()) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '..';
        this.router.navigate([redirect]);
      }
    }, (error => {
      this.snackBar.open(error.message, 'Close' );
    }));
  }

}
