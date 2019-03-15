import { Component, OnInit } from '@angular/core';
import {PlayerStore} from '../../data/store/player.store';
import {Player} from '../../data/entity/player';
import {Observable} from 'rxjs';
import {Model} from '../../data/store/abstract.model';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css', '../../common.styles.css']
})
export class PlayersComponent implements OnInit {

  players$: Observable<Model<Player>[]>;

  constructor(private authService: AuthService, private router: Router, private playerStore: PlayerStore) {
    this.players$ = this.playerStore.getAll$();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['../login']);
  }

  back() {
    this.router.navigate(['..']);
  }

  ngOnInit() {
  }

}
