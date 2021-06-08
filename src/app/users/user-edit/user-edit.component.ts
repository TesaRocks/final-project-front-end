import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../user.interface';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromActions from '../store/user.actions';
import { selectUser } from '../store/user.selectors';
import { Update } from '@ngrx/entity';
import { IApplicationState } from 'src/app/aplication-state';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  id!: number;
  editMode = false;
  formEditNew = this.fb.group({
    id: ['', Validators.required],
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
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.editMode = this.id ? true : false;
    if (this.editMode) {
      this.store.dispatch(fromActions.loadUser.begin({ id: this.id }));
      this.store.select(selectUser).subscribe((user) => {
        if (user !== null) {
          this.formEditNew.setValue(user)
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
      this.store.dispatch(fromActions.updateUser.beginUpdate({ user: update }));
    } else {
      this.store.dispatch(
        fromActions.addUser.beginAdd({ user: updatedOrNewUser })
      );
    }
  }
}
