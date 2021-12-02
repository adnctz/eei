import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './components/dialog/confirmation/confirmation.component';
import { AvatarComponent } from './components/avatar/avatar.component';



@NgModule({
  declarations: [
    ConfirmationComponent,
    AvatarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    AvatarComponent
  ]
})
export class SharedModule { }
