import {Observable} from 'rxjs';
import {Model} from './abstract.model';
import {Credentials} from '../../auth/credentials';

export abstract class Store<T> extends Model<Model<T>[]> {

  protected loaded = false;

  constructor (private credentials: Credentials, private contract: any) {
    super();
  }

  isLoaded() {
    return this.loaded;
  }

  load(fn, ...params) {
    const contract = this.contract;
    const credentials = this.credentials;

    return new Promise ((resolve, reject) => {
      if (contract) {
        if (credentials.isVerified()) {
          fn.call(contract, ...params, credentials.password).then(result => {
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

  getCredentials() {
    return this.credentials;
  }

  getContract() {
    return this.contract;
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
    this.update(items);
  }

  clear () {
    super.clear();
    this.loaded = false;
  }
}
