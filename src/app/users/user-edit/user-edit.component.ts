import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../user.interface';
import { UserService } from '../user.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  id!: number;
  editMode = false;
  editNewForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editNewForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.id = this.route.snapshot.params.id;
    this.editMode = this.id ? true : false;
  }
  onSubmit() {
    const updatedOrNewUser: IUser = {
      id: this.id,
      name: this.editNewForm.value.name,
      email: this.editNewForm.value.email,
      password: this.editNewForm.value.password,
    };
    if (this.editMode) {
      this.userService.updateUser(this.id, updatedOrNewUser).subscribe();
    } else {
      this.userService.newUser(updatedOrNewUser).subscribe();
    }
    this.router.navigate(['users']);
  }
}
