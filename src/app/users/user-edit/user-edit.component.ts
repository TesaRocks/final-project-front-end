import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../user.interface';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadUser, updateUser, addUser } from '../store/user.actions';
import {
  loadUserPending,
  selectUser,
  updateUserPending,
  addUserPending,
  error,
} from '../store/user.selectors';
import { Update } from '@ngrx/entity';
import { IApplicationState } from 'src/app/aplication-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  id!: number;
  editMode = false;
  updatePending$!: Observable<boolean>;
  loadUserPending$!: Observable<boolean>;
  addUserPending$!: Observable<boolean>;
  error$!: Observable<any>;
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
    private store: Store<IApplicationState>
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
    }
    this.error$ = this.store.select(error);
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
}
