import { Injectable } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import { ChessService} from '../chess.service';
import { Credentials} from './credentials';

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
    return from(this.chessService.getAccount(this.credentials.name, this.credentials.password));
  }

  logout(): void {
    this.credentials = new Credentials();
  }
}
