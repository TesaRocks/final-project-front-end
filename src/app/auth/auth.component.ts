import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../users/user.interface';

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
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  onSubmit() {
    if (!this.formLog.valid) return;
    const userToLog: IUser = this.formLog.value;
  }

  hasError(inputName: 'email' | 'password', errorType: string) {
    return this.formLog.get(inputName)?.hasError(errorType);
  }
}
