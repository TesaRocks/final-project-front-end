import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logoutUser } from '../auth/ngrx/auth.actions';
import { selectAuth } from '../auth/ngrx/auth.selectors';
import { IAuthResponse } from '../auth/auth-response.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isLoggedInSub!: Subscription;
  isLoggedIn: boolean = false;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<IAuthResponse>,
    private router: Router
  ) {}
  ngOnInit() {
    this.isLoggedInSub = this.store.select(selectAuth).subscribe((response) => {
      if (response.length > 0) {
        this.isLoggedIn = true;
        console.log(this.isLoggedIn);
      }
      console.log(this.isLoggedIn);
    });
  }
  onLogout() {
    this.store.dispatch(logoutUser.success());
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['home']);
  }
}
