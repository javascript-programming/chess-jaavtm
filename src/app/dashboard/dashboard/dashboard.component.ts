import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {PlayerStore} from '../../data/store/player.store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthService,
              public router: Router,
              private playerStore: PlayerStore) {

    if (this.authService.getCredentials().isVerified()) {
      if (!playerStore.isLoaded()) {
        playerStore.load();
      }
    }
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
