import { NgModule } from '@angular/core';
import { ErrorMessage } from './error-message';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ErrorMessage],
  imports: [CommonModule, MatDialogModule],
  exports: [ErrorMessage, CommonModule, MatDialogModule],
})
export class SharedModule {}
