import { Injectable } from '@angular/core';

import {Observable, from, BehaviorSubject} from 'rxjs';

import { ChessService} from '../chess.service';
import { Credentials} from './credentials';

import { Player} from '../data/entity/player';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  credentials: Credentials = new Credentials();
  redirectUrl: string;

  constructor(public chessService: ChessService) {
  }

  login(): Observable<any> {

    const credentials = this.credentials;

    return from(new Promise((resolve, reject) => {
      this.chessService.getAccount(credentials.name, credentials.password).then((result: Player) => {
        this.credentials.update(result);
        resolve(result);
      }).catch(reject);
    }));
  }

  create(): Observable<any> {

    const credentials = this.credentials;

    return from(new Promise((resolve, reject) => {
      this.chessService.createAccount(credentials.name, credentials.password).then((result: Player) => {
        this.credentials.update(result);
        resolve(result);
      }).catch(reject);
    }));
  }

  getCredentials() {
    return this.credentials;
  }

  logout(): void {
    this.credentials.clear();
  }
}
