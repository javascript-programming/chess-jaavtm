import { Component, OnInit } from '@angular/core';
import { Cell } from './cell';

@Component({
  selector: 'app-board',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  cells: Cell[] = [];

  constructor() {

    for (let i = 1; i < 9; i++) {
      for (let j = 7; j >= 0; j--) {
        this.cells.unshift(new Cell(j, i));
      }
    }
  }

  ngOnInit() {
  }

}
