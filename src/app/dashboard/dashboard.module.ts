import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesComponent } from './games/games.component';
import { PlayersComponent } from './players/players.component';

import {
  MatListModule,
  MatButtonModule
} from '@angular/material';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent, GamesComponent, PlayersComponent, CardComponent]
})
export class DashboardModule {
}
