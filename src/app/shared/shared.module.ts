import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { ErrorMessage } from './error-message';

@NgModule({
  declarations: [ErrorMessage],
  imports: [CommonModule, MatDialogModule],
  exports: [ErrorMessage, CommonModule, MatDialogModule],
})
export class SharedModule {}
