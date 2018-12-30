import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardComponent} from './game/board.component';

import { BoardRoutingModule } from './board-routing.module';

import {
  MatCardModule,
  MatGridListModule,
  MatButtonModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    BoardRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule
  ],
  exports: [
    BoardComponent
  ],
  declarations: [BoardComponent]
})
export class BoardModule { }
