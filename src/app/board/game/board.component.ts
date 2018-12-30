import { Component, OnInit } from '@angular/core';
import { Cell } from './cell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

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
