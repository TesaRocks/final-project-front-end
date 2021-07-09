import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorMessage } from './error-message';
import { DeleteConfirm } from './delete-confirm';

@NgModule({
  declarations: [ErrorMessage, DeleteConfirm],
  imports: [CommonModule, MatDialogModule],
  exports: [ErrorMessage, DeleteConfirm, CommonModule, MatDialogModule],
})
export class SharedModule {}
