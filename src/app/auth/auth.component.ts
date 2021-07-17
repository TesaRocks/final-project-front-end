import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IUser } from '../users/user.interface';
import { loginUser } from './ngrx/auth.actions';
import { error, loginUserPending } from './ngrx/auth.selectors';
import { ErrorMessage } from '../shared/error-message';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  formLog: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(45)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
  });
  loginUserpending$!: Observable<boolean>;
  error!: Subscription;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    if (!this.formLog.valid) return;
    const userToLog: IUser = this.formLog.value;
    this.store.dispatch(loginUser.begin({ user: userToLog }));
    this.loginUserpending$ = this.store.select(loginUserPending);
    this.error = this.store.select(error).subscribe((error) => {
      if (error) {
        let errorDialog = this.dialog.open(ErrorMessage, {
          data: { message: error.error },
        });
        errorDialog.afterClosed().subscribe(() => {
          this.router.navigate(['']);
        });
      }
    });
  }

  hasError(inputName: 'email' | 'password', errorType: string) {
    return this.formLog.get(inputName)?.hasError(errorType);
  }
}
