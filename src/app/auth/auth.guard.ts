import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { haslocalStorage } from './ngrx/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}
  hasLocalStorageSub!: Subscription;
  hasLocalStorage!: boolean;

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    this.hasLocalStorageSub = this.store
      .select(haslocalStorage)
      .subscribe((value) => {
        value ? (this.hasLocalStorage = true) : (this.hasLocalStorage = false);
      });

    return this.hasLocalStorage ? true : this.router.createUrlTree(['/auth']);
  }
}
