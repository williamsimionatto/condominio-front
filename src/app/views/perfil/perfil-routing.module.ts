import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEditPerfilComponent } from "./add/add-edit.component";
import { ListPerfilComponent } from "./list/list-perfil.component";

const routes: Routes = [
  { path: "", component: ListPerfilComponent },
  { path: 'add', component: AddEditPerfilComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }