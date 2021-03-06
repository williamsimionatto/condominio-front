import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListUserComponent } from './list/list-user.component';
import { UserRoutingModule } from './user-routing.module';
import { AddEditUserComponent } from './add/add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverUserViewComponent } from './overview/overview-user.component';
import { SharedModule } from '../../containers/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ],
  declarations: [
    ListUserComponent,
    AddEditUserComponent,
    OverUserViewComponent,
  ],
  providers: [
  ],
})
export class UserModule { }
