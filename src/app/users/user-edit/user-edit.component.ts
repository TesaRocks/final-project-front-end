import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../user.interface';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserState } from '../store/user.reducer';
import * as fromActions from '../store/user.actions';
import { selectUser } from '../store/user.selectors';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  id!: number;
  editMode = false;
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
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.editMode = this.id ? true : false;
    if (this.editMode) {
      this.store.dispatch(fromActions.loadUser.beginLoad({ id: this.id }));
      this.store.select(selectUser).subscribe((user) => {});
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
      this.store.dispatch(fromActions.updateUser.beginUpdate({ user: update }));
    } else {
      this.store.dispatch(
        fromActions.addUser.beginAdd({ user: updatedOrNewUser })
      );
    }
  }
}
