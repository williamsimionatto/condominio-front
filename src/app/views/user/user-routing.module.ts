import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditUserComponent } from './add/add-edit.component';
import { ListUserComponent } from './list/list-user.component';


const routes: Routes = [
  { path: '', component: ListUserComponent },
  { path: 'add', component: AddEditUserComponent },
  { path: 'edit/:id', component: AddEditUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
