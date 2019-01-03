import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameComponent} from './game/game.component';

import { BoardRoutingModule } from './board-routing.module';

import {
  MatCardModule,
  MatGridListModule,
  MatButtonModule
} from '@angular/material';
import { CreateComponent } from './create/create.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  imports: [
    CommonModule,
    BoardRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule
  ],
  exports: [
    GameComponent
  ],
  declarations: [GameComponent, CreateComponent, ChatComponent]
})
export class BoardModule { }
