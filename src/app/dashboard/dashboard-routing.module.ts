import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesComponent } from './games/games.component';
import { PlayersComponent } from './players/players.component';
import { CardComponent } from './card/card.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: CardComponent,
    canActivate : [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'games', component: GamesComponent },
          { path: 'players', component: PlayersComponent },
          { path: '', component: DashboardComponent } // main entry point
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
