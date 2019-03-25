import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Player} from '../../../data/entity/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor() { }

  @Input() player: Player;

  ngOnInit() {
  }

}
