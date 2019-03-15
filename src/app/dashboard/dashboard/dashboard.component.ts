import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {PlayerStore} from '../../data/store/player.store';
import {Player} from '../../data/entity/player';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../common.styles.css']
})
export class DashboardComponent {

  player$: Observable<Player>;

  constructor(private authService: AuthService,
              private router: Router,
              private playerStore: PlayerStore) {

    if (this.authService.getCredentials().isVerified()) {

      this.player$ = this.authService.getCredentials().get$();

      if (!playerStore.isLoaded()) {
        playerStore.load();
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
