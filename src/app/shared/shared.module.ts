import { NgModule } from '@angular/core';
import { ErrorMessage } from './error-message';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [ErrorMessage],
  imports: [CommonModule, MaterialModule],
  exports: [ErrorMessage, CommonModule],
})
export class SharedModule {}
