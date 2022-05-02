import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditUserComponent } from './add/add-edit.component';
import { ListUserComponent } from './list/list-user.component';
import { OverUserViewComponent } from './overview/overview-user.component';

const routes: Routes = [
  { path: '', component: ListUserComponent },
  { path: 'add', component: AddEditUserComponent },
  { path: 'edit/:id', component: AddEditUserComponent },
  { path: 'overview/:id', component: OverUserViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
