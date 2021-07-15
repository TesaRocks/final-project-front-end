import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  formLog: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(45)]],
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
    console.log(this.formLog.value);
  }
  hasError(inputName: 'name' | 'email' | 'password', errorType: string) {
    return this.formLog.get(inputName)?.hasError(errorType);
  }
}
