import {Model} from '../data/store/abstract.model';
import {Player} from '../data/entity/player';

export class Credentials extends Model<Player> {
  name: string;
  password: string;

  isVerified () {
    return this.getValue();
  }

  clear() {
    super.clear();
    this.name = '';
    this.password = '';
  }
}
