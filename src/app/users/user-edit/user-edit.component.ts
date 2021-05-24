import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../user.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  editMode = false;
  @ViewChild('form') slForm!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.editMode = this.id ? true : false;
    if (this.editMode) {
      this.userService.fetchUser(this.id).subscribe((user: IUser) => {
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
      });
    }
  }
  onSubmit(form: NgForm) {
    const value: IUser = form.value;
    const updatedOrNewUser: IUser = {
      id: this.id,
      name: value.name,
      email: value.email,
      password: value.password,
    };
    if (this.editMode) {
      this.userService.updateUser(this.id, updatedOrNewUser).subscribe();
    } else {
      this.userService.newUser(updatedOrNewUser).subscribe();
    }

    form.reset();
    this.router.navigate(['users']);
  }
}
