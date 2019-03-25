import { Component, OnInit } from '@angular/core';
import {PlayerStore} from '../../data/store/player.store';
import {Player} from '../../data/entity/player';
import {Observable} from 'rxjs';
import {Model} from '../../data/store/abstract.model';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css', '../../common.styles.css']
})
export class PlayersComponent implements OnInit {

  players$: Observable<Model<Player>[]>;
  columns: string[] = ['name', 'won', 'draw', 'lost', 'coins'];
  selection = new SelectionModel<Player>(false, []);

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

  selectPlayer (player: Player) {
    this.selection.select(player);
  }

  challengePlayer (player: Player) {
    console.log(player);
  }

}
