import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../user.interface';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadUser, updateUser, addUser } from '../store/user.actions';
import { MatDialog } from '@angular/material/dialog';
import {
  loadUserPending,
  selectUser,
  updateUserPending,
  addUserPending,
  error,
} from '../store/user.selectors';
import { Update } from '@ngrx/entity';
import { IApplicationState } from 'src/app/aplication-state';
import { Observable, Subscription } from 'rxjs';
import { ErrorMessage } from 'src/app/shared/error-message';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  hide = true;
  id!: number;
  editMode = false;
  updatePending$!: Observable<boolean>;
  loadUserPending$!: Observable<boolean>;
  addUserPending$!: Observable<boolean>;
  error!: Subscription;
  formEditNew = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<IApplicationState>,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.editMode = this.id ? true : false;
    if (this.editMode) {
      this.store.dispatch(loadUser.begin({ id: this.id }));
      this.store.select(selectUser).subscribe((user) => {
        if (user !== null) {
          let formUser = {
            name: user.name,
            email: user.email,
            password: user.password,
          };
          this.formEditNew.setValue(formUser);
        }
      });
      this.loadUserPending$ = this.store.select(loadUserPending);
      this.error = this.store.select(error).subscribe((error) => {
        if (error) {
          let errorDialog = this.dialog.open(ErrorMessage, {
            data: { message: error.message },
          });
          errorDialog.afterClosed().subscribe(() => {
            this.router.navigate(['']);
          });
        }
      });
    }
  }
  onSubmit() {
    const updatedOrNewUser: IUser = {
      id: this.id,
      name: this.formEditNew.value.name,
      email: this.formEditNew.value.email,
      password: this.formEditNew.value.password,
    };
    if (this.editMode) {
      const update: Update<IUser> = {
        id: this.id,
        changes: updatedOrNewUser,
      };
      this.store.dispatch(updateUser.success({ user: update }));
      this.updatePending$ = this.store.select(updateUserPending);
    } else {
      this.store.dispatch(addUser.begin({ user: updatedOrNewUser }));
      this.addUserPending$ = this.store.select(addUserPending);
    }
  }
  getErrorMessage() {
    return 'Enter a valid email';
  }

  ngOnDestroy() {
    if (this.editMode) {
      this.error.unsubscribe();
    }
  }
}
