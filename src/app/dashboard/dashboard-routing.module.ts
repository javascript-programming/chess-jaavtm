import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {GamesComponent} from './games/games.component';
import {PlayersComponent} from './players/players.component';
import {CardComponent} from './card/card.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: CardComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'games', component: GamesComponent },
          { path: 'players', component: PlayersComponent },
          { path: '', component: DashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
