import {Observable} from 'rxjs';
import {Model} from './abstract.model';
import {AuthService} from '../../auth/auth.service';
import {ChessService} from '../../chess.service';

export abstract class Store<T> extends Model<Model<T>[]> {

  protected loaded = false;

  constructor (private authService: AuthService, private chessService: ChessService) {
    super();
  }

  isLoaded() {
    return this.loaded;
  }

  load(fn, ...params) {
    const contract = this.getContract();
    const credentials = this.getCredentials();

    return new Promise ((resolve, reject) => {
      if (contract) {
        if (credentials.isVerified()) {
          fn.apply(fn.call(this, params, credentials.password)).then(result => {
            this.update(result);
            this.loaded = true;
            resolve(result);
          }).catch(reject);
        } else {
          reject('Credentials not verified');
        }
      } else {
        reject('No contract');
      }
    });
  }

  getContract() {
    return this.chessService.getConstractInstance();
  }

  getCredentials() {
    return this.authService.credentials;
  }

  getAll(): Model<T>[] {
    return this.getValue();
  }

  getAll$ = (): Observable<Model<T>[]> => this.state$.asObservable();

  addItem (index: number, item: Model<T>) {
    const items = this.getAll();
    items.splice(index, 0, item);
    this.update(items);
  }

  removeItem (item: Model<T>) {
    const items = this.getAll();
    const index = items.indexOf(item);
    if (index > -1) {
      items.splice(index, 1);
    }
  }

  clear () {
    super.clear();
    this.loaded = false;
  }
}
