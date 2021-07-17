import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../aplication-state';
import { logoutUser } from '../auth/ngrx/auth.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<IApplicationState>,
    private router: Router
  ) {}
  onLogout() {
    this.store.dispatch(logoutUser.success());
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['home']);
  }
}
