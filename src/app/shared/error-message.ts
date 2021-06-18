import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'error-message',
  templateUrl: 'error-message.html',
  styles: ['button {margin-left: 80px;}'],
})
export class ErrorMessage {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
