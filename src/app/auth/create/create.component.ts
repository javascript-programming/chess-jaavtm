import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Credentials} from '../credentials';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css', '../../common.styles.css']
})
export class CreateComponent implements OnInit {

  hide = true;
  credentials: Credentials;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.credentials = authService.credentials;
  }

  ngOnInit() {
  }

  createPlayer () {
    this.authService.create().subscribe((result) => {

      if (this.authService.getCredentials().isVerified()) {
        const redirect = '..';
        this.router.navigate([redirect]);
      }
    }, (error => {
      this.snackBar.open(error.message, 'Close' );
    }));
  }

}
