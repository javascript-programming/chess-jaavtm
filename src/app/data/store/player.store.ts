import {Player} from '../entity/player';
import {Store} from './abstract.store';
import {Injectable} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {ChessService} from '../../chess.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerStore extends Store<Player> {

  constructor (authService: AuthService, chessService: ChessService) {
    super(authService.credentials$, chessService.getConstractInstance());
  }

  load() {
    const contract = this.getContract();
    return super.load(contract.getActivePlayers);
  }
}
