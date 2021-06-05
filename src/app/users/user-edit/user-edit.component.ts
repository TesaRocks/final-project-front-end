import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../user.interface';
import { UserService } from '../user.service';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserState } from '../store/user.reducer';
import { addUser, loadUser } from '../store/user.actions';
import { selectUser } from '../store/user.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  id!: number;
  editMode = false;
  //user$: Observable<IUser>;
  user: Subscription;
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
    private userService: UserService,
    private fb: FormBuilder,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.editMode = this.id ? true : false;
    if (this.editMode) {
      this.store.dispatch(loadUser({ id: this.id }));
      this.store.select(selectUser).subscribe((user) => console.log(user));
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
      this.userService.updateUser(this.id, updatedOrNewUser).subscribe();
    } else {
      this.store.dispatch(addUser({ user: updatedOrNewUser }));
    }
  }
}
