// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Components Routing
import { ListUserComponent } from './list-user.component';
import { ListRoutingModule } from './list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ListRoutingModule
  ],
  declarations: [
    ListUserComponent
  ]
})
export class UserModule { }
