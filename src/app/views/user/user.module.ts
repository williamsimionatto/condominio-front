// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Components Routing
import { ListUserComponent } from './list/list-user.component';
import { UserRoutingModule } from './user-routing.module';
import { AddEditUserComponent } from './add/add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { OverUserViewComponent } from './overview/overview-user.component';
import { PasswordComponent } from './password/password.component';
import { AppModule } from '../../app.module';
import { SharedModule } from '../../containers/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ListUserComponent,
    AddEditUserComponent,
    OverUserViewComponent,
    PasswordComponent,
  ],
  providers: [
  ],
})
export class UserModule { }
