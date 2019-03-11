import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Credentials} from '../auth/credentials';


@Injectable()
export abstract class BaseResolver<T> implements Resolve<T> {

  protected contract: any;
  protected credentials: Credentials;

  constructor(private service: AuthService) {
    this.contract = service.chessService.getConstractInstance();
    this.credentials = service.getCredentials();
  }

  abstract resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any;
}
