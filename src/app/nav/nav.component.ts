import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logoutUser } from '../auth/ngrx/auth.actions';
import { haslocalStorage } from '../auth/ngrx/auth.selectors';
import { IAuthResponse } from '../auth/auth-response.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  hasLocalStorageSub!: Subscription;
  hasLocalStorage!: boolean;

  isLoggedIn: boolean = false;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<IAuthResponse>,
    private router: Router
  ) {}
  ngOnInit() {
    this.hasLocalStorageSub = this.store
      .select(haslocalStorage)
      .subscribe((value) => {
        value ? (this.hasLocalStorage = true) : (this.hasLocalStorage = false);
      });
  }
  onLogout() {
    this.store.dispatch(logoutUser.success());
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['home']);
  }
  ngOnDestroy() {
    this.hasLocalStorageSub.unsubscribe();
  }
}
