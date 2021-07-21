import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorMessage } from './error-message';
import { DeleteConfirm } from './delete-confirm';
import { ShortPipe } from './short.pipe';

@NgModule({
  declarations: [ErrorMessage, DeleteConfirm, ShortPipe],
  imports: [CommonModule, MatDialogModule],
  exports: [
    ErrorMessage,
    DeleteConfirm,
    CommonModule,
    MatDialogModule,
    ShortPipe,
  ],
})
export class SharedModule {}
