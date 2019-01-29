import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  login () {
    this.authService.login().subscribe(() => {

      if (this.authService.address !== null) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
        this.router.navigate([redirect]);
      }
    });
  }

}
