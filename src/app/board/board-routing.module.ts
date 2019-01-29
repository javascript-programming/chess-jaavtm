import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameComponent} from './game/game.component';
import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [{
  path: 'board',
  canActivate: [AuthGuard],
  component: GameComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
