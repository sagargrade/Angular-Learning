import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './shared/user.model';
import { UserdataService } from './shared/userdata.service';

@Injectable()
export class UserResolverService implements Resolve<User> {
  constructor(private userData: UserdataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> | Promise<User> | User {
    return this.userData.getUserDetail(+route.params['id']);
  }
}
