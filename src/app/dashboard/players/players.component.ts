import { Component, OnInit } from '@angular/core';
import {PlayerStore} from '../../data/store/player.store';
import {Player} from '../../data/entity/player';
import {Observable} from 'rxjs';
import {Model} from '../../data/store/abstract.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players$: Observable<Model<Player>[]>;

  constructor(public router: Router, private playerStore: PlayerStore) {
    this.players$ = this.playerStore.getAll$();
  }

  logout() {

  }

  back() {

  }

  ngOnInit() {
  }

}
