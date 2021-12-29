import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFormComponent } from './card-form/card-form.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [CardFormComponent, DialogComponent],
  imports: [CommonModule],
  exports: [CardFormComponent],
})
export class ComponentsModule {}
