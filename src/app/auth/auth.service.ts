import { Injectable } from '@angular/core';

import {Observable, from, BehaviorSubject} from 'rxjs';

import { ChessService} from '../chess.service';
import { Credentials} from './credentials';

import { Player} from '../data/entity/player';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  credentials: BehaviorSubject<Credentials>;
  redirectUrl: string;

  constructor(public chessService: ChessService) {
    this.credentials = new BehaviorSubject(new Credentials());
  }

  login(): Observable<any> {

    const credentials = this.credentials.getValue();

    return from(new Promise((resolve, reject) => {
      this.chessService.getAccount(credentials.name, credentials.password).then((result: Player) => {
        credentials.address = result.address;
        this.credentials.next(credentials);
        resolve(result);
      }).catch(reject);
    }));
  }

  create(): Observable<any> {

    const credentials = this.credentials.getValue();

    return from(new Promise((resolve, reject) => {
      this.chessService.createAccount(credentials.name, credentials.password).then((result: Player) => {
        credentials.address = result.address;
        this.credentials.next(credentials);
        resolve(result);
      }).catch(reject);
    }));
  }

  getCredentials() {
    return this.credentials.getValue();
  }

  logout(): void {
    this.credentials.next(new Credentials());
  }
}
