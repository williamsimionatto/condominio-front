import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEditPerfilComponent } from "./add/add-edit.component";
import { ListPerfilComponent } from "./list/list-perfil.component";
import { OverviewPerfilComponent } from "./overview/overview-perfil.component";
import { PermissaoComponent } from "./permissao/permissao.component";

const routes: Routes = [
  { path: "", component: ListPerfilComponent },
  { path: 'add', component: AddEditPerfilComponent},
  { path: 'edit/:id', component: AddEditPerfilComponent },
  { path: 'overview/:id', component: OverviewPerfilComponent },
  { path: 'permissao/:id', component: PermissaoComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }