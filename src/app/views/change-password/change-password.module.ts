import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordComponent } from '../change-password/password.component';
import { AppModule } from '../../app.module';
import { SharedModule } from '../../containers/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChangePasswordRoutingModule } from './change-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ],
  declarations: [
    PasswordComponent,
  ],
  providers: [
  ],
})
export class ChangePasswordModule { }
