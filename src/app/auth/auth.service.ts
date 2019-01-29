import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  address: String;
  password: String;
  username: String;
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.address = 'something')
    );
  }

  logout(): void {
    this.address = null;
    this.password = null;
    this.username =  null;
  }
}
