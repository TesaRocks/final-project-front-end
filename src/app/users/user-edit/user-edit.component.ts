import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/data-service';
import { IUser } from '../user.interface';

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
  @ViewChild('form') slForm!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.dataService.fetchUser(this.id).subscribe((user: IUser) => {
      this.name = user.name;
      this.email = user.email;
      this.password = user.password;
    });
  }
  onSubmit(form: NgForm) {
    const value: IUser = form.value;
    const updatedUser: IUser = {
      id: this.id,
      name: value.name,
      email: value.email,
      password: value.password,
    };
    this.dataService
      .updateUser(this.id, updatedUser)
      .subscribe((user) => console.log(user));
    form.reset();
    this.router.navigate(['users']);
  }
}
