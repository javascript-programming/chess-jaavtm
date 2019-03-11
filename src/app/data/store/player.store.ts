import {Player} from '../entity/player';
import {Store} from './abstract.store';
import {AuthService} from '../../auth/auth.service';
import {ChessService} from '../../chess.service';

export class PlayerStore extends Store<Player> {

  load() {
    const contract = this.getContract();
    return super.load(contract.getPlayers);
  }
}
