import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logoutUser } from '../auth/ngrx/auth.actions';
import { haslocalStorage, role } from '../auth/ngrx/auth.selectors';
import { IApplicationState } from '../aplication-state';
import { updateHeaderSelector } from '../ngrx/header.selectors';
import { updateHeader } from 'src/app/ngrx/header.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, AfterContentChecked, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  hasLocalStorageSub!: Subscription;
  hasLocalStorage!: boolean;
  roleSub!: Subscription;
  role!: string;
  headerSub!: Subscription;
  header!: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<IApplicationState>,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.headerSub = this.store
      .select(updateHeaderSelector)
      .subscribe((headeFromStore) => {
        this.header = headeFromStore;
      });
    this.hasLocalStorageSub = this.store
      .select(haslocalStorage)
      .subscribe((value) => {
        value ? (this.hasLocalStorage = true) : (this.hasLocalStorage = false);
      });
    this.roleSub = this.store.select(role).subscribe((roleFromStore) => {
      if (roleFromStore) this.role = roleFromStore;
    });
  }

  onHome() {
    this.store.dispatch(updateHeader({ updatedHeader: 'Final Project' }));
  }
  onLogout() {
    this.store.dispatch(logoutUser.success());
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('role');
    this.onHome();
    this.router.navigate(['home']);
  }
  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }
  ngOnDestroy() {
    this.hasLocalStorageSub.unsubscribe();
    this.roleSub.unsubscribe();
    this.headerSub.unsubscribe();
  }
}
