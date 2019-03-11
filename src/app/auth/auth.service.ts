import { Injectable } from '@angular/core';

import { Observable, of, from } from 'rxjs';

import { ChessService} from '../chess.service';
import { Credentials} from './credentials';

import { Player} from '../data/entity/player';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  credentials: Credentials;
  redirectUrl: string;

  constructor(public chessService: ChessService) {
    this.credentials = new Credentials();
  }

  login(): Observable<any> {

    const credentials = this.credentials;

    return from(new Promise((resolve, reject) => {
      this.chessService.getAccount(this.credentials.name, this.credentials.password).then((result: Player) => {
        credentials.address = result.address;
        resolve(result);
      }).catch(reject);
    }));
  }

  create(): Observable<any> {

    const credentials = this.credentials;

    return from(new Promise((resolve, reject) => {
      this.chessService.createAccount(this.credentials.name, this.credentials.password).then((result: Player) => {
        credentials.address = result.address;
        resolve(result);
      }).catch(reject);
    }));
  }

  logout(): void {
    this.credentials = new Credentials();
  }
}
