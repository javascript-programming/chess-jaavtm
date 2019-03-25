import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesComponent } from './games/games.component';
import { PlayersComponent } from './players/players.component';

import {
  MatListModule,
  MatButtonModule, MatCardModule, MatGridListModule, MatTableModule
} from '@angular/material';
import { CardComponent } from './card/card.component';
import { PlayerComponent } from './players/player/player.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent, GamesComponent, PlayersComponent, CardComponent, PlayerComponent]
})
export class DashboardModule {
}
