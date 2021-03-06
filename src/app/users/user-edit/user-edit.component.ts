import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../user.interface';
import { Store } from '@ngrx/store';
import { loadUser, updateUser, addUser } from '../ngrx/user.actions';
import { MatDialog } from '@angular/material/dialog';
import {
  loadUserPending,
  selectUser,
  updateUserPending,
  addUserPending,
  error,
} from '../ngrx/user.selectors';
import { Update } from '@ngrx/entity';
import { IApplicationState } from 'src/app/aplication-state';
import { Observable, Subscription } from 'rxjs';
import { ErrorMessage } from 'src/app/shared/error-message';
import { updateHeader } from 'src/app/ngrx/header.actions';

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
  formEditNew: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(45)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(45)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
    role: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
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
      this.store.dispatch(updateHeader({ updatedHeader: 'User Edit' }));
      this.store.dispatch(loadUser.begin({ id: this.id }));
      this.store.select(selectUser).subscribe((user) => {
        if (user !== null) {
          let formUser = {
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
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
    } else {
      this.store.dispatch(updateHeader({ updatedHeader: 'New User' }));
    }
  }
  onSubmit() {
    const updatedOrNewUser: IUser = {
      id: this.id,
      name: this.formEditNew.value.name,
      email: this.formEditNew.value.email,
      password: this.formEditNew.value.password,
      role: this.formEditNew.value.role,
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
  hasError(
    inputName: 'name' | 'email' | 'password' | 'role',
    errorType: string
  ) {
    return this.formEditNew.get(inputName)?.hasError(errorType);
  }
  ngOnDestroy() {
    if (this.editMode) {
      this.error.unsubscribe();
    }
  }
}
